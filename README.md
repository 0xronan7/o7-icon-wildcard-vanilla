# @o7/icon Wildcard Export Bug

**Affects:** Vite 8 (rolldown) - production stable

## Reproduction

Minimal reproduction of wildcard exports resolution failure in @o7/icon package.

## Error

### Vite 8 (rolldown)
```
"./lucide/check" is not exported under the conditions ["module", "browser", "production", "import"]
from package @o7/icon (see exports field in package.json)
```
- ❌ Dev mode: fails
- ❌ Build: fails

## Root Cause

The `@o7/icon` package uses wildcard exports:

```json
{
  "exports": {
    "./lucide": {
      "types": "./dist/lucide/index.d.ts",
      "svelte": "./dist/lucide/index.js"
    },
    "./lucide/*": {
      "types": "./dist/lucide/*.svelte.d.ts",
      "svelte": "./dist/lucide/*.svelte"
    }
  }
}
```

This pattern **fails in Vite 8 (rolldown), in both dev and build modes**.

## Test Case

```js
// Both of these fail:
import CheckIcon from '@o7/icon/lucide/check';
import CheckIcon from '@o7/icon/lucide/check.svelte';
```

## Workaround

Use explicit paths without wildcard pattern:

```js
// This works but defeats the purpose of exports wildcards
import CheckIcon from '@o7/icon/dist/lucide/check.svelte';
```

## Reproduction Steps

```bash
cd o7-icon-wildcard-vanilla
pnpm install
pnpm build  # FAILS
pnpm dev    # FAILS
```

## Expected Behavior

Wildcard exports should resolve:
- `@o7/icon/lucide/*` → `./dist/lucide/*.svelte`

## Actual Behavior

Rolldown (Vite 8) fails to resolve wildcard export patterns in both dev and build modes.

## Related

- @o7/icon: https://github.com/ottomated/o7-icon
- Vite: https://github.com/vitejs/vite
- Rollup: https://github.com/rollup/rollup
- Rolldown: https://github.com/rolldown/rolldown
