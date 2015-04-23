var Type = require('./type')

function BoolLit(token) {
  this.token = token
}

BoolLit.prototype.toString = function () {
  return this.token.lexeme
}

BoolLit.prototype.analyze = function (context) {
  this.type = Type.BOOLIT
}

module.exports = BoolLit