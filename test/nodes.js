
var n = require('../lib/nodes');
var t = require('../lib/types');

exports['integer constant node'] = function (test) {
    var expr = n.constant(t.int, 10);
    
    test.ok(expr);
    test.equal(typeof expr, 'object');
    test.equal(expr.value(), 10);
    test.equal(expr.type(), t.int);
};

exports['name node'] = function (test) {
    var expr = n.name('v');
    
    test.ok(expr);
    test.equal(typeof expr, 'object');
    test.equal(expr.name(), 'v');
};

exports['variable node'] = function (test) {
    var expr = n.variable(t.int, 'v');
    
    test.ok(expr);
    test.equal(typeof expr, 'object');
    test.equal(expr.name(), 'v');
    test.equal(expr.type(), t.int);
};
