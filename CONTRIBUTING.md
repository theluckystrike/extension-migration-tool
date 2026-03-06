# Contributing to Extension Migration Tool

Thanks for your interest in contributing. This document covers the basics.

GETTING STARTED

1. Fork the repo and clone your fork
2. Run npm install to set up dependencies
3. Run npm run build to compile TypeScript
4. Run npm test to verify everything passes

MAKING CHANGES

- Create a feature branch from main
- Keep commits focused and descriptive
- Add or update tests if you change behavior
- Run npm test before submitting a pull request
- Make sure the build passes with npm run build

WHAT TO WORK ON

- Bug fixes and edge cases in manifest conversion
- New MV2 to MV3 migration rules
- Better compatibility checks and warnings
- Documentation improvements
- Test coverage

PULL REQUESTS

- Open a PR against the main branch
- Describe what the change does and why
- Reference any related issues
- Keep the diff minimal and focused

CODE STYLE

- TypeScript with strict mode enabled
- Prefer static methods on the existing classes
- Use clear parameter and return types
- Keep functions small and single-purpose

REPORTING ISSUES

Use the GitHub issue tracker. Include the manifest JSON (or a minimal reproduction) when reporting conversion bugs.

---

Maintained by theluckystrike / zovo.one
