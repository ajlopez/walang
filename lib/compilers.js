
const types = require('./types');
const parser = require('./parser');
const visibilities = require('./visibilities');
const contexts = require('./contexts');

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
    '/': 'div_',
    '&': 'and',
    '|': 'or',
    '^': 'xor'
};

const binoptypes = {
    '==': types.bool,
    '!=': types.bool,
    '>': types.bool,
    '>=': types.bool,
    '<': types.bool,
    '<=': types.bool,
    '+': '?int',
    '-': '?int',
    '*': '?int',
    '/': '?int',
    '&': '?int',
    '|': '?int',
    '^': '?int'
};

const typestext = {
    'int': 'i32',
    'uint': 'i32',
    'long': 'i64',
    'ulong': 'i64'
}

function compileType(type) {
    return typestext[type];    
}

// TODO process long/ulong/float/double types
function calculateType2(type, ltype, rtype) {
    if (type === '?int' || type === '?int?')
        if (ltype === types.uint && rtype === types.uint)
            return types.uint;
        else if (ltype === types.ulong && rtype === types.ulong)
            return types.ulong;
        else if (ltype === types.ulong || ltype === types.long)
            return types.long;
        else if (rtype === types.ulong || rtype === types.long)
            return types.long;
        else
            return types.int;
    
    return type;
}

function setType(node, type) {
    if (node.type)
        return;
    
    node.define('type');
    node.type(type);
}

function Compiler() {
    const publics = [];
    let context = contexts.context();
    
    this.process = function (node) {
        return node.process(this);
    };
    
    this.processBinary = function (node) {
        const operator = node.operator();
        let op = binops[operator];
        const tp = binoptypes[operator];
        const left = node.left();
        const lvalue = this.process(left);
        const right = node.right();
        const rvalue = this.process(right);

        const type = calculateType2(tp, left.type(), right.type());

        setType(node, type);
        
        if (op.endsWith('_'))
            if (type === types.uint)
                op += 'u';
            else
                op += 's';
        
        const typetext = type === types.long || type === types.ulong ? 'i64' : 'i32';
        
        return [
            typetext + '.' + op,
            lvalue,
            rvalue
        ];
    };
    
    // TODO process other constant types
    this.processConstant = function (node) {
        const tp = node.type();
        const type = tp === types.long || tp === types.ulong ? 'i64' : 'i32';
        
        return [ type + '.const', node.value() ];
    };
    
    this.processName = function (node) {
        const name = node.name();
        const def = context.get(name);
        
        if (def && def.type)
            setType(node, def.type);
        
        return [ 'get_local', '$' + name ];
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
        const parent = context;
        context = contexts.context(parent);
        
        const result = [];
        const name = node.name();
        
        if (node.visibility() === visibilities.public)
            publics.push(name);

        result.push('func')
        result.push('$' + name);
        
        const arguments = node.arguments();
        const na = arguments.length;
        
        for (let k = 0; k < na; k++) {
            const argument = arguments[k];
            const name = argument.name();
            const type = argument.type();
            
            result.push([ 'param', '$' + name, compileType(type) ]);
            context.set(name, { scope: 'local', type: type });
        }
        
        const returns = node.type();
        
        if (returns !== types.void)
            result.push([ 'result', compileType(returns) ]);
        
        const body = this.process(node.body());
        
        context = parent;
        
        return result.concat(body);
    };
    
    this.exports = function () {
        const result = [];
        const l = publics.length;
        
        for (let k = 0; k < l; k++)
            result.push([ 'export', '"' + publics[k] + '"', [ 'func', '$' + publics[k] ] ]);
        
        return result;
    };
}

function createCompiler() {
    return new Compiler();
}

module.exports = {
    compiler: createCompiler
};

