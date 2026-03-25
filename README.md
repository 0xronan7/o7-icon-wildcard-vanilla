# Rolldown Wildcard Export Bug - Vanilla Reproduction

Minimal reproduction of rolldown's inability to resolve wildcard exports patterns.

## Error

```
"./lucide/check" is not exported under the conditions ["module", "browser", "production", "import"] 
from package @o7/icon (see exports field in package.json)
```

## Package.json Exports Pattern

```json
{
  "exports": {
    "./lucide": {
      "types": "./dist/lucide/index.d.ts",
      "svelte": "./dist/lucide/index.js"
    },
    "./lucide/*": {
      "types": "./dist/lucide/*.d.ts",
      "svelte": "./dist/lucide/*.svelte"
    }
  }
}
```

## Test Case

```js
// This should resolve to ./dist/lucide/check.svelte
import CheckIcon from '@o7/icon/lucide/check';
```

## Results

| Environment | Result |
|-------------|--------|
| Vite 7 (Rollup) dev | ✅ Works |
| Vite 7 (Rollup) build | ✅ Works |
| Vite 8 (rolldown) dev | ✅ Works (plugin transforms) |
| Vite 8 (rolldown) build | ❌ **Fails** |

## Reproduction

```bash
pnpm install
pnpm build
```

## Expected

Rolldown should resolve wildcard exports (`"./lucide/*": "*.svelte"`) just like Rollup does.

## Actual

Build fails with "Package subpath is not defined by exports"
