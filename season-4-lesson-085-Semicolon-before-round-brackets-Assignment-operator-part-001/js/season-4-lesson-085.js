'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

let obj01 = {
    a: 1,
    doSomething01: function () { console.log(this.a) }
}
/*Здесь будет ошибка так, как после фигурной скобки будет пропущена точка с запятой. JavaScript не вставляет 
автоматически точку с запятой перед круглой скобкой.*/
// (obj01.doSomething01)(); // Uncaught ReferenceError: can't access lexical declaration 'obj01' before initialization

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

let a, b, c;
a = 2;

/*Присваивание по цепочке работает, так как оператор присваивания, после того как закончит операцию присваивания, 
как-будто возвращает то, что было справа от него.*/
c = b = a;
console.log(a); // 2
console.log(b); // 2
console.log(c); // 2

function func01() { console.log(3) };
let func02;
(func02 = func01)(); // 3 