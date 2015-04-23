var error = require('../error')

function FetchStatement(expression) {
  this.expression = expression
  this.isReturn = true
}

FetchStatement.prototype.toString = function () {
  return '(Return ' + this.expression.toString() + ')'
}

FetchStatement.prototype.analyze = function (context) {
  this.expression.analyze(context)
  if (!context.subroutine && !context.parent.subroutine) {
    error('ILLEGAL RETURN')
  }
}

module.exports = FetchStatement
