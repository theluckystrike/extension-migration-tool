# extension-migration-tool — MV2 to MV3 Migration Helper

[![npm](https://img.shields.io/npm/v/extension-migration-tool.svg)](https://www.npmjs.com/package/extension-migration-tool)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-green.svg)]()

> **Built by [Zovo](https://zovo.one)** — migration for 18+ Chrome extensions

**Convert Manifest V2 to V3, check compatibility, get migration warnings.** Identify deprecated APIs and get automated fix suggestions. Zero runtime dependencies.

## 📦 Install

```bash
npm install extension-migration-tool
```

## 🚀 Quick Start

```typescript
import { ManifestConverter, CompatChecker } from 'extension-migration-tool';

// Convert MV2 manifest to MV3
const mv3 = ManifestConverter.convert(mv2Manifest);

// Check compatibility
const issues = CompatChecker.check(mv2Manifest);

// Get migration warnings
const warnings = ManifestConverter.getWarnings(mv2Manifest);
console.log(warnings);
// ['browser_action moved to action', 'storage.local changes needed']
```

## ✨ Features

### Manifest Conversion

```typescript
// Convert entire manifest
const mv3Manifest = ManifestConverter.convert(mv2Manifest);

// Convert specific fields
const mv3Action = ManifestConverter.convertAction(mv2Manifest.browser_action);
const mv3Background = ManifestConverter.convertBackground(mv2Manifest.background);
const mv3Permissions = ManifestConverter.convertPermissions(mv2Manifest.permissions);
```

### Compatibility Checking

```typescript
// Check full manifest
const issues = CompatChecker.check(manifest);

console.log(issues);
/*
{
  critical: [
    { field: 'background.page', message: 'Use service_worker instead' }
  ],
  warnings: [
    { field: 'browser_action', message: 'Use action instead' }
  ],
  info: []
}
*/

// Check specific field
const fieldIssues = CompatChecker.checkField('permissions', manifest.permissions);
```

### Migration Warnings

```typescript
// Get all warnings before migration
const warnings = ManifestConverter.getWarnings(manifest);

/*
[
  { type: 'action', message: 'browser_action → action', severity: 'critical' },
  { type: 'background', message: 'background.page → background.service_worker', severity: 'critical' },
  { type: 'storage', message: 'Consider chrome.storage.session', severity: 'warning' },
]
*/
```

### Automated Fixes

```typescript
// Get fix suggestions
const fixes = ManifestConverter.getFixes(manifest);

fixes.forEach(fix => {
    console.log(`${fix.field}: ${fix.suggestion}`);
});
/*
browser_action: Replace with "action"
background.page: Replace with "service_worker"
*/
```

## API Reference

### `ManifestConverter`

| Method | Description |
|--------|-------------|
| `convert(manifest)` | Convert full manifest |
| `convertAction(action)` | Convert browser_action |
| `convertBackground(background)` | Convert background |
| `convertPermissions(perms)` | Convert permissions |
| `getWarnings(manifest)` | Get migration warnings |
| `getFixes(manifest)` | Get fix suggestions |

### `CompatChecker`

| Method | Description |
|--------|-------------|
| `check(manifest)` | Check full manifest |
| `checkField(field, value)` | Check specific field |

## 📄 License

MIT — [Zovo](https://zovo.one)
