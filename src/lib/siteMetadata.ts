export const SITE_URL = "https://kossy.engineer";

const withProtocol = (url: string) =>
  url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;

const SITE_ASSET_URL = withProtocol(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    SITE_URL,
);

export const SHARE_IMAGE_PATH = "/kossy-share-card.png";
export const SHARE_IMAGE_ALT =
  "Kossy logo on a structural grid background.";

export const SHARE_IMAGE_METADATA = {
  url: new URL(SHARE_IMAGE_PATH, SITE_ASSET_URL),
  width: 1200,
  height: 630,
  alt: SHARE_IMAGE_ALT,
  type: "image/png",
} as const;
