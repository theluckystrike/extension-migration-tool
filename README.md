# extension-migration-tool — MV2 to MV3 Migration Helper
> **Built by [Zovo](https://zovo.one)**

Convert MV2 manifest to MV3, check compatibility, get migration warnings. `npm i extension-migration-tool`

```typescript
import { ManifestConverter, CompatChecker } from 'extension-migration-tool';
const mv3 = ManifestConverter.convert(mv2Manifest);
const issues = CompatChecker.check(mv2Manifest);
const warnings = ManifestConverter.getWarnings(mv2Manifest);
```
MIT License
