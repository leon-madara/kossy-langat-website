# Tech Debt Tracker — Kossy Portfolio

> "Clean code is the foundation of premium UI."

This tracker inventories known technical debt. Prioritize fixing items that block agent autonomy or degrade visual precision.

## 🔴 High Priority (Blocks Work / Bugs)
- **CSS Variable Consolidation**: Some colors are still hardcoded in components instead of using `globals.css` tokens.
- **GSAP Context Management**: Ensure all GSAP animations are cleaned up on component unmount to prevent memory leaks and trigger conflicts.

## 🟡 Medium Priority (Degrades Quality)
- **Image Optimization**: Replace local development placeholder images with optimized, sized assets.
- **Lint Enforcement**: Some "Golden Principles" are not yet encoded in a linting script.

## 🟢 Low Priority (Cleanup)
- **Dead Code Cleanup**: Remove unused components and legacy CSS from the initial bootstrap.
- **Documentation Gardening**: Ensure all `README.md` files in subdirectories are up to date with the new `WORKFLOW`.

---

## 🛠 Remediation Log
*Items moved here when resolved.*

- [x] **Initial Workflow Setup**: Adapted `ENG WORKFLOW` to bespoke `WORKFLOW`.
