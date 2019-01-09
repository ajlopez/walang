
var types = require('../lib/types');

exports['initial types'] = function (test) {
    test.ok(types.int);
    test.ok(types.long);
    test.ok(types.uint);
    test.ok(types.ulong);
    test.ok(types.float);
    test.ok(types.double);
    
    test.ok(types.isType(types.int));
    test.ok(types.isType(types.long));
    test.ok(types.isType(types.uint));
    test.ok(types.isType(types.ulong));
    test.ok(types.isType(types.float));
    test.ok(types.isType(types.double));
};

