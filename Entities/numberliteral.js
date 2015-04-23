var Type = require('./type')

function NumLit(token) {
  this.token = token
}

NumLit.prototype.toString = function () {
  return this.token.lexeme
}

NumLit.prototype.analyze = function (context) {
  this.type = Type.NUMLIT
}

module.exports = NumLit