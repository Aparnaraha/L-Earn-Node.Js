const fs = require('fs');

fs.readFile('Practise-2/example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('File content:', data);
});
