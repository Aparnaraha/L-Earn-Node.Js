const fs = require('fs');

const log = ` Log Entry: ${new Date().toISOString()}\n`;

fs.appendFile('log.txt', log, (err) => {
  if (err) throw err;
  console.log(' Log save ho gaya!');
});
