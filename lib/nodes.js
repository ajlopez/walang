
const t = require('./types');

function ConstantNode(type, value) {
    this.type = function () { return type; };
    this.value = function () { return value; };
}

function createConstantNode(type, value) {
    return new ConstantNode(type, value);
}

function VariableNode(type, name) {
    this.type = function () { return type; };
    this.name = function () { return name; };
}

function createVariableNode(type, name) {
    return new VariableNode(type, name);
}

function NameNode(name) {
    this.name = function () { return name; }
}

function createNameNode(name) {
    return new NameNode(name);
}

function BinaryOperatorNode(operator, left, right) {
    this.operator = function ()  { return operator; };
    this.left = function () { return left; };
    this.right = function () { return right; };
}

function createBinaryOperatorNode(operator, left, right) {
    return new BinaryOperatorNode(operator, left, right);
}

function UnaryOperatorNode(operator, node) {
    this.operator = function ()  { return operator; };
    this.node = function () { return node; };
}

function createUnaryOperatorNode(operator, node) {
    return new UnaryOperatorNode(operator, node);
}

function IfNode(expr, thennode, elsenode) {
    this.expression = function () { return expr; };
    this.thenNode = function () { return thennode; };
    this.elseNode = function () { return elsenode; };
}

function createIfNode(expr, thennode, elsenode) {
    return new IfNode(expr, thennode, elsenode);
}

module.exports = {
    constant: createConstantNode,
    name: createNameNode,
    variable: createVariableNode,
    binary: createBinaryOperatorNode,
    unary: createUnaryOperatorNode,
    if: createIfNode
};
