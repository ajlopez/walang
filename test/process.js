
const compilers = require('../lib/compilers');
const geast = require('geast');

exports['process integer constant'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.constant(42));
    
    test.ok(result);
    test.equal(result, 'i32.const 42');
};

exports['process add integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('+', geast.constant(40), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.add', [ 'i32.const 40' ], [ 'i32.const 2' ] ] );
};

exports['process subtract integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('-', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.sub', [ 'i32.const 44' ], [ 'i32.const 2' ] ] );
};

exports['process multiply integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('*', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.mul', [ 'i32.const 44' ], [ 'i32.const 2' ] ] );
};

exports['process divide signed integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('/', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.div_s', [ 'i32.const 44' ], [ 'i32.const 2' ] ] );
};

exports['process bitwise and integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('&', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.and', [ 'i32.const 44' ], [ 'i32.const 2' ] ] );
};

exports['process bitwise or integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('|', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.or', [ 'i32.const 44' ], [ 'i32.const 2' ] ] );
};

exports['process bitwise xor integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('^', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.xor', [ 'i32.const 44' ], [ 'i32.const 2' ] ] );
};

exports['process equal integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('==', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.eq', [ 'i32.const 44' ], [ 'i32.const 2' ] ] );
};

exports['process not equal integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('!=', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.ne', [ 'i32.const 44' ], [ 'i32.const 2' ] ] );
};

exports['process less signed integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('<', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.lt_s', [ 'i32.const 44' ], [ 'i32.const 2' ] ] );
};

exports['process less equal signed integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('<=', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.le_s', [ 'i32.const 44' ], [ 'i32.const 2' ] ] );
};

exports['process greater signed integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('>', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.gt_s', [ 'i32.const 44' ], [ 'i32.const 2' ] ] );
};

exports['process greater equal signed integers'] = function (test) {
    const compiler = compilers.compiler();
    
    const result = compiler.process(geast.binary('>=', geast.constant(44), geast.constant(2)));
    
    test.ok(result);
    test.deepEqual(result, [ 'i32.ge_s', [ 'i32.const 44' ], [ 'i32.const 2' ] ] );
};

exports['process load local variable'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.name('a');
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.equal(result, 'get_local $a');
};

exports['process set local variable'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.assign(geast.name('a'), geast.constant(42));
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.deepEqual(result, ['set_local $a', [ 'i32.const 42' ] ]);
};

exports['process continue'] = function (test) {
    const compiler = compilers.compiler();
    const node = geast.continue();
    
    const result = compiler.process(node);
    
    test.ok(result);
    test.equal(result, 'br 0');
};

