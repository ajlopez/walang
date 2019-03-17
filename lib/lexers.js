
const gelex = require('gelex');
const ldef = gelex.definition();

const TokenType = { Name: 'name', Number: 'number', String: 'string', Operator: 'operator', Delimiter: 'delimiter' };

ldef.define(TokenType.Number, '[0-9][0-9]*');
ldef.define(TokenType.Name, '[a-zA-Z_][a-zA-Z0-9_]*');
ldef.defineText(TokenType.String, '"', '"');
ldef.define(TokenType.Delimiter, ';,().{}[]'.split(''));
ldef.define(TokenType.Operator, '=+-*/'.split(''));

function Lexer(text) {
    const lexer = ldef.lexer(text);
    const tokens = [];
    
    this.pushToken = function (token) {
        tokens.push(token);
    }
    
    this.nextToken = function () {
        if (tokens.length)
            return tokens.pop();
        
        return lexer.next();
    };
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}
