
const t = require('./types');

function ConstantExpression(type, value) {
    this.type = function () { return type; };
    this.value = function () { return value; };
    
    this.compile = function () {
        var tp;
        
        if (type === t.int || type === t.uint)
            tp = "i32.const";
        
        if (type === t.long || type === t.ulong)
            tp = "i64.const";
        
        if (type === t.float)
            tp = "f32.const";

        if (type === t.double)
            tp = "f64.const";
        
        return [ tp, value ];
    };
}

function createConstantExpression(type, value) {
    return new ConstantExpression(type, value);
}

function NameExpression(name) {
    this.name = function () { return name; }
}

function createNameExpression(name) {
    return new NameExpression(name);
}

module.exports = {
    constant: createConstantExpression,
    name: createNameExpression
};