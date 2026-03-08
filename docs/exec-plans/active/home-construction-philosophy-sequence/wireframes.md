# Wireframes - Home Construction Philosophy Sequence

## Recommended Layout (Desktop)

Use a pinned stage with image dominance and side narrative rail.

```text
------------------------------------------------------------
| Eyebrow: 02.0 / THE PHILOSOPHY                           |
|----------------------------------------------------------|
|                                                          |
|  [ Canvas image sequence (building construction) ]       |
|                                     Good design...       |
|                                     It begins...         |
|                                     With alignment...    |
|                                                          |
|  (subtle structural grid overlay, low opacity)           |
|                                                          |
------------------------------------------------------------
```

## Mobile Layout

Use full-bleed sequence with overlaid text block and stronger scrim.

```text
------------------------------
| [ sequence frame ]          |
|                             |
|                             |
|  Good design does not...    |
|  It begins with structure.  |
|                             |
------------------------------
```

## Scroll Stage Anatomy

```text
home-philosophy-sequence
  sequence-stage (pin target)
    sequence-canvas-wrap
      canvas
      optional structural-grid-overlay
    sequence-text-rail (desktop)
    sequence-text-overlay (mobile)
```

## Frame to Text Windows

| Frames | Text |
|--------|------|
| 1-24 | Good design does not begin with walls. |
| 25-48 | It begins with structure. |
| 49-72 | With alignment. |
| 73-96 | With logic. |
| 97-132 | With systems that hold. |
| 133-176 | And with the right leadership, what was only a framework becomes something real. |
| 177-192 | That space between people and design - that's where I live. |

## Alternative Layout Variants

### Variant A - Full overlay text
- Text centered over sequence.
- Highest cinematic feel.
- Higher readability risk on high-detail frames.

### Variant B - Sequence first, text below
- Sequence occupies full viewport.
- Text appears below stage as separate rows.
- Lowest visual conflict, but weaker immediacy.

### Variant C - Side rail + occasional overlay emphasis (deferred)
- Keep side rail as baseline.
- Pull final line into centered overlay near sequence end.
- Use only if baseline pass feels too static.
