/*
 * Scanner module
 *
 *   var scan = require('./scanner')
 *
 *   scan(filename, function (tokens) {processTheTokens(tokens)})
 *   
 * Official MockingBird Scanner. 
 */

//Standard Copy/Paste.
var fs = require('fs');
var byline = require('byline');
var error = require('./error');

module.exports = function (filename, callback) {
  var baseStream = fs.createReadStream(filename, {encoding: 'utf8'});
  baseStream.on('error', function (err) {error(err);});

  var stream = byline(baseStream, {keepEmptyLines: true});
  var tokens = [];
  var linenumber = 0;
  stream.on('readable', function () {
    scan(stream.read(), ++linenumber, tokens);
  });
  stream.once('end', function () {
    tokens.push({kind: 'EOF', lexeme: 'EOF'});
    callback(tokens);
  });
};

// Actual scanning function.
function scan(line, linenumber, tokens) {
	  if (!line) return

	  var start, position = 0

	  function emit(kind, lexeme) {
	    tokens.push({kind: kind, lexeme: lexeme || kind, line: linenumber, col: start+1});
	  }

	  while (true) {
	    // Skip spaces
	    while (/\s/.test(line[position])) position++;
	    start = position

	    // Nothing on the line
	    if (position >= line.length) break;

	    // Comment
	    if (line[position] == '/' && line[position+1] == '/') break;

	    // Two-character tokens
	    if (/<=|==|>=|!=/.test(line.substring(position, position+2))) {
	      emit(line.substring(position, position+2));
	    // One-character tokens
	    } else if (/[+\-*\/(),:;=<>{}]/.test(line[position])) {
	      emit(line[position++]);
	    }
	    
	    // Boolean Literals
	      else if (/^(?:JA|NEIN)$/.test(line.slice(position, position + 4)) || booleanLit.test(line.slice(position, position + 5))) {
	            if (/^(?:JA|NEIN)$/.test(line.slice(position, position + 4))) {
	                emit('BOOLEAN', line.slice(position, position + 4))
	                position += 4
	            } else {
	                emit('BOOLEAN', line.slice(position, position + 5))
	                position += 5
	            }
	        }

	    // Reserved words or identifiers
	      else if (/[A-Za-z]/.test(line[position])) {
	      while (/\w/.test(line[position]) && position < line.length) position++;
	      var word = line.substring(start, position);
	      if (/^(?:Fig|Nest|Fetch|Mock|JA|NEIN)$/.test(word)) {
	        emit('KEYWORD', word)
	      } else {
	        emit('ID', word)
	      }
	      
	     
	    
	    // Numeric literals
	    } else if (/\d/.test(line[position])) {
	      while (/\d/.test(line[position])) position++;
	      emit('NUMLIT', line.substring(start, position));
	    
	    }
	    
	    // String literals
	  else if (/[A-Za-z]/.test(line[position])) {
		       while (/\w/.test(line[position]) && position < line.length) position++;
		       var word = line.substring(start, position)
		       if (/Fig|Nest|For|Mock|Fetch/.test(word)) {
		         emit(word)
		       } else {
		         emit('STRLIT', word)
		         }
		         }
	    
	    // What doesn't belong in the language.
	    else {
	      error('ILLEGAL CHARACTER: ' + line[position], {line: linenumber, col: position+1})
	      position++
	    }
	  }
	}
