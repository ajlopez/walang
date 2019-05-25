
const walang = require('../..');
const fs = require('fs');

const filename = process.argv[2];
const text = fs.readFileSync(filename).toString();
const code = walang.compile(text);

console.log(code);

