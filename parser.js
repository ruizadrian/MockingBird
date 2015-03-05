/*
 * Parser module
 *
 *   var parse = require('./parser')
 *
 *   var script = parse(tokens)
 *
 *   Official MockingBird Parser
 */

var scanner = require('./scanner'),
    error = require('./error'),
    Program = require('./entities/program'),
    Block = require('./entities/block'),
    Type = require('./entities/type'),
    VariableDeclaration = require('./entities/variabledeclaration'),
    AssignmentStatement = require('./entities/assignmentstatement'),
    MockStatement = require('./entities/mockstatement'),
    WhileStatement = require('./entities/whilestatement'),
    ConditionalStatement = require('.entities/conditionalstatement'),
    ForStatement = require('.entities/forstatement'),
    ArrayEntity = require('./entities/arrayentity'),
    IntegerLiteral = require('./entities/integerliteral'),
    BooleanLiteral = require('./entities/booleanliteral'),
    VariableReference = require('./entities/variablereference'),
    BinaryExpression = require('./entities/binaryexpression'),
    UnaryExpression = require('./entities/unaryexpression');

var tokens = [];

module.exports = function(scannerOutput) {
    var program;
    tokens = scannerOutput;
    program = parseProgram();
    match('EOF');
    return program;
};

function parseProgram() {
    return new Program(parseBlock());
};

function parseBlock() {
    var statements = [];
    while (true) {
        statements.push(parseStatement());
        match(';');
        if (!at(['var', 'ID', 'mock', 'while', 'if', 'for'])) {
            break;
        }
    }
    return new Block(statements);
};

function parseStatement() {
    if (at('var')) {
        return parseVariableDeclaration();
    } else if (at('ID')) {
        return parseAssignmentStatement();
    } else if (at('mock')) {
        return parseMockStatement();
    } else if (at('while')) {
        return parseWhileStatement()
    } else if (at('if')) {
        return parseConditionalStatement()
    } else if (at('for')) {
        return parseForStatement()
    } else {
        return error('Statement expected', tokens[0]);
    }
};

function parseVariableDeclaration() {
    var id, type;
    match('var');
    id = match('ID');
    match(':');
    type = parseType();
    return new VariableDeclaration(id, type);
};

function parseType() {
    if (at(['int', 'bool'])) {
        return Type.forName(match().lexeme);
    } else {
        return error('Type expected', tokens[0]);
    }
};

function parseAssignmentStatement() {
    var source, target;
    target = new VariableReference(match('ID'));
    match('=');
    source = parseExpression();
    return new AssignmentStatement(target, source);
};

function parseArray(type){
    match('[')
    var elements = []
    if(!at(']')){
        elements.push(parseExpression())
    }
    while(at(',')){
        match()
        elements.push(parseExpression())
    }
    match(']')
    return new ArrayEntity(type, elements)
}

function parseMockStatement() {
    var expressions;
    match('mock');
    expressions = [];
    expressions.push(parseExpression());
    while (at(',')) {
        match();
        expressions.push(parseExpression());
    }
    return new MockStatement(expressions);
};

function parseWhileStatement() {
    var body, condition;
    match('while');
    condition = parseExpression();
    match('loop');
    body = parseBlock();
    match('end');
    return new WhileStatement(condition, body);
};

function parseConditionalStatement() {
    var conditionals = [],
        defaultAct
    match('if')
    conditionals.push(parseConditional())
    while (at('else') && next('if')) {
        match(['else','if'])
        conditionals.push(parseConditional())
    }
    if (at('else')) {
        match()
        defaultAct = parseBlock()
    }
    return new ConditionalStatement(conditionals, defaultAct)
}

function parseExpression() {
    var left, op, right;
    left = parseExp1();
    while (at('or')) {
        op = match();
        right = parseExp1();
        left = new BinaryExpression(op, left, right);
    }
    return left;
};

function parseExp1() {
    var left, op, right;
    left = parseExp2();
    while (at('and')) {
        op = match();
        right = parseExp2();
        left = new BinaryExpression(op, left, right);
    }
    return left;
};

 function parseExp2() {
    var left, op, right;
    left = parseExp3();
    if (at(['<', '<=', '==', '!=', '>=', '>'])) {
        op = match();
        right = parseExp3();
        left = new BinaryExpression(op, left, right);
    }
    return left;
};

function arseExp3() {
    var left, op, right;
    left = parseExp4();
    while (at(['+', '-'])) {
        op = match();
        right = parseExp4();
        left = new BinaryExpression(op, left, right);
    }
    return left;
};

function parseExp4() {
    var left, op, right;
    left = parseExp5();
    while (at(['*', '/'])) {
        op = match();
        right = parseExp5();
        left = new BinaryExpression(op, left, right);
    }
    return left;
};

function parseExp5() {
    var op, operand;
    if (at(['-', 'not'])) {
        op = match();
        operand = parseExp6();
        return new UnaryExpression(op, operand);
    } else {
        return parseExp6();
    }
};

function parseExp6() {
    var expression;
    if (at(['true', 'false'])) {
        return new BooleanLiteral(match().lexeme);
    } else if (at('INTLIT')) {
        return new IntegerLiteral(match().lexeme);
    } else if (at('ID')) {
        return new VariableReference(match());
    } else if (at('(')) {
        match();
        expression = parseExpression();
        match(')');
        return expression;
    } else {
        return error('Illegal start of expression', tokens[0]);
    }
};

function at(type) {
    if (tokens.length === 0) {
        return false;
    } else if (Array.isArray(type)) {
        return type.some(at);
    } else {
        return type === tokens[0].type;
    }
};

function match(type) {
    if (tokens.length === 0) {
        return error('Unexpected end of source program');
    } else if (type === void 0 || type === tokens[0].type) {
        return tokens.shift();
    } else {
        return error("Expected " + type + " but found " + tokens[0].type, tokens[0]);
    }
};