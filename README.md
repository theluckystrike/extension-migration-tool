# Extension Migration Tool

A TypeScript library for migrating Chrome extensions from Manifest V2 to Manifest V3. Converts manifests, splits permissions, rewrites deprecated fields, and checks compatibility. Zero runtime dependencies.

INSTALL

```bash
npm install extension-migration-tool
```

USAGE

```typescript
import { ManifestConverter, CompatChecker } from 'extension-migration-tool';

// Convert an MV2 manifest object to MV3
const mv3 = ManifestConverter.convert(mv2Manifest);

// Get migration warnings before converting
const warnings = ManifestConverter.getWarnings(mv2Manifest);

// Check a manifest for MV3 compatibility issues
const issues = CompatChecker.check(manifest);
```

WHAT THE CONVERTER DOES

ManifestConverter.convert takes a plain MV2 manifest object and returns a new object with the following transformations applied.

- Sets manifest_version to 3
- Converts background.scripts to background.service_worker (uses the first script entry)
- Renames browser_action and page_action to action
- Converts web_accessible_resources from a flat string array to the MV3 object format
- Converts content_security_policy from a string to the MV3 object format
- Splits permissions into API permissions and host_permissions

ManifestConverter.getWarnings returns an array of plain strings describing potential problems with the migration. It warns about multiple background scripts that need merging, persistent background pages, webRequestBlocking usage, and broad tabs permission.

COMPATIBILITY CHECKER

CompatChecker.check returns an array of issue objects, each with a severity field (error, warning, or info) and a message string.

Errors it catches include missing manifest_version 3, leftover background.scripts, persistent background pages, browser_action or page_action still present, and webRequestBlocking in permissions. Warnings cover string-format content_security_policy and flat web_accessible_resources arrays. Info-level issues note host permissions that should be moved to the host_permissions key.

```typescript
const issues = CompatChecker.check(manifest);

issues.forEach(issue => {
  console.log(`[${issue.severity}] ${issue.message}`);
});
// [error] background.scripts must be replaced with background.service_worker
// [warning] content_security_policy must be an object in MV3
// [info] 2 host permission(s) should be moved to host_permissions
```

API REFERENCE

ManifestConverter (static methods)

- convert(mv2) returns a new MV3 manifest object
- getWarnings(mv2) returns an array of warning strings

CompatChecker (static methods)

- check(manifest) returns an array of { severity, message } objects

DEVELOPMENT

```bash
git clone https://github.com/theluckystrike/extension-migration-tool.git
cd extension-migration-tool
npm install
npm run build
npm test
```

The project uses TypeScript 5.x targeting ES2020 with CommonJS output. Type declarations and source maps are generated in the dist directory.

LICENSE

MIT. See the LICENSE file for details.

---

Built by theluckystrike / zovo.one
