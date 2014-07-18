//
// main.js
//

// dependencies
var Matrix = require('./matrix.js');
var Q = require('./rational.js');


// store fractions with the Rational class! woah!
var frac1 = new Q(1, 3);
var frac2 = new Q(1, 4);
// add them together?? yes
var sum = frac1.add(frac2);
// multiply them by scalar values too, cool!
sum = sum.scale(3);
console.log(sum.toString());

// matrices!! start with number of rows and columns
var m = new Matrix(3, 4);

// all values are stored with the Rational class but the Matrix
// class 'set' methods are pretty chill and will take regular
// numbers too.
m.setRow(1, [1, 2, 3, 4]);
m.setRow(2, [5, 6, 7, 8]);
m.setRow(3, [9, 10, 11, 12]);
m.set(2, 2, new Q(3, 4));

// supports all 3 elementary row operations! how about that?
m.swapRows(2, 3);
m.addRows(2, 1, new Q(-1, 1));
m.multiplyRow(3, new Q(-2, 1));

// convert to reduced row echelon form in just 1 easy step!!
m.reduce();
