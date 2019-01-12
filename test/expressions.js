
var x = require('../lib/expressions');
var t = require('../lib/types');

exports['integer constant expression'] = function (test) {
    var expr = x.constant(t.int, 10);
    
    test.ok(expr);
    test.equal(typeof expr, 'object');
    test.equal(expr.value(), 10);
    test.equal(expr.type(), t.int);
};

exports['name expression'] = function (test) {
    var expr = x.name('v');
    
    test.ok(expr);
    test.equal(typeof expr, 'object');
    test.equal(expr.name(), 'v');
};

exports['variable expression'] = function (test) {
    var expr = x.variable(t.int, 'v');
    
    test.ok(expr);
    test.equal(typeof expr, 'object');
    test.equal(expr.name(), 'v');
    test.equal(expr.type(), t.int);
};
