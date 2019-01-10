
var x = require('../lib/expressions');
var t = require('../lib/types');

function compileConstant(test, type, value, expected) {
    test.deepEqual(x.constant(type, value).compile(), expected);
}

exports['compile integer constants'] = function (test) {
    compileConstant(test, t.int, 42, [ 'i32.const', 42 ]);
    compileConstant(test, t.uint, 42, [ 'i32.const', 42 ]);
    compileConstant(test, t.long, 144, [ 'i64.const', 144 ]);
    compileConstant(test, t.ulong, 144, [ 'i64.const', 144 ]);
};

