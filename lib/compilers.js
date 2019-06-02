
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
    'ulong': 'i64',
    'bool': 'i32'
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
        let type;
        let value = node.value();
        
        if (tp === types.bool) {
            type = 'i32';
            
            value = value ? 1 : 0;
        }
        else
            type = tp === types.long || tp === types.ulong ? 'i64' : 'i32';
        
        return [ type + '.const', value ];
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
    
    function isList(value) {
        return Array.isArray(value) && Array.isArray(value[0]);
    };
    
    function makeList(head, tail) {
        if (isList(tail))
            return [ head ].concat(tail);
        
        return [ head, tail ];
    }
    
    this.processConditional = function (node) {
        const cond = this.process(node.condition());
        const then = this.process(node.then());
        
        const elsenode = node.else();
        let els;
        
        if (elsenode)
            els = this.process(elsenode);
        
        if (els)
            return [
                'if',
                cond,
                makeList('then', then),
                makeList('else', els)];
        else
            return [
                'if',
                cond,
                makeList('then', then)];
    };
    
    this.processLoop = function (node) {
        let result = [
            'loop',
            [ 'if', [ 'i32.eqz', this.process(node.condition()) ],
                [ 'then', [ 'br', 1 ]]]];

        const body = this.process(node.body());
        
        if (isList(body))
            result = result.concat(body);
        else
            result.push(body);
        
        result.push([ 'br', 0 ]);
                
        return result;
    };
    
    this.processSequence = function (node) {
        const nodes = node.nodes();
        const l = nodes.length;
        const result = [];
        
        for (let k = 0; k < l; k++)
            result.push(this.process(nodes[k]));
        
        return result;
    };
    
    this.processVariable = function (node) {
        const expr = node.expression();
        const name = node.name();
        const tp = compileType(node.type());
        
        const decl = [
                'local',
                '$' + name,
                tp
            ];
            
        if (expr == null)
            return decl;
        
        return [ decl, [ 'set_local', '$' + name, this.process(expr) ] ];
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

