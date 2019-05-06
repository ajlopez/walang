
const parser = require('../lib/parser');
const types = require('../lib/types');
const visibilities = require('../lib/visibilities');
const geast = require('geast');

function parse(test, type, text, expected) {
    test.deepEqual(geast.toObject(parser.parse(type, text)), expected);
}

exports['parse constants'] = function (test) {
    parse(test, 'integer', '42', { ntype: 'constant', value: 42 });
    parse(test, 'real', '3.14159', { ntype: 'constant', value: 3.14159 });
    parse(test, 'string', '"foo"', { ntype: 'constant', value: 'foo' });
    parse(test, 'boolean', 'true', { ntype: 'constant', value: true });
    parse(test, 'boolean', 'false', { ntype: 'constant', value: false });
};

exports['parse terms'] = function (test) {
    parse(test, 'term', '42', { ntype: 'constant', value: 42 });
    parse(test, 'term', '3.14159', { ntype: 'constant', value: 3.14159 });
    parse(test, 'term', '"foo"', { ntype: 'constant', value: 'foo' });
    parse(test, 'term', 'true', { ntype: 'constant', value: true });
    parse(test, 'term', 'false', { ntype: 'constant', value: false });
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
};

exports['parse visibilities'] = function (test) {
    parse(test, 'visibility', 'public', visibilities.public);
    parse(test, 'visibility', 'private', visibilities.private);
};

exports['parse arithmetic expressions'] = function (test) {
    parse(test, 'expression', '40+2', { ntype: 'binary', operator: '+', left: { ntype: 'constant', value: 40 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '20*2+2', { ntype: 'binary', operator: '+', left: { ntype: 'binary', operator: '*', left: { ntype: 'constant', value: 20 }, right: { ntype: 'constant', value: 2 }}, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '80/2+2', { ntype: 'binary', operator: '+', left: { ntype: 'binary', operator: '/', left: { ntype: 'constant', value: 80 }, right: { ntype: 'constant', value: 2 }}, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '2+2*20', { ntype: 'binary', operator: '+', left: { ntype: 'constant', value: 2 }, right: { ntype: 'binary', operator: '*', left: { ntype: 'constant', value: 2 }, right: { ntype: 'constant', value: 20 }}});
    parse(test, 'expression', '2+80/2', { ntype: 'binary', operator: '+', left: { ntype: 'constant', value: 2 }, right: { ntype: 'binary', operator: '/', left: { ntype: 'constant', value: 80 }, right: { ntype: 'constant', value: 2 }}});
    parse(test, 'expression', '44-2', { ntype: 'binary', operator: '-', left: { ntype: 'constant', value: 44 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '21*2', { ntype: 'binary', operator: '*', left: { ntype: 'constant', value: 21 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '84/2', { ntype: 'binary', operator: '/', left: { ntype: 'constant', value: 84 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '(40+2)', { ntype: 'binary', operator: '+', left: { ntype: 'constant', value: 40 }, right: { ntype: 'constant', value: 2 }});
};

exports['parse comparison expressions'] = function (test) {
    parse(test, 'expression', '40<2', { ntype: 'binary', operator: '<', left: { ntype: 'constant', value: 40 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '40<=2', { ntype: 'binary', operator: '<=', left: { ntype: 'constant', value: 40 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '40>2', { ntype: 'binary', operator: '>', left: { ntype: 'constant', value: 40 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '40>=2', { ntype: 'binary', operator: '>=', left: { ntype: 'constant', value: 40 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '40==2', { ntype: 'binary', operator: '==', left: { ntype: 'constant', value: 40 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '40!=2', { ntype: 'binary', operator: '!=', left: { ntype: 'constant', value: 40 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '40<2*40', { ntype: 'binary', operator: '<', left: { ntype: 'constant', value: 40 }, right: { ntype: 'binary', operator: '*', left: { ntype: 'constant', value: 2 }, right: { ntype: 'constant', value: 40 } }});
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

exports['parse assign command'] = function (test) {
    parse(test, 'command', 'a = 42;', { ntype: 'assign', lefthand: { ntype: 'name', name: 'a' }, expression: { ntype: 'constant', value: 42 }});
};

exports['parse composite commands'] = function (test) {
    parse(test, 'command', '{}', { ntype: 'sequence', nodes: [] });
    parse(test, 'command', '{ a = 42; }', { ntype: 'sequence', nodes: [ { ntype: 'assign', lefthand: { ntype: 'name', name: 'a' }, expression: { ntype: 'constant', value: 42 }} ] });
    parse(test, 'command', '{ a = 42; b = 1; }', { ntype: 'sequence', nodes: [ { ntype: 'assign', lefthand: { ntype: 'name', name: 'a' }, expression: { ntype: 'constant', value: 42 }}, { ntype: 'assign', lefthand: { ntype: 'name', name: 'b' }, expression: { ntype: 'constant', value: 1 }} ] });
};

exports['parse if command'] = function (test) {
    parse(test, 'command', 'if (b) a = 42;', { ntype: 'conditional', condition: { ntype: 'name', name: 'b' }, then: { ntype: 'assign', lefthand: { ntype: 'name', name: 'a' }, expression: { ntype: 'constant', value: 42 }}});
    parse(test, 'command', 'if (b) a = 42; else a = 1;', { ntype: 'conditional', condition: { ntype: 'name', name: 'b' }, then: { ntype: 'assign', lefthand: { ntype: 'name', name: 'a' }, expression: { ntype: 'constant', value: 42 }}, else: { ntype: 'assign', lefthand: { ntype: 'name', name: 'a' }, expression: { ntype: 'constant', value: 1 }}});
};

exports['parse while command'] = function (test) {
    parse(test, 'command', 'while (k < 10) k = k + 1;', { ntype: 'loop', condition: { ntype: 'binary', operator: '<', left: { ntype: 'name', name: 'k' }, right: { ntype: 'constant', value: 10 } }, body: { ntype: 'assign', lefthand: { ntype: 'name', name: 'k' }, expression: { ntype: 'binary', operator: '+', left: { ntype: 'name', name: 'k' }, right: { ntype: 'constant', value: 1 }  }}});
};
