# MockingBird
Welcome to the official repository of the MockingBird Programming Language.
![MockingBird](http://github.com/J-Play/MockingBird/blob/master/Logo.png)

## 1. Introduction
Mockingbird is a Java/JavaScript based programming language. The name MockingBird was inspired by the official state bird of Texas. MockingBird aims to combine the loose and relaxed grammar of JavaScript with the strict and precise syntax and structure of Java with a few unique features derivative of other languages.

## 2. Features
#### Variable Declaration
Like JavaScript, MockingBird doesn't require you to have data types when declaring your variables. Matter of fact, it is illegal to do so. However, the language does require you to use the keyword <code>fig</code> when declaring a variable, and you must assign a value at declaration. Values are assigned using the semicolon.

Also important to note is that variables are camel-cased by convention, but the first letter of your identifier is to be capitilized as well.

The following example is a piece of legal MockingBird code:
<pre><code>fig Jordan: "The Grand Prince";</code></pre>

Now, an illegal piece of code:
<pre><code>fig malcolm;</code></pre>

Yes, semicolons are required.

#### Constants
Constants are allowed in MockingBird, although not essential in any aspect. For a constant, the identifier must be in all caps.
<pre><code>fig DEUCEDEUCE: 22;</code></pre>

#### Mathematics
Math works the same way like JavaScript. You can refer to a JavaScript manual for that information.

#### Booleans
Booleans are <code>TRUE</code> and <code>FALSE</code>. Simply assign one of the two as a value to your variable.
<pre><code>fig Cierto: TRUE;</code></pre>

#### Functions
Functions are called <code>nests</code> in MockingBird, and you must be called as such. Parameter protocol are the same as they are in JavaScript, and like Java, curly braces are required. Semicolons, however, are not required at the end of the curly braces.
<pre><code>nest Add(X, Y){
fig Z: X+Y;
  fetch Z;
};</code></pre>

#### Conditional Statements
In MockingBird, the conditional statements work the same way that Java and JavaScript does. Start a conditional statement with <code>if</code>, followed by parentheses and the statement to be tested, and then the curly braces (which are still required). The end of a conditional statement is a curly brace. Again, semicolons are not required at the end of a curly brace.
<pre><code>if(Gersten == "Hank's House"){
fetch Gersten;
}</code></pre>

#### For and While Loops
For and While Loops follow normal convention of Java and JavaScript as well, and MockingBird replaces the semicolon with a comma, because sometimes semicolons are annoying. Mockingbird isn't *that* sadistic.
<pre><code>
fig b: 1;
for(fig j: 0; j < 10; j++){
b ++;
}
</code></pre>

#### Arrays
In MockingBird, you must declare an array as a <code>fig BUNDLE</code>. Square brackets are used as well. But, here, instead of the commas, they are replaced with semicolons. And remember the semicolon at the end of the declaration/assignment.
<pre><code> fig BUNDLE Mavericks: [Rondo; Ellis; Parsons; Nowitzki; Chandler]; </code></pre>

#### Keywords
MockingBird's keywords are meant to be reflective of a Bird's life:
<pre><code>fig is equivalent to var.
fetch is return.
nest is function.
mock is print.</code></pre>

#### Comments
MockingBird accomodates single line comments. Multiple line comments mean you are doing too much talking, so MockingBird makes sure you can't do that. Be quiet.
<pre><code>//Comments are done the same way in Java and JavaScript.</code></pre>
