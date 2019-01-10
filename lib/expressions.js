
function ConstantExpression(type, value) {
    this.type = function () { return type; };
    this.value = function () { return value; };
}

function createConstant(type, value) {
    return new ConstantExpression(type, value);
}

module.exports = {
    constant: createConstant
};