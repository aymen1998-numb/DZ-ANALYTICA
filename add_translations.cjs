const fs = require('fs');
let code = fs.readFileSync('src/translations.ts', 'utf8');

const arAdditions = '';

const enAdditions = `,
    "نطاق الميزانية التقديرية (دينار جزائري)": "Estimated Budget Range (DZD)",
    "150,000 - 500,000 دج": "150,000 - 500,000 DZD",
    "500,000 - 1,000,000 دج": "500,000 - 1,000,000 DZD",
    "+ 1,000,000 دج": "+ 1,000,000 DZD",
    "المنصة قيد التطوير التجريبي ولا تتحمل أي مسؤولية قانونية في هذه المرحلة.": "The platform is under experimental beta and carries no legal liability at this stage."`;

const frAdditions = `,
    "نطاق الميزانية التقديرية (دينار جزائري)": "Plage de budget estimée (DZD)",
    "150,000 - 500,000 دج": "150 000 - 500 000 DZD",
    "500,000 - 1,000,000 دج": "500 000 - 1 000 000 DZD",
    "+ 1,000,000 دج": "+ 1 000 000 DZD",
    "المنصة قيد التطوير التجريبي ولا تتحمل أي مسؤولية قانونية في هذه المرحلة.": "La plateforme est en phase bêta expérimentale et n'engage aucune responsabilité légale pour le moment."`;

code = code.replace('"دزاير أناليتيكا": "DZ Analytica"\n  },', '"دزاير أناليتيكا": "DZ Analytica"' + enAdditions + '\n  },');
code = code.replace('"دزاير أناليتيكا": "DZ Analytica"\n  }', '"دزاير أناليتيكا": "DZ Analytica"' + frAdditions + '\n  }');

fs.writeFileSync('src/translations.ts', code);
console.log('Translations updated.');
