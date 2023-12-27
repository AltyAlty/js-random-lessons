'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

console.log('a' / '2'); // NaN
console.log(NaN === 'a' / '2'); // false
console.log(NaN === NaN); // false
console.log(Number('2')); // 2
console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(false)); // 0
console.log(Number(null) === Number(false)); // true
console.log(Boolean('Hello')); // true
console.log(Boolean('')); // false
console.log(Boolean(' ')); // true
console.log('0' / '2'); // 0
console.log(Boolean(0)); // false
console.log(Boolean('0')); // true