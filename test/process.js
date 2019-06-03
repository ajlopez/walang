
const compilers = require('../lib/compilers');
const types = require('../lib/types');
const visibilities = require('../lib/visibilities');
const geast = require('geast');

exports['process true constant'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.constant(true, types.bool));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.const',  1 ]);
};

exports['process false constant'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.constant(false, types.bool));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.const',  0 ]);
};

exports['process unsigned integer constant'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.constant(42, types.uint));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.const',  42 ]);
};

exports['process signed long integer constant'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.constant(42, types.long));
    
    test.ok(result);
    test.deepEqual(result, [ 'i64.const',  42 ]);
};

exports['process add unsigned integers'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.binary('+', geast.constant(40, types.uint), geast.constant(2, types.uint));
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.add', [ 'i32.const', 40 ], [ 'i32.const', 2 ] ] );
    test.equal(node.type(), types.uint);
};

exports['process add signed integers'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.binary('+', geast.constant(44, types.uint), geast.constant(-2, types.int));
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.add', [ 'i32.const', 44 ], [ 'i32.const', -2 ] ] );
    test.equal(node.type(), types.int);
};

exports['process add unsigned long integers'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.binary('+', geast.constant(40, types.ulong), geast.constant(2, types.ulong));
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'i64.add', [ 'i64.const', 40 ], [ 'i64.const', 2 ] ] );
    test.equal(node.type(), types.ulong);
};

exports['process add signed long integers'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.binary('+', geast.constant(44, types.long), geast.constant(-2, types.long));
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'i64.add', [ 'i64.const', 44 ], [ 'i64.const', -2 ] ] );
    test.equal(node.type(), types.long);
};

exports['process subtract unsigned integers'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.binary('-', geast.constant(44, types.uint), geast.constant(2, types.uint));
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.sub', [ 'i32.const',  44 ], [ 'i32.const',  2 ] ] );
    test.equal(node.type(), types.uint);
};

exports['process subtract signed integers'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.binary('-', geast.constant(44, types.int), geast.constant(2, types.int));
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.sub', [ 'i32.const',  44 ], [ 'i32.const',  2 ] ] );
    test.equal(node.type(), types.int);
};

exports['process multiply unsigned integers'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.binary('*', geast.constant(44, types.uint), geast.constant(2, types.uint));
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.mul', [ 'i32.const', 44 ], [ 'i32.const',  2 ] ] );
    test.equal(node.type(), types.uint);
};

exports['process multiply signed integers'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.binary('*', geast.constant(44, types.int), geast.constant(2, types.int));
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.mul', [ 'i32.const', 44 ], [ 'i32.const',  2 ] ] );
    test.equal(node.type(), types.int);
};

exports['process divide unsigned integers'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.binary('/', geast.constant(44, types.uint), geast.constant(2, types.uint));
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.div_u', [ 'i32.const', 44 ], [ 'i32.const', 2 ] ] );
    test.equal(node.type(), types.uint);
};

exports['process divide signed integers'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.binary('/', geast.constant(44), geast.constant(2));
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.div_s', [ 'i32.const', 44 ], [ 'i32.const', 2 ] ] );
    test.equal(node.type(), types.int);
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

exports['process loop'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.loop(geast.constant(42, types.uint), geast.constant(1, types.uint));
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'loop', [ 'if', [ 'i32.eqz', [ 'i32.const', 42 ] ], [ 'then', [ 'br', 1 ] ] ], [ 'i32.const', 1 ], [ 'br', 0 ]]);
};

exports['process conditional with then'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.conditional(geast.constant(42, types.uint), geast.constant(1, types.uint));
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'if', [ 'i32.const', 42 ], [ 'then', [ 'i32.const', 1 ] ] ]);
};

exports['process conditional with then and else'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.conditional(geast.constant(42, types.uint), geast.constant(1, types.uint), geast.constant(2, types.uint));
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'if', [ 'i32.const', 42 ], [ 'then', [ 'i32.const', 1 ] ], [ 'else', [ 'i32.const', 2 ] ] ]);
};

exports['process conditional with composite then and composite else'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.conditional(geast.constant(42, types.uint), geast.sequence([ geast.constant(1, types.uint), geast.constant(2, types.uint) ]), geast.sequence([ geast.constant(3, types.uint), geast.constant(4, types.uint) ]));
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'if', [ 'i32.const', 42 ], [ 'then', [ 'i32.const', 1 ], [ 'i32.const', 2 ] ], [ 'else', [ 'i32.const', 3 ], [ 'i32.const', 4 ] ] ]);
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

exports['process integer signed variable declaration'] = function(test) {
    const compiler = compilers.compiler();
    const node = geast.variable('a', types.int);
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'local', '$a', 'i32' ]);    
};

exports['process integer signed variable declaration and initialization'] = function(test) {
    const compiler = compilers.compiler();
    const node = geast.variable('a', types.int, geast.constant(42, types.int));
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ [ 'local', '$a', 'i32' ], [ 'set_local', '$a', [ 'i32.const', 42 ] ] ]);    
};

exports['process long integer signed variable declaration and initialization'] = function(test) {
    const compiler = compilers.compiler();
    const node = geast.variable('a', types.long, geast.constant(42, types.int));
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ [ 'local', '$a', 'i64' ], [ 'set_local', '$a', [ 'i32.const', 42 ] ] ]);    
};

exports['process long integer unsigned variable declaration and initialization'] = function(test) {
    const compiler = compilers.compiler();
    const node = geast.variable('a', types.ulong, geast.constant(42, types.int));
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ [ 'local', '$a', 'i64' ], [ 'set_local', '$a', [ 'i32.const', 42 ] ] ]);    
};

exports['process integer unsigned variable declaration and initialization'] = function(test) {
    const compiler = compilers.compiler();
    const node = geast.variable('a', types.uint, geast.constant(42));
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ [ 'local', '$a', 'i32' ], [ 'set_local', '$a', [ 'i32.const', 42 ] ] ]);    
};

exports['process integer unsigned variable declaration and initialization inside a sequence'] = function(test) {
    const compiler = compilers.compiler();
    const node = geast.sequence([ geast.variable('a', types.uint, geast.constant(42)) ]);
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ [ 'local', '$a', 'i32' ], [ 'set_local', '$a', [ 'i32.const', 42 ] ] ]);    
};

exports['process boolean variable declaration'] = function(test) {
    const compiler = compilers.compiler();
    const node = geast.variable('a', types.bool);
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, [ 'local', '$a', 'i32' ]);    
};

