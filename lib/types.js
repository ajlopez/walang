
function Type() {
};

module.exports = {
    int: new Type(),
    uint: new Type(),
    long: new Type(),
    ulong: new Type(),
    float: new Type(),
    double: new Type(),
    
    isType: function (type) { return type instanceof Type; }
};

