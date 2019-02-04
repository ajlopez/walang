
var n = require('../lib/nodes');
var t = require('../lib/types');

exports['integer constant node'] = function (test) {
    var node = n.constant(t.int, 10);
    
    test.ok(node);
    test.equal(typeof node, 'object');
    test.equal(node.value(), 10);
    test.equal(node.type(), t.int);
};

exports['name node'] = function (test) {
    var node = n.name('v');
    
    test.ok(node);
    test.equal(typeof node, 'object');
    test.equal(node.name(), 'v');
};

exports['variable node'] = function (test) {
    var node = n.variable(t.int, 'v');
    
    test.ok(node);
    test.equal(typeof node, 'object');
    test.equal(node.name(), 'v');
    test.equal(node.type(), t.int);
};

exports['binary operator node'] = function (test) {
    var node = n.binary('+', n.constant(t.int, 40), n.constant(t.int, 2));
    
    test.ok(node);

    test.equal(typeof node, 'object');
    
    test.equal(node.operator(), '+');
    test.equal(node.left().type(), t.int);
    test.equal(node.left().value(), 40);
    test.equal(node.right().type(), t.int);
    test.equal(node.right().value(), 2);
};

exports['unary operator node'] = function (test) {
    var node = n.unary('-', n.constant(t.int, 42));
    
    test.ok(node);

    test.equal(typeof node, 'object');
    
    test.equal(node.operator(), '-');
    test.equal(node.node().type(), t.int);
    test.equal(node.node().value(), 42);
};

exports['if node'] = function (test) {
    var node = n.if(n.constant(t.int, 1), n.constant(t.int, 42), n.constant(t.int, 0));
    
    test.ok(node);

    test.equal(typeof node, 'object');
    
    test.equal(node.expression().type(), t.int);
    test.equal(node.expression().value(), 1);
    
    test.equal(node.thenNode().type(), t.int);
    test.equal(node.thenNode().value(), 42);
    
    test.equal(node.elseNode().type(), t.int);
    test.equal(node.elseNode().value(), 0);
};

exports['while'] = function (test) {
    var node = n.while(n.constant(t.int, 1), n.constant(t.int, 42));
    
    test.ok(node);

    test.equal(typeof node, 'object');
    
    test.equal(node.expression().type(), t.int);
    test.equal(node.expression().value(), 1);
    
    test.equal(node.bodyNode().type(), t.int);
    test.equal(node.bodyNode().value(), 42);
};