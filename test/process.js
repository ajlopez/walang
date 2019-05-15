
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
