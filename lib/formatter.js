
function formatValue(values, indent) {
    if (!Array.isArray(values))
        return values.toString();
    
    let result = indent + '(' + values[0];
    const l = values.length;
    
    for (let k = 1; k < l; k++) {
        const value = values[k];
        
        if (!Array.isArray(value))
            result += ' ' + value.toString();
        else {
            if (k == 1)
                result += '\r\n';
            
            result += formatValue(value, indent + '  ');
        }
    }
    
    return result + ')\r\n';
}

function format(values) {
    let result = '';
    const l = values.length;
    
    for (let k = 0; k < l; k++)
        result += formatValue(values[k], '');
    
    return result;
}

module.exports = format

