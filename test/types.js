
var types = require('../lib/types');

exports['initial types'] = function (test) {
    test.ok(types.int);
    test.ok(types.long);
    test.ok(types.uint);
    test.ok(types.ulong);
    test.ok(types.float);
    test.ok(types.double);
    test.ok(types.bool);
};

