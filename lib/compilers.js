
const types = require('./types');

const binops = {
    '==': 'eq',
    '!=': 'ne',
    '>': 'gt_s',
    '>=': 'ge_s',
    '<': 'lt_s',
    '<=': 'le_s',
    '+': 'add',
    '-': 'sub',
    '*': 'mul',
    '/': 'div_s',
    '&': 'and',
    '|': 'or',
    '^': 'xor'
};

function compileType(type) {
    if (type === types.int)
        return 'i32';
}

function Compiler() {
    this.process = function (node) {
        return node.process(this);
    };
    
    this.processBinary = function (node) {
        const op = binops[node.operator()];
        
        return [
            'i32.' + op,
            this.process(node.left()),
            this.process(node.right())
        ];
    };
    
    this.processConstant = function (node) {
        return [ 'i32.const', node.value() ];
    };
    
    this.processName = function (node) {
        return [ 'get_local', '$' + node.name() ];
    };
    
    this.processAssign = function (node) {
        return [ 'set_local', '$' + node.lefthand().name(), this.process(node.expression()) ];
    };
    
    this.processContinue = function (node) {
        return [ 'br', 0 ];
    };
    
    this.processReturn = function (node) {
        return this.process(node.expression());
    };
    
    this.processSequence = function (node) {
        const nodes = node.nodes();
        const l = nodes.length;
        const result = [];
        
        for (let k = 0; k < l; k++)
            result.push(this.process(nodes[k]));
        
        return result;
    };
    
    this.processFunction = function (node) {
        const result = [];
        
        result.push('func')
        result.push('$' + node.name());
        
        const arguments = node.arguments();
        const na = arguments.length;
        
        for (let k = 0; k < na; k++)
            result.push([ 'param', '$' + arguments[k].name(), compileType(arguments[k].type()) ]);
        
        const returns = node.type();
        
        if (returns != 'void')
            result.push([ 'result', compileType(returns) ]);
        
        const body = this.process(node.body());
        
        return result.concat(body);
    };
}

function createCompiler() {
    return new Compiler();
}

module.exports = {
    compiler: createCompiler
};

