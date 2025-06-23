const path = require('path');
const fs = require('fs');

// 1. Path module example
console.log('--- Path Module ---');
const filePath = 'Practise-2/example.txt';
console.log('Folder:', path.dirname(filePath));
console.log('File Name:', path.basename(filePath));
console.log('Extension:', path.extname(filePath));
console.log('------------------\n');
