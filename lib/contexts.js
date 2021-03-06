
function isVariable(value) {
    return typeof value === 'object'
        && value.type !== undefined
        && value.name !== undefined;
}

function Context(parent) {
    const values = {};
    
    this.set = function (name, value) { 
        values[name] = value; 
    };
    
    this.get = function (name) {
        if (values[name] != null)
            return values[name];
        
        if (parent != null)
            return parent.get(name);
        
        return null;
    }
}

function createContext(parent) {
    return new Context(parent);
}

module.exports = {
    context: createContext
};

