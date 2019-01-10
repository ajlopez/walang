
var x = require('../lib/expressions');
var types = require('../lib/types');

exports['create integer constant'] = function (test) {
    var expr = x.constant(types.int, 10);
    
    test.ok(expr);
    test.equal(typeof expr, 'object');
    test.equal(expr.value(), 10);
    test.equal(expr.type(), types.int);
};

