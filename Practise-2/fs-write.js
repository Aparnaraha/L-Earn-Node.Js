const fs = require('fs');

fs.writeFile('output.txt', 'Hello Node.js!', (err) => {
  if (err) throw err;
  console.log('✅ File save ho gaya!');
});
