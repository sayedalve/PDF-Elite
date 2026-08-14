const fs = require('fs');
const file = 'c:/Users/sayed/Downloads/PDF-Elite/frontend/editor/public/locales/en-US/translation.toml';
let lines = fs.readFileSync(file, 'utf8').split('\n');
const tomlEndIndex = lines.findIndex(l => l.includes('[replaceImage.results]'));
if (tomlEndIndex !== -1) {
    lines.splice(tomlEndIndex);
}

const append = `
[replaceImage.results]
title = "Replace Image Results"

[desktopStartup]
timeout = "The backend is taking longer than expected to start."
retry = "Retry"
starting = "Starting up..."

[convert.options.emailOptions]
downloadHtml = "Download HTML"
downloadHtmlTooltip = "Download the HTML content instead of converting to PDF"
`;

fs.writeFileSync(file, lines.join('\n') + append);