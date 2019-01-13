
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

module.exports = {
    constant: createConstantNode,
    name: createNameNode,
    variable: createVariableNode
};
