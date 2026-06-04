const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/\{t\("صوت \{t\("دزاير"\)\} \(Saout Dzayer\)"\)\}/g, 't("صوت دزاير (Saout Dzayer)")');
code = code.replace(/t\("صوت \{t\("دزاير"\)\} \(Saout Dzayer\)"\)/g, 't("صوت دزاير (Saout Dzayer)")');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed double translations.');
