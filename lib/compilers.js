
function Compiler() {
    this.process = function (node) {
        return node.process(this);
    };
    
    this.processConstant = function (node) {
        return 'i32.const ' + node.value();
    };
}

function createCompiler() {
    return new Compiler();
}

module.exports = {
    compiler: createCompiler
};