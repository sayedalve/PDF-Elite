const fs = require('fs');
const file = 'frontend/editor/src/core/data/useTranslatedToolRegistry.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/lazySettings\(\s*\(\)\s*=>\s*import\(([^)]+)\)\s*,?\s*\)/g, 'lazySettings(lazy(() => import($1)))');
fs.writeFileSync(file, content);
