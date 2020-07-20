
const n = require('../lib/nodes');
const t = require('../lib/types');

exports['integer constant node'] = function (test) {
    const node = n.constant(10, t.int);
    
    test.ok(node);
    test.equal(typeof node, 'object');
    test.equal(node.value(), 10);
    test.equal(node.type(), t.int);
};

exports['name node'] = function (test) {
    const node = n.name('v');
    
    test.ok(node);
    test.equal(typeof node, 'object');
    test.equal(node.name(), 'v');
};

exports['variable node'] = function (test) {
    const node = n.variable('v', t.int);
    
    test.ok(node);
    test.equal(typeof node, 'object');
    test.equal(node.name(), 'v');
    test.equal(node.type(), t.int);
};

exports['binary operator node'] = function (test) {
    const node = n.binary('+', n.constant(40, t.int), n.constant(2, t.int));
    
    test.ok(node);

    test.equal(typeof node, 'object');
    
    test.equal(node.operator(), '+');
    test.equal(node.left().type(), t.int);
    test.equal(node.left().value(), 40);
    test.equal(node.right().type(), t.int);
    test.equal(node.right().value(), 2);
};

exports['unary operator node'] = function (test) {
    const node = n.unary('-', n.constant(42, t.int));
    
    test.ok(node);

    test.equal(typeof node, 'object');
    
    test.equal(node.operator(), '-');
    test.equal(node.expression().type(), t.int);
    test.equal(node.expression().value(), 42);
};

exports['conditional'] = function (test) {
    const node = n.conditional(n.constant(1, t.int), n.constant(42, t.int), n.constant(0, t.int));
    
    test.ok(node);

    test.equal(typeof node, 'object');
    
    test.equal(node.condition().type(), t.int);
    test.equal(node.condition().value(), 1);
    
    test.equal(node.then().type(), t.int);
    test.equal(node.then().value(), 42);
    
    test.equal(node.else().type(), t.int);
    test.equal(node.else().value(), 0);
};

exports['loop'] = function (test) {
    const node = n.loop(n.constant(1, t.int), n.constant(42, t.int));
    
    test.ok(node);

    test.equal(typeof node, 'object');
    
    test.equal(node.condition().type(), t.int);
    test.equal(node.condition().value(), 1);
    
    test.equal(node.body().type(), t.int);
    test.equal(node.body().value(), 42);
};

