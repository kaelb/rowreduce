//
// Rational
//

function Rational (num, den) {
    var self = this;

    this.simplify = function (num, den) {
        function gcd (a, b) {
            if (b === 0) {
                return a;
            } else {
                return gcd(b, a % b);
            }
        }

        var div = gcd(num, den);
        self.num = num / div;
        self.den = den / div;
        if (self.den < 0) {
            // move negative sign to numerator
            self.num *= -1;
            self.den *= -1;
        }
    };

    this.simplify(num, den);
}

Rational.prototype.toString = function () {
    if (this.den === 1) return '' + this.num;
    if (this.num === 0) return '0';
    return this.num + '/' + this.den;
};

Rational.prototype.add = function (b) {
    var a = this;
    var sNum = a.num * b.den + b.num * a.den;
    var sDen = a.den * b.den;
    return new Rational(sNum, sDen);
};

Rational.prototype.multiply = function (b) {
    var a = this;
    return new Rational(a.num * b.num, a.den * b.den);
};

Rational.prototype.scale = function (k) {
    var a = this;
    return new Rational(a.num * k, a.den);
};

Rational.prototype.inverse = function () {
    var a = this;
    return new Rational(a.den, a.num);
};

Rational.prototype.isEqual = function (b) {
    var a = this;
    return (a.num === b.num && a.den === b.den);
};

module.exports = Rational;