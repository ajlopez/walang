
const walang = require('../..');

const filename = process.argv[2];
const code = walang.compileFile(filename);

console.log(code);

