'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

let obj01 = {};

console.log(obj01.a); // undefined
console.log(obj01); // Object {  }, поскольку undefined был создан "динамически", то свойство не было сохранено.
console.log(' ');

obj01.a = 1;
console.log(obj01.a); // 1
console.log(obj01); // Object { a: 1 }
console.log(' ');

// console.log(obj01.b.c); // Uncaught TypeError: obj01.b is undefined

obj01.__proto__.d = undefined; // создаем свойство с undefined не "динамически".
console.log(obj01.__proto__); // Object { d: undefined, … }, поскольку undefined был создан "вручную", то свойство было сохранено.
console.log(' ');

obj01.__proto__.d = {};
console.log(obj01.d); // Object {  }
console.log(obj01.d === obj01.__proto__.d); // true
console.log(obj01.d.e); // undefined, создаем "динамически"
console.log(obj01.__proto__.d); // Object {  }, поскольку undefined был создан "динамически", то свойство не было сохранено.
console.log(' ');

obj01.d.e = 2;
console.log(obj01.d.e); // 2, создаем не "динамически".