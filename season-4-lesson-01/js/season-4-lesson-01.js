'use strict';

/*В режиме "use strict" нельзя объявлять или инициализировать переменные без let, const или var.*/

// f; // Uncaught ReferenceError: f is not defined
f = 1; // Uncaught ReferenceError: assignment to undeclared variable f

/*-------------------------------------------------------------------------------------------------------------------*/

/*Через запятую можно объявлять или инициализировать несколько переменных за раз.*/

let a = { b: 1 },
    b = {},
    c = 0;

console.log(a);
console.log(b);
console.log(c);