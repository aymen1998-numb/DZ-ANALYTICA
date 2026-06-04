const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
const untranslatedLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (/[\u0600-\u06FF]/.test(line)) {
    if (!line.includes('t(') && !line.includes('name:') && !line.includes('//')) {
      untranslatedLines.push((i + 1) + ': ' + line);
    }
  }
}

if (untranslatedLines.length > 0) {
  console.log("Untranslated Arabic lines found:\n" + untranslatedLines.join('\n'));
} else {
  console.log("All Arabic lines are wrapped with t() !");
}
