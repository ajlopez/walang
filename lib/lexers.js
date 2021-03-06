
const gelex = require('gelex');
const ldef = gelex.definition();

const TokenType = { Name: 'name', Integer: 'integer', Real: 'real', String: 'string', Operator: 'operator', Delimiter: 'delimiter' };

ldef.define(TokenType.Real, '[0-9][0-9]*.[0-9][0-9]*');
ldef.define(TokenType.Integer, '[0-9][0-9]*');
ldef.define(TokenType.Name, '[a-zA-Z_][a-zA-Z0-9_]*');
ldef.defineText(TokenType.String, '"', '"');
ldef.define(TokenType.Delimiter, ';,().{}[]'.split(''));
ldef.define(TokenType.Operator, '<= >= == !='.split(' '));
ldef.define(TokenType.Operator, '=+-*/<>'.split(''));
ldef.defineComment('/*', '*/');
ldef.defineComment('//');

function createLexer(text) {
    return ldef.lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}
