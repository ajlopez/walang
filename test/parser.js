
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse constants'] = function (test) {
    test.deepEqual(geast.toObject(parser.parse('integer', '42')), { ntype: 'constant', value: 42 });
    test.deepEqual(geast.toObject(parser.parse('real', '3.14159')), { ntype: 'constant', value: 3.14159 });
    test.deepEqual(geast.toObject(parser.parse('string', '"foo"')), { ntype: 'constant', value: 'foo' });
    test.deepEqual(geast.toObject(parser.parse('boolean', 'true')), { ntype: 'constant', value: true });
    test.deepEqual(geast.toObject(parser.parse('boolean', 'false')), { ntype: 'constant', value: false });
};

