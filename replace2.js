const fs = require('fs');
const file = 'frontend/editor/src/core/components/viewer/useViewerWorkbenchBarButtons.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/variant="transparent"/g, 'variant="quiet"');
fs.writeFileSync(file, content);
