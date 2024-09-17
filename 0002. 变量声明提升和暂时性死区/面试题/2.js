var a;
var b;
function c() {}

console.log(a, b, c); // 在此时，a 和 b 是 undefined，c 是函数
// undefined undefined [Function: c]

a = 1;
b = function () {};