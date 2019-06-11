
const lexers = require('./lexers');
const types = require('./types');
const visibilities = require('./visibilities');

const gepars = require('gepars');
const geast = require('geast');

geast.node('function', [ 'name', 'type', 'arguments', 'body', 'visibility' ]);

function createIntegerConstant(text) {
    const value = parseInt(text);

    // TODO detect long/ulong constants
    return geast.constant(value, value >= 0 ? types.uint : types.int);
}

function createRealConstant(text) {
    const value = parseFloat(text);
    
    // TODO detect double constants
    return geast.constant(value, types.float);
}

const pdef = gepars.definition();

// program
pdef.define('program', 'topcommandlist', function (value) { return geast.sequence(value); });
pdef.define('topcommandlist', [ '!', 'null' ], function (values) { return []; });
pdef.define('topcommandlist', 'topcommand', function (value) { return [ value ]; });
pdef.define('topcommandlist', [ 'topcommandlist', 'topcommand' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('topcommand', 'function');
pdef.define('topcommand', 'vardecl');

// functions
pdef.define('function', [ '?visibility', 'xtype', 'name:', 'delimiter:(', 'argumentlist', 'delimiter:)', 'composite' ], function (values) { return geast.function(values[2], values[1], values[4], values[6], values[0] || visibilities.private); });
pdef.define('argumentlist', [ '!', 'delimiter:)' ], function (values) { return []; });
pdef.define('argumentlist', 'argument', function (value) { return [ value ]; });
pdef.define('argumentlist', [ 'argumentlist', 'delimiter:,', 'argument' ], function (values) { values[0].push(values[2]); return values[0]; });
pdef.define('argument', [ 'type', 'name:' ], function (values) { return geast.argument(values[1], values[0]); });

// commands
pdef.define('command', 'vardecl');
pdef.define('command', 'composite');
pdef.define('command', 'assignment');
pdef.define('command', 'if');
pdef.define('command', 'while');
pdef.define('command', 'return');
pdef.define('command', 'composite');
pdef.define('command', 'break');
pdef.define('command', 'continue');

pdef.define('break', [ 'name:break', 'delimiter:;' ], function (values) { return geast.break(); });
pdef.define('continue', [ 'name:continue', 'delimiter:;' ], function (values) { return geast.continue(); });
pdef.define('return', [ 'name:return', 'expression', 'delimiter:;' ], function (values) { return geast.return(values[1]); });
pdef.define('if', [ 'name:if', 'delimiter:(', 'expression', 'delimiter:)', 'command', 'name:else', 'command' ], function (values) { return geast.conditional(values[2], values[4], values[6]); });
pdef.define('if', [ 'name:if', 'delimiter:(', 'expression', 'delimiter:)', 'command' ], function (values) { return geast.conditional(values[2], values[4]); });
pdef.define('while', [ 'name:while', 'delimiter:(', 'expression', 'delimiter:)', 'command' ], function (values) { return geast.loop(values[2], values[4]); });
pdef.define('composite', [ 'delimiter:{', 'commandlist', 'delimiter:}' ], function (values) { return geast.sequence(values[1]); });
pdef.define('commandlist', 'command', function (value) { return [ value ]; });
pdef.define('commandlist', [ '!', 'delimiter:}' ], function (values) { return []; });
pdef.define('commandlist', [ 'commandlist', 'command' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('vardecl', [ 'type', 'name:', 'operator:=', 'expression', 'delimiter:;' ], function (values) { return geast.variable(values[1], values[0], values[3]); });
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

// visibilities
pdef.define('visibility', 'name:public', function (value) { return visibilities.public; });
pdef.define('visibility', 'name:private', function (value) { return visibilities.private; });

// types
pdef.define('xtype', 'type');
pdef.define('type', 'name:int', function (value) { return types.int; });
pdef.define('type', 'name:uint', function (value) { return types.uint; });
pdef.define('type', 'name:long', function (value) { return types.long; });
pdef.define('type', 'name:ulong', function (value) { return types.ulong; });
pdef.define('type', 'name:float', function (value) { return types.float; });
pdef.define('type', 'name:double', function (value) { return types.double; });
pdef.define('type', 'name:bool', function (value) { return types.bool; });
pdef.define('xtype', 'name:void', function (value) { return types.void; });

// terms
pdef.define('term', 'integer');
pdef.define('term', 'real');
pdef.define('term', 'string');
pdef.define('term', 'boolean');
pdef.define('term', 'name');
pdef.define('term', [ 'delimiter:(', 'expression', 'delimiter:)' ], function (values) { return values[1]; });

pdef.define('name', 'name:', function (value) { return geast.name(value); });

// constants
pdef.define('integer', 'integer:', function (value) { return createIntegerConstant(value); });
pdef.define('integer', [ 'operator:-', 'integer:' ], function (values) { return createIntegerConstant('-' + values[1]); });
pdef.define('real', 'real:', function (value) { return createRealConstant(value); });
pdef.define('string', 'string:', function (value) { return geast.constant(value, types.string); });
pdef.define('boolean', 'name:true', function (value) { return geast.constant(true, types.bool); });
pdef.define('boolean', 'name:false', function (value) { return geast.constant(false, types.bool); });

function parseNode(type, text) {
    const lexer = lexers.lexer(text);   
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
}

