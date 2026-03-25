// This import uses wildcard exports pattern: @o7/icon/lucide/check
// Should resolve to ./dist/lucide/check.svelte per package.json exports
import CheckIcon from '@o7/icon/lucide/check';

console.log('CheckIcon loaded:', CheckIcon);
document.body.innerHTML += '<p>Import successful!</p>';
