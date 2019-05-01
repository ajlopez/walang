
const lexers = require('./lexers');
const types = require('./types');

const gepars = require('gepars');
const geast = require('geast');

const pdef = gepars.definition();

// expressions
pdef.define('expression', 'term');
pdef.define('expression', [ 'expression', 'binop', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });

pdef.define('binop', 'operator:+');
pdef.define('binop', 'operator:-');
pdef.define('binop', 'operator:*');
pdef.define('binop', 'operator:/');

// types
pdef.define('type', 'name:int', function (value) { return types.int; });
pdef.define('type', 'name:uint', function (value) { return types.uint; });
pdef.define('type', 'name:long', function (value) { return types.long; });
pdef.define('type', 'name:ulong', function (value) { return types.ulong; });
pdef.define('type', 'name:float', function (value) { return types.float; });
pdef.define('type', 'name:double', function (value) { return types.double; });
pdef.define('type', 'name:bool', function (value) { return types.bool; });

// terms
pdef.define('term', 'integer');
pdef.define('term', 'real');
pdef.define('term', 'string');
pdef.define('term', 'boolean');
pdef.define('term', 'name');
pdef.define('name', 'name:', function (value) { return geast.name(value); });

// constants
pdef.define('integer', 'integer:', function (value) { return geast.constant(parseInt(value)); });
pdef.define('real', 'real:', function (value) { return geast.constant(parseFloat(value)); });
pdef.define('string', 'string:', function (value) { return geast.constant(value); });
pdef.define('boolean', 'name:true', function (value) { return geast.constant(true); });
pdef.define('boolean', 'name:false', function (value) { return geast.constant(false); });

function parseNode(type, text) {
    const lexer = lexers.lexer(text);
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
}