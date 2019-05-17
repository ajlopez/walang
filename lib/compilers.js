
const binops = {
    '+': 'add',
    '-': 'sub',
    '*': 'mul',
    '&': 'and',
    '|': 'or'
};

function Compiler() {
    this.process = function (node) {
        return node.process(this);
    };
    
    this.processBinary = function (node) {
        const op = binops[node.operator()];
        
        return [
            'i32.' + op,
            [ this.process(node.left()) ],
            [ this.process(node.right()) ]
        ];
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

