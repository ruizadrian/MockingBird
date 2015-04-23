var Type = require('./type')

function ArrayLit(elements) {
  this.elements = elements
}

ArrayLit.prototype.toString = function () {
  return '(Array [' + this.elements.join(', ') + '])'
}

ArrayLit.prototype.analyze = function (context) {
  this.type = Type.ARRAYLIT
  this.elements.forEach(function (element) {
    element.analyze(context)
  })
}

module.exports = ArrayLit