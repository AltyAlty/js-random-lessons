'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

console.log((!+[] + [] + ![]).length === 9); // true
console.log((!+[] + [] + ![]).length); // 9

console.log((+[])); // Пустой массив конвертируется в число: 0
console.log((!+[])); // 0 конвертируется в boolean: !0 = !false = true
console.log((![])); // Пустой массив конвертируется в boolean: !true = false
console.log(([])); // []

console.log((!+[] + [])); // true и пустой массив конвертируются в строки: true + [] = "true" + "" = "true"
console.log((!+[] + [] + ![])); // false конвертируется в строку: "true" + false = "true" + "false" = "truefalse"

console.log('--------------------------------------');

/*--------------------------------------------------------------------------------------------------------------------*/

console.log(('b' + 'a' + + 'a' + 'a').toLowerCase() === 'banana'); // true

console.log('b' + 'a'); // "b" + "a" = "ba"
console.log(+ 'a'); // "a" конвертируется в число: NaN
console.log('b' + 'a' + + 'a'); // NaN конвертируется в строку: "ba" + NaN = "ba" + "NaN" = "baNaN"
console.log(('b' + 'a' + + 'a' + 'a')); // "baNaN" + "a" = "baNaNa"
console.log(('b' + 'a' + + 'a' + 'a').toLowerCase()); // "baNaNa".toLowerCase() = "banana"