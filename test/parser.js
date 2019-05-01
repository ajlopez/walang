
const parser = require('../lib/parser');
const types = require('../lib/types');
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

