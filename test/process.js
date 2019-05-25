
const compilers = require('../lib/compilers');
const types = require('../lib/types');
const visibilities = require('../lib/visibilities');
const geast = require('geast');

exports['process integer constant'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.constant(42));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.const',  42 ]);
};

exports['process add integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('+', geast.constant(40), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.add', [ 'i32.const', 40 ], [ 'i32.const', 2 ] ] );
};

exports['process subtract integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('-', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.sub', [ 'i32.const',  44 ], [ 'i32.const',  2 ] ] );
};

exports['process multiply integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('*', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.mul', [ 'i32.const', 44 ], [ 'i32.const',  2 ] ] );
};

exports['process divide signed integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('/', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.div_s', [ 'i32.const', 44 ], [ 'i32.const', 2 ] ] );
};

exports['process bitwise and integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('&', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.and', [ 'i32.const', 44 ], [ 'i32.const', 2 ] ] );
};

exports['process bitwise or integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('|', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.or', [ 'i32.const', 44 ], [ 'i32.const', 2 ] ] );
};

exports['process bitwise xor integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('^', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.xor', [ 'i32.const', 44 ], [ 'i32.const', 2 ] ] );
};

exports['process equal integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('==', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.eq', [ 'i32.const', 44 ], [ 'i32.const', 2 ] ] );
};

exports['process not equal integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('!=', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.ne', [ 'i32.const', 44 ], [ 'i32.const', 2 ] ] );
};

exports['process less signed integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('<', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.lt_s', [ 'i32.const', 44 ], [ 'i32.const', 2 ] ] );
};

exports['process less equal signed integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('<=', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.le_s', [ 'i32.const', 44 ], [ 'i32.const', 2 ] ] );
};

exports['process greater signed integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('>', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.gt_s', [ 'i32.const', 44 ], [ 'i32.const', 2 ] ] );
};

exports['process greater equal signed integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('>=', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.ge_s', [ 'i32.const', 44 ], [ 'i32.const', 2 ] ] );
};

exports['process load local variable'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.name('a');
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'get_local', '$a' ]);
};

exports['process set local variable'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.assign(geast.name('a'), geast.constant(42));
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, ['set_local', '$a', [ 'i32.const', 42 ] ]);
};

exports['process continue'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.continue();
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'br', 0 ]);
};

exports['process void function without arguments'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.function('foo', types.void, [], geast.sequence([ geast.constant(42) ]), visibilities.public);
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'func', '$foo', [ 'i32.const', 42 ] ]);
};

exports['process uint function without arguments'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.function('foo', types.uint, [], geast.sequence([ geast.constant(42) ]), visibilities.public);
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'func', '$foo', [ 'result', 'i32' ], [ 'i32.const', 42 ] ]);
};

exports['process int function without arguments'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.function('foo', types.int, [], geast.sequence([ geast.constant(42) ]), visibilities.public);
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'func', '$foo', [ 'result', 'i32' ], [ 'i32.const', 42 ] ]);
};

exports['process long function without arguments'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.function('foo', types.long, [], geast.sequence([ geast.constant(42) ]), visibilities.public);
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'func', '$foo', [ 'result', 'i64' ], [ 'i32.const', 42 ] ]);
};

exports['process ulong function without arguments'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.function('foo', types.ulong, [], geast.sequence([ geast.constant(42) ]), visibilities.public);
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'func', '$foo', [ 'result', 'i64' ], [ 'i32.const', 42 ] ]);
};

exports['process function with arguments'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.function('add', types.int, [ geast.argument('a', types.int), geast.argument('b', types.int)], geast.sequence([ geast.binary('+', geast.name('a'), geast.name('b')) ]), visibilities.public);
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'func', '$add', [ 'param', '$a', 'i32' ], [ 'param', '$b', 'i32' ], [ 'result', 'i32' ], [ 'i32.add', [ 'get_local', '$a' ], [ 'get_local', '$b' ] ] ]);
    
    test.equal(compiler.exports().length, 1);
};

