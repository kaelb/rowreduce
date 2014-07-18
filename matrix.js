//
// Matrix
//

var Rational = require('./rational.js');

function Matrix (rows, cols) {
    var self = this;

    this.rows = rows;
    this.cols = cols;
    this.data = [];
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            row.push(new Rational(0, 1));
        }
        this.data.push(row);
    }
}

Matrix.prototype.toString = function () {
    var s = '';
    for (var i = 0; i < this.data.length; i++) {
        s += '[\t';
        for (var j = 0; j < this.data[i].length; j++) {
            s += this.data[i][j].toString() + '\t';
        }
        s += ']\n';
    }
    return s;
};

Matrix.prototype.set = function (i, j, val) {
    if (i > this.rows || i < 1) return;
    if (j > this.cols || j < 1) return;
    if (typeof val === 'number') val = new Rational(val, 1);
    this.data[i - 1][j - 1] = val;
};


Matrix.prototype.setRow = function (i, vals) {
    if (i > this.rows || i < 1) return;
    if (!Array.isArray(vals)) return;
    if (vals.length !== this.cols) return;
    for (var j = 1; j <= vals.length; j++) {
        this.set(i, j, vals[j - 1]);
    }
};

Matrix.prototype.get = function (i, j) {
    if (i > this.rows || i < 1) return null;
    if (j > this.cols || j < 1) return null;
    return this.data[i - 1][j - 1];
};

// Fundamental row operations

Matrix.prototype.multiplyRow = function (i, k) {
    if (i > this.rows || i < 1) return;
    for (var j = 1; j <= this.cols; j++) {
        var val = this.get(i, j);
        val = val.multiply(k);
        this.set(i, j, val);
    }
};

Matrix.prototype.swapRows = function (i1, i2) {
    if (i1 > this.rows || i1 < 1) return;
    if (i2 > this.rows || i2 < 1) return;
    var tempRow = this.data[i1 - 1];
    this.data[i1 - 1] = this.data[i2 - 1];
    this.data[i2 - 1] = tempRow;
};

Matrix.prototype.addRows = function (i1, i2, k) {
    // i1 = i1 + k * i2
    if (i1 > this.rows || i1 < 1) return;
    if (i2 > this.rows || i2 < 1) return;
    for (var j = 1; j <= this.cols; j++) {
        var val1 = this.get(i1, j);
        var val2 = this.get(i2, j);
        val1 = val1.add(val2.multiply(k));
        this.set(i1, j, val1);
    }
};

Matrix.prototype.reduce = function () {
    console.log(this.toString());

    var i = 1;
    var j = 1;
    // for each column
    while (j <= this.cols) {
        // find first non-zero entry in column
        var e = null;
        var inz = i;
        while (inz <= this.rows) {
            e = this.get(inz, j);
            if (!e.isEqual(new Rational(0, 1))) break;
            e = null;
            inz++;
        }

        // check if non-zero entry was found
        if (e !== null) {
            // swap rows if necessary
            if (inz !== i) {
                this.swapRows(inz, i);
                console.log ('Swap R' + inz + ' and R' + i);
                console.log(this.toString());
            }
            // multiply row by inverse of leading coeffecient to make it 1
            this.multiplyRow(i, e.inverse());
            console.log('R' + i + ' *= ' + e.inverse().toString());
            console.log(this.toString());

            // add this row to all others to make values in this column zero
            for (var ia = 1; ia <= this.rows; ia++) {
                if (ia === i) continue;

                var ea = this.get(ia, j);
                ea = ea.multiply(new Rational(-1, 1));
                this.addRows(ia, i, ea);
                console.log('R' + ia + ' = R' + ia + ' + ' + ea.toString() + '*R' + i);
                console.log(this.toString());
            }

            i++;
        }

        j++;
    }
};

module.exports = Matrix;
