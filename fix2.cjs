const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The meta tag issues:
code = code.replace(/content="دزاير \{t\("أناليتيكا"\)\} هي أول منصة جزائرية/g, 'content="دزاير أناليتيكا هي أول منصة جزائرية');
code = code.replace(/\{t\("دزاير"\)\} أناليتيكا/g, 'دزاير أناليتيكا');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed meta tags.');
