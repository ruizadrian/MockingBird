var error = require('../error')


var collection = {}//This is a list of all the types currently defined

function Type(name) {
	
  this.name = name
  collection[name] = this
}

Type.prototype.toString = function () {
  return this.name
}

//MockingBird native types
exports.BOOLIT = Type.BOOLIT = new Type('BOOLIT')
exports.NUMLIT = Type.NUMLIT = new Type('NUMLIT')

exports.forName = function (name) {return collection[name]}

Type.prototype.mustBeNumericLit = function (message, location) {
  if (this !== Type.NUMLIT) {
    error(message, location)
  }
}

Type.prototype.mustBeBooleanLit = function (message, location) {
  if (this !== Type.BOOLIT) {
    error(message, location)
  }
}


Type.prototype.worksWith = function (diffType) {
  return this == diffType;  
}

Type.prototype.mustWorkWith = function (diffType, message, location) {
  if (!this.worksWith(diffType)) {
    error(message, location)
  }
}