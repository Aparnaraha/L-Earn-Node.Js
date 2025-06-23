const fs = require('fs');

// Sync Read
const data = fs.readFileSync('Practise-2/example.txt', 'utf8');
console.log('📤 Sync Data:', data);

// Async Read
fs.readFile('Practise-2/example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('📤 Async Data:', data);
});
