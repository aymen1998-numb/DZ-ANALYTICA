const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix `t("{t("...")}")`
code = code.replace(/\{t\("\{t\("([^"]+)"\)\}"\)\}/g, '{t("$1")}');
// Also fix any other double replacements
code = code.replace(/\{t\(\{t\("([^"]+)"\)\}\)\}/g, '{t("$1")}');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed double translations.');
