const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/\{t\("بدأت \{t\("دزاير"\)\} \{t\("أناليتيكا"\)\} كمشروع/g, '{t("بدأت دزاير أناليتيكا كمشروع');

// also: 
code = code.replace(/\{t\("\{t\("دزاير"\)\} \{t\("أناليتيكا"\)\}:/g, '{t("دزاير أناليتيكا:');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed double translations.');
