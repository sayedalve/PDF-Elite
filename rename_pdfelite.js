const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('frontend/editor/src');
let changedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Specifically target user-visible text strings (e.g. inside JSX tags, title strings, descriptions)
    // First, exact case-sensitive matches for "Stirling PDF"
    content = content.replace(/Stirling PDF/g, 'PDF Elite');
    content = content.replace(/Stirling-PDF/g, 'PDF Elite');
    // Then exact case-sensitive matches for "Stirling" but try to avoid variables.
    // Replace standalone "Stirling" in strings:
    content = content.replace(/"Stirling"/g, '"PDF Elite"');
    content = content.replace(/>Stirling</g, '>PDF Elite<');
    content = content.replace(/'Stirling'/g, "'PDF Elite'");
    content = content.replace(/Stirling logo/g, 'PDF Elite logo');
    content = content.replace(/Stirling Logo/g, 'PDF Elite Logo');
    
    // A specific case mentioned in the search results
    content = content.replace(/Welcome to Stirling/g, 'Welcome to PDF Elite');
    content = content.replace(/Stirling endpoint/g, 'PDF Elite endpoint');
    content = content.replace(/Stirling never sees/g, 'PDF Elite never sees');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
    }
});
console.log(`Replaced text in ${changedCount} files.`);
