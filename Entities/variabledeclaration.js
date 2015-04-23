function varDeclaration(name, init) {
  this.name = name
  this.init = init
}

varDeclaration.prototype.toString = function () {
  return '(Declare ' + this.name + ' ' + this.init + ')'
}

varDeclaration.prototype.analyze = function (context) {
  context.addVariable(this.name, this)
  this.initializer.analyze(context)
}

module.exports = varDeclaration