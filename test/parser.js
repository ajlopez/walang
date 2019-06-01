
const parser = require('../lib/parser');
const types = require('../lib/types');
const visibilities = require('../lib/visibilities');
const geast = require('geast');

function parse(test, type, text, expected) {
    test.deepEqual(geast.toObject(parser.parse(type, text)), expected);
}

exports['parse constants'] = function (test) {
    parse(test, 'integer', '42', { ntype: 'constant', value: 42, type: types.uint });
    parse(test, 'integer', '-3', { ntype: 'constant', value: -3, type: types.int });
    parse(test, 'real', '3.14159', { ntype: 'constant', value: 3.14159, type: types.float });
    parse(test, 'string', '"foo"', { ntype: 'constant', value: 'foo', type: types.string });
    parse(test, 'boolean', 'true', { ntype: 'constant', value: true, type: types.bool });
    parse(test, 'boolean', 'false', { ntype: 'constant', value: false, type: types.bool });
};

exports['parse terms'] = function (test) {
    parse(test, 'term', '42', { ntype: 'constant', value: 42, type: types.uint });
    parse(test, 'term', '3.14159', { ntype: 'constant', value: 3.14159, type: types.float });
    parse(test, 'term', '"foo"', { ntype: 'constant', value: 'foo', type: types.string });
    parse(test, 'term', 'true', { ntype: 'constant', value: true, type: types.bool });
    parse(test, 'term', 'false', { ntype: 'constant', value: false, type: types.bool });
    parse(test, 'term', 'answer', { ntype: 'name', name: 'answer' });
};

exports['parse types'] = function (test) {
    parse(test, 'type', 'int', types.int);
    parse(test, 'type', 'uint', types.uint);
    parse(test, 'type', 'long', types.long);
    parse(test, 'type', 'ulong', types.ulong);
    parse(test, 'type', 'float', types.float);
    parse(test, 'type', 'double', types.double);
    parse(test, 'type', 'boolean', types.boolean);
    parse(test, 'xtype', 'void', types.void);
};

exports['parse visibilities'] = function (test) {
    parse(test, 'visibility', 'public', visibilities.public);
    parse(test, 'visibility', 'private', visibilities.private);
};

exports['parse arithmetic expressions'] = function (test) {
    parse(test, 'expression', '40+2', { ntype: 'binary', operator: '+', left: { ntype: 'constant', value: 40, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }});
    parse(test, 'expression', '20*2+2', { ntype: 'binary', operator: '+', left: { ntype: 'binary', operator: '*', left: { ntype: 'constant', value: 20, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }}, right: { ntype: 'constant', value: 2, type: types.uint }});
    parse(test, 'expression', '80/2+2', { ntype: 'binary', operator: '+', left: { ntype: 'binary', operator: '/', left: { ntype: 'constant', value: 80, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }}, right: { ntype: 'constant', value: 2, type: types.uint }});
    parse(test, 'expression', '2+2*20', { ntype: 'binary', operator: '+', left: { ntype: 'constant', value: 2, type: types.uint }, right: { ntype: 'binary', operator: '*', left: { ntype: 'constant', value: 2, type: types.uint }, right: { ntype: 'constant', value: 20, type: types.uint }}});
    parse(test, 'expression', '2+80/2', { ntype: 'binary', operator: '+', left: { ntype: 'constant', value: 2, type: types.uint }, right: { ntype: 'binary', operator: '/', left: { ntype: 'constant', value: 80, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }}});
    parse(test, 'expression', '44-2', { ntype: 'binary', operator: '-', left: { ntype: 'constant', value: 44, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }});
    parse(test, 'expression', '21*2', { ntype: 'binary', operator: '*', left: { ntype: 'constant', value: 21, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }});
    parse(test, 'expression', '84/2', { ntype: 'binary', operator: '/', left: { ntype: 'constant', value: 84, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }});
    parse(test, 'expression', '(40+2)', { ntype: 'binary', operator: '+', left: { ntype: 'constant', value: 40, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }});
};

exports['parse comparison expressions'] = function (test) {
    parse(test, 'expression', '40<2', { ntype: 'binary', operator: '<', left: { ntype: 'constant', value: 40, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }});
    parse(test, 'expression', '40<=2', { ntype: 'binary', operator: '<=', left: { ntype: 'constant', value: 40, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }});
    parse(test, 'expression', '40>2', { ntype: 'binary', operator: '>', left: { ntype: 'constant', value: 40, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }});
    parse(test, 'expression', '40>=2', { ntype: 'binary', operator: '>=', left: { ntype: 'constant', value: 40, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }});
    parse(test, 'expression', '40==2', { ntype: 'binary', operator: '==', left: { ntype: 'constant', value: 40, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }});
    parse(test, 'expression', '40!=2', { ntype: 'binary', operator: '!=', left: { ntype: 'constant', value: 40, type: types.uint }, right: { ntype: 'constant', value: 2, type: types.uint }});
    parse(test, 'expression', '40<2*40', { ntype: 'binary', operator: '<', left: { ntype: 'constant', value: 40, type: types.uint }, right: { ntype: 'binary', operator: '*', left: { ntype: 'constant', value: 2, type: types.uint }, right: { ntype: 'constant', value: 40, type: types.uint } }});
};

exports['parse variable declarations'] = function (test) {
    parse(test, 'command', 'int a;', { ntype: 'variable', name: 'a', type: types.int });
    parse(test, 'command', 'uint a;', { ntype: 'variable', name: 'a', type: types.uint });
    parse(test, 'command', 'long a;', { ntype: 'variable', name: 'a', type: types.long });
    parse(test, 'command', 'ulong a;', { ntype: 'variable', name: 'a', type: types.ulong });
    parse(test, 'command', 'float a;', { ntype: 'variable', name: 'a', type: types.float });
    parse(test, 'command', 'double a;', { ntype: 'variable', name: 'a', type: types.double });
    parse(test, 'command', 'bool a;', { ntype: 'variable', name: 'a', type: types.bool });
};

exports['parse variable initializations'] = function (test) {
    parse(test, 'command', 'int a = 42;', { ntype: 'variable', name: 'a', type: types.int, expression: { ntype: 'constant', value: 42, type: types.uint }});
    parse(test, 'command', 'uint a = 42;', { ntype: 'variable', name: 'a', type: types.uint, expression: { ntype: 'constant', value: 42, type: types.uint } });
    parse(test, 'command', 'long a = 1;', { ntype: 'variable', name: 'a', type: types.long, expression: { ntype: 'constant', value: 1, type: types.uint } });
    parse(test, 'command', 'ulong a = 1;', { ntype: 'variable', name: 'a', type: types.ulong, expression: { ntype: 'constant', value: 1, type: types.uint } });
    parse(test, 'command', 'float a = 1.2;', { ntype: 'variable', name: 'a', type: types.float, expression: { ntype: 'constant', value: 1.2, type: types.float } });
    parse(test, 'command', 'double a = 3.1415;', { ntype: 'variable', name: 'a', type: types.double, expression: { ntype: 'constant', value: 3.1415, type: types.float } });
    parse(test, 'command', 'bool a = true;', { ntype: 'variable', name: 'a', type: types.bool, expression: { ntype: 'constant', value: true, type: types.bool } });
};

exports['parse assign command'] = function (test) {
    parse(test, 'command', 'a = 42;', { ntype: 'assign', lefthand: { ntype: 'name', name: 'a' }, expression: { ntype: 'constant', value: 42, type: types.uint }});
};

exports['parse composite commands'] = function (test) {
    parse(test, 'command', '{}', { ntype: 'sequence', nodes: [] });
    parse(test, 'command', '{ a = 42; }', { ntype: 'sequence', nodes: [ { ntype: 'assign', lefthand: { ntype: 'name', name: 'a' }, expression: { ntype: 'constant', value: 42, type: types.uint }} ] });
    parse(test, 'command', '{ a = 42; b = 1; }', { ntype: 'sequence', nodes: [ { ntype: 'assign', lefthand: { ntype: 'name', name: 'a' }, expression: { ntype: 'constant', value: 42, type: types.uint }}, { ntype: 'assign', lefthand: { ntype: 'name', name: 'b' }, expression: { ntype: 'constant', value: 1, type: types.uint }} ] });
    parse(test, 'command', '{ return x+y; }', { ntype: 'sequence', nodes: [ { ntype: 'return', expression: { ntype: 'binary', operator: '+', left: { ntype: 'name', name: 'x' }, right: { ntype: 'name', name: 'y' } } } ]});
};

exports['parse if command'] = function (test) {
    parse(test, 'command', 'if (b) a = 42;', { ntype: 'conditional', condition: { ntype: 'name', name: 'b' }, then: { ntype: 'assign', lefthand: { ntype: 'name', name: 'a' }, expression: { ntype: 'constant', value: 42, type: types.uint }}});
    parse(test, 'command', 'if (b) a = 42; else a = 1;', { ntype: 'conditional', condition: { ntype: 'name', name: 'b' }, then: { ntype: 'assign', lefthand: { ntype: 'name', name: 'a' }, expression: { ntype: 'constant', value: 42, type: types.uint }}, else: { ntype: 'assign', lefthand: { ntype: 'name', name: 'a' }, expression: { ntype: 'constant', value: 1, type: types.uint }}});
};

exports['parse while command'] = function (test) {
    parse(test, 'command', 'while (k < 10) k = k + 1;', { ntype: 'loop', condition: { ntype: 'binary', operator: '<', left: { ntype: 'name', name: 'k' }, right: { ntype: 'constant', value: 10, type: types.uint } }, body: { ntype: 'assign', lefthand: { ntype: 'name', name: 'k' }, expression: { ntype: 'binary', operator: '+', left: { ntype: 'name', name: 'k' }, right: { ntype: 'constant', value: 1, type: types.uint }  }}});
};

exports['parse return command'] = function (test) {
    parse(test, 'command', 'return 42;', { ntype: 'return', expression: { ntype: 'constant', value: 42, type: types.uint } });
};

exports['parse functions'] = function (test) {
    parse(test, 'function', 'public void main() {}', { ntype: 'function', name: 'main', visibility: visibilities.public, type: types.void, arguments: [], body: { ntype: 'sequence', nodes: [] }});
    parse(test, 'function', 'private void main() {}', { ntype: 'function', name: 'main', visibility: visibilities.private, type: types.void, arguments: [], body: { ntype: 'sequence', nodes: [] }});
    parse(test, 'function', 'void main() {}', { ntype: 'function', name: 'main', visibility: visibilities.private, type: types.void, arguments: [], body: { ntype: 'sequence', nodes: [] }});
    parse(test, 'function', 'uint add(uint x, uint y) { return x+y; }', { ntype: 'function', name: 'add', visibility: visibilities.private, type: types.uint, arguments: [ { ntype: 'argument', type: types.uint, name: 'x' }, { ntype: 'argument', type: types.uint, name: 'y' }], body: { ntype: 'sequence', nodes: [ { ntype: 'return', expression: { ntype: 'binary', operator: '+', left: { ntype: 'name', name: 'x' }, right: { ntype: 'name', name: 'y' }}}] }});
};

exports['parse programs'] = function (test) {
    parse(test, 'program', 'uint a; public void main() {}', { ntype: 'sequence', nodes: [ { ntype: 'variable', name: 'a', type: types.uint }, { ntype: 'function', name: 'main', visibility: visibilities.public, type: types.void, arguments: [], body: { ntype: 'sequence', nodes: [] }} ] });
};

