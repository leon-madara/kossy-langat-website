/**
 * Philosophy Frame Sequence — OffscreenCanvas Web Worker
 *
 * Owns ALL image fetching, decoding, scaling math, and canvas drawing.
 * The main thread only sends lightweight messages:
 *   init → load-frames → resize → render → dispose
 *
 * This file lives in public/ as plain JS because Next.js Turbopack
 * serves bundled workers as blob URLs which breaks various APIs.
 */

// ── State ─────────────────────────────────────────────────────────────
let canvas = null;
let ctx = null;
let bitmapCache = [];
let loadedFlags = [];
let frameCount = 0;
let currentFrame = -1;
let drawConfig = null;
let loadToken = 0;

function disposeBitmaps() {
    for (let j = 0; j < bitmapCache.length; j++) {
        if (bitmapCache[j]) bitmapCache[j].close();
    }
}

// ── Helpers ───────────────────────────────────────────────────────────
function recalcDrawConfig(width, height, dpr) {
    if (!canvas) return;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const ref = bitmapCache.find((b) => b !== null);
    if (ref) {
        const scale = Math.max(width / ref.width, height / ref.height);
        const dw = ref.width * scale;
        const dh = ref.height * scale;
        drawConfig = {
            cw: width,
            ch: height,
            dw,
            dh,
            ox: (width - dw) / 2,
            oy: (height - dh) / 2,
        };
    }

    if (currentFrame >= 0 && loadedFlags[currentFrame]) {
        drawFrame(currentFrame, true);
    }
}

function drawFrame(index, force) {
    const clamped = Math.max(0, Math.min(frameCount - 1, Math.round(index)));

    if (!loadedFlags[clamped]) return;
    if (!force && currentFrame === clamped) return;

    const bitmap = bitmapCache[clamped];
    if (!bitmap || !ctx || !drawConfig) return;

    ctx.clearRect(0, 0, drawConfig.cw, drawConfig.ch);
    ctx.drawImage(bitmap, drawConfig.ox, drawConfig.oy, drawConfig.dw, drawConfig.dh);
    currentFrame = clamped;
}

// ── Message Handler ───────────────────────────────────────────────────
self.onmessage = function (event) {
    const msg = event.data;
    const type = msg.type;

    switch (type) {
        case "init": {
            canvas = msg.canvas;
            ctx = canvas.getContext("2d");
            break;
        }

        case "load-frames": {
            const urls = msg.urls;
            const token = msg.token;
            loadToken = token;

            disposeBitmaps();
            frameCount = urls.length;
            bitmapCache = new Array(frameCount).fill(null);
            loadedFlags = new Array(frameCount).fill(false);
            currentFrame = -1;
            drawConfig = null;

            let settledCount = 0;
            let successCount = 0;
            let hasPostedReady = false;

            for (let i = 0; i < frameCount; i++) {
                fetch(urls[i])
                    .then(function (res) {
                        if (!res.ok) throw new Error("HTTP " + res.status);
                        return res.blob();
                    })
                    .then(function (blob) {
                        return createImageBitmap(blob);
                    })
                    .then(function (bitmap) {
                        if (loadToken !== token) {
                            bitmap.close();
                            return;
                        }

                        bitmapCache[i] = bitmap;
                        loadedFlags[i] = true;
                        successCount++;

                        if (!hasPostedReady) {
                            hasPostedReady = true;
                            self.postMessage({ type: "ready", token: token });
                        }
                    })
                    .catch(function () {
                        // Frame failed — skip silently
                    })
                    .finally(function () {
                        if (loadToken !== token) return;

                        settledCount++;

                        if (settledCount % 16 === 0) {
                            self.postMessage({
                                type: "progress",
                                token: token,
                                percent: Math.round((settledCount / frameCount) * 100),
                            });
                        }

                        if (settledCount === frameCount) {
                            self.postMessage({
                                type: "all-settled",
                                token: token,
                                successCount: successCount,
                            });
                        }
                    });
            }
            break;
        }

        case "resize": {
            recalcDrawConfig(msg.width, msg.height, msg.dpr);
            break;
        }

        case "render": {
            drawFrame(msg.frame);
            break;
        }

        case "dispose": {
            loadToken += 1;
            disposeBitmaps();
            bitmapCache = [];
            loadedFlags = [];
            canvas = null;
            ctx = null;
            drawConfig = null;
            currentFrame = -1;
            break;
        }
    }
};
