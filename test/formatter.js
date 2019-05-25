
const formatter = require('../lib/formatter');

exports['format array with one element'] = function (test) {
    const result = formatter([ [ 'result', 'i32' ] ]);
    
    test.equal(result, '(result i32)\r\n');
};

exports['format array with two elements'] = function (test) {
    const result = formatter([ [ 'result', 'i32' ], [ 'get_local', '$a' ] ]);
    
    test.equal(result, '(result i32)\r\n(get_local $a)\r\n');
};

exports['format array with nested elements'] = function (test) {
    const result = formatter([ [ 'add', [ 'i32.constant', 40 ], [ 'i32.constant', 2 ] ] ]);
    
    test.equal(result, '(add\r\n  (i32.constant 40)\r\n  (i32.constant 2)\r\n)\r\n');
};


