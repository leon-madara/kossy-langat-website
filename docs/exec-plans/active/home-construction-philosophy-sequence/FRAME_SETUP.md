# Frame Setup Guide - Philosophy Sequence

## Quick Start

Place your 192 construction sequence frames in:
```
public/images/philosophy/
```

## Naming Convention

Frames must be named with zero-padded 3-digit numbers:
```
frame-001.jpg
frame-002.jpg
frame-003.jpg
...
frame-192.jpg
```

## File Format

- **Recommended**: JPEG (.jpg)
- **Quality**: 70-80% compression
- **Dimensions**: Recommend 1920x1080 or 1280x720
- **Total size target**: 15-25MB for all 192 frames

## Frame-to-Text Mapping

The sequence is divided into 7 narrative beats:

| Frames | Duration | Text |
|--------|----------|------|
| 1-24 | Foundation stage | "Good design does not begin with walls." |
| 25-48 | Structure emerges | "It begins with structure." |
| 49-72 | Alignment phase | "With alignment." |
| 73-96 | Logic phase | "With logic." |
| 97-132 | Systems phase | "With systems that hold." |
| 133-176 | Leadership phase | "And with the right leadership, what was only a framework becomes something real." |
| 177-192 | Completion | "That space between people and design - that's where I live." |

## Testing After Frame Placement

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Navigate to home page (http://localhost:3000)

3. Scroll through the Philosophy section

4. Check:
   - Frames load smoothly
   - Text appears at appropriate construction stages
   - Scroll feels natural (not too fast or slow)
   - Text is readable over frames

## Tuning Parameters

If timing needs adjustment, edit `src/components/sections/home/PhilosophySequence.tsx`:

### Scroll Pin Length
```typescript
scrollTrigger: {
  end: "+=200%", // current baseline; increase for slower, decrease for faster
}
```

### Text Fade Speed
```typescript
const fadeInDuration = 0.08  // Increase for slower fade-in
const fadeOutDuration = 0.08 // Increase for slower fade-out
```

### Frame Window Ranges
Adjust the `TEXT_SEQUENCE` array to change when text appears:
```typescript
{
  text: "Good design does not begin with walls.",
  frameStart: 1,   // Adjust these
  frameEnd: 24,    // to change timing
}
```

## Performance Optimization

If frames load slowly:

1. **Reduce dimensions**: Use 1280x720 instead of 1920x1080
2. **Increase compression**: Use 60-70% JPEG quality
3. **Progressive loading**: Contact dev team for implementation

## Troubleshooting

**Frames not loading:**
- Check file names match pattern exactly (frame-001.jpg not frame-1.jpg)
- Check files are in `public/images/philosophy/` not a subfolder
- Check browser console for 404 errors

**Sequence feels jerky:**
- Reduce frame dimensions
- Check browser performance tab for memory issues
- Try different scroll scrub value (currently 0.5)

**Text not readable:**
- Increase text-shadow in CSS
- Add darker scrim overlay
- Adjust text positioning away from busy frame areas
