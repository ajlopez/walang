
const parser = require('./parser');
const compilers = require('./compilers');
const formatter = require('./formatter');

const fs = require('fs');

function compile(text) {
    const ast = parser.parse('program', text);
    
    return formatter(compilers.compiler().process(ast));
}

function compileFile(filename) {
    return compile(fs.readFileSync(filename).toString());
}

module.exports = {
    compile: compile,
    compileFile: compileFile
};