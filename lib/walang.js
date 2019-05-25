
const parser = require('./parser');
const compilers = require('./compilers');
const formatter = require('./formatter');

function compile(text) {
    const ast = parser.parse('program', text);
    
    return formatter(compilers.compiler().process(ast));
}

module.exports = {
    compile: compile
};