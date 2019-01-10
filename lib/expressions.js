
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

function createConstant(type, value) {
    return new ConstantExpression(type, value);
}

module.exports = {
    constant: createConstant
};