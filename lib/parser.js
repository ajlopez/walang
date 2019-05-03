
const lexers = require('./lexers');
const types = require('./types');

const gepars = require('gepars');
const geast = require('geast');

const pdef = gepars.definition();

// commands
pdef.define('command', 'vardecl');
pdef.define('command', 'composite');
pdef.define('command', 'assignment');

pdef.define('composite', [ 'delimiter:{', 'commandlist', 'delimiter:}' ], function (values) { return geast.sequence(values[1]); });
pdef.define('commandlist', 'command', function (value) { return [ value ]; });
pdef.define('commandlist', [ '!', 'delimiter:}' ], function (values) { return []; });
pdef.define('commandlist', [ 'commandlist', 'command' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('vardecl', [ 'type', 'name:', 'delimiter:;' ], function (values) { return geast.variable(values[1], values[0]); });
pdef.define('assignment', [ 'name', 'operator:=', 'expression', 'delimiter:;' ], function (values) { return geast.assign(values[0], values[2]); });

// expressions
pdef.define('expression', 'expression0');
pdef.define('expression0', 'expression1');
pdef.define('expression0', [ 'expression0', 'binop0', 'expression1' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression1', 'expression2');
pdef.define('expression1', [ 'expression1', 'binop1', 'expression2' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression2', 'term');
pdef.define('expression2', [ 'expression2', 'binop2', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });

pdef.define('binop0', 'operator:<');
pdef.define('binop0', 'operator:<=');
pdef.define('binop0', 'operator:>');
pdef.define('binop0', 'operator:>=');
pdef.define('binop0', 'operator:==');
pdef.define('binop0', 'operator:!=');

pdef.define('binop1', 'operator:+');
pdef.define('binop1', 'operator:-');

pdef.define('binop2', 'operator:*');
pdef.define('binop2', 'operator:/');

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
pdef.define('term', [ 'delimiter:(', 'expression', 'delimiter:)' ], function (values) { return values[1]; });

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

