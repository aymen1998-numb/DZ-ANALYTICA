const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/alt="فريق الخبراء"/g, 'alt={t("فريق الخبراء")}');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed alt texts.');
