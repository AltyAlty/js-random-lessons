'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Краткая нотация "obj1 = {}"" – это то же самое, что и "obj1 = new Object()", где "Object" – встроенная 
функция-конструктор для объектов с собственным свойством "prototype", которое ссылается на огромный объект с методом 
"toString()" и другими.*/
// let obj1 = {};
let obj1 = new Object();
// alert(obj1) // "[object Object]"
console.log(obj1.__proto__); // { ... constructor: function Object(), toString: function toString() }

/*Когда вызывается "new Object()" или создается объект с помощью литерала {...}, то свойство "[[Prototype]]" этого 
объекта устанавливается на "Object.prototype".*/
console.log(obj1.__proto__ === Object.prototype); // true

/*По цепочке прототипов выше свойства "Object.prototype" больше нет свойства "[[Prototype]]".*/
console.log(Object.prototype.__proto__); // null

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Другие встроенные объекты, такие как "Array", "Date", "Function" и другие, также хранят свои методы в прототипах. 
Например, при создании массива "[1, 2, 3]" внутренне используется конструктор массива "Array()". Поэтому прототипом 
массива становится объект "Array.prototype", предоставляя ему свои методы. Согласно спецификации, наверху иерархии 
встроенных прототипов находится объект "Object.prototype".*/
let array01 = new Array();
console.log(array01.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
console.log(' ');

/*Некоторые методы в прототипах могут пересекаться, например, у объекта "Array.prototype" есть свой метод "toString()", 
который выводит элементы массива через запятую.*/
console.log(Array.prototype.toString);
console.log(Object.prototype.toString);
console.log(Array.prototype.toString === Object.prototype.toString); // false
console.log(' ');

/*Другие встроенные объекты устроены аналогично. Даже функции – они объекты встроенного конструктора "Function()", и 
все их методы ("call()"/"apply()" и другие) берутся из объекта "Function.prototype". Также у функций есть свой метод 
"toString()".*/
let func01 = new Function('return 1');
console.log(func01.__proto__ === Function.prototype); // true
console.log(Function.prototype.__proto__ === Object.prototype); // true
console.log(Function.prototype.toString === Array.prototype.toString); // false

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*если мы попытаемся получить доступ к их свойствам примитивов, то тогда будет создан временный объект-обертка с 
использованием встроенных конструкторов "String()", "Number()" и "Boolean()", который предоставит методы и после этого 
исчезнет. Методы этих объектов также находятся в прототипах, доступных через объекты "String.prototype", 
"Number.prototype" и "Boolean.prototype".*/
console.log(3..a === Number.prototype.a); // true
console.log(3..toString === Number.prototype.toString); // true

console.log('abc'.a === String.prototype.a); // true
console.log('abc'.slice === String.prototype.slice); // true

console.log(true.a === Boolean.prototype.a); // true
console.log(true.toString === Boolean.prototype.toString); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Встроенные прототипы можно изменять. Прототипы глобальны, поэтому очень легко могут возникнуть конфликты. Если две 
библиотеки добавляют метод "String.prototype.show()", то одна из них перепишет метод другой. Так что, в общем, 
изменение встроенных прототипов считается плохой идеей. В современном программировании есть только один случай, в 
котором одобряется изменение встроенных прототипов. Это создание полифилов.*/
Number.prototype.showSomethingBoring = function () {
    console.log('it is something boring');
};

19..showSomethingBoring(); // it is something boring

Object.prototype.showSomethingVeryBoring = function () {
    console.log('it is something very boring');
};

'abc'.showSomethingVeryBoring(); // it is something very boring

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*У прототипов можно заимствовать методы.*/
let obj02 = {
    0: 'a',
    1: 'b',
    length: 2,
};

obj02.join = Array.prototype.join;
/*Это работает, потому что для внутреннего алгоритма встроенного метода "join()" важны только корректность индексов и 
свойство "length", он не проверяет, является ли объект на самом деле массивом. И многие встроенные методы работают так
же.*/
console.log(obj02.join(' ')); // 'a b'

let obj03 = {
    0: 'a',
    1: 'b',
    length: 2,
};

/*Также мы можем унаследовать весь объект "Array.prototype", таким образом все методы "Array()" станут автоматически 
доступны в нашем объекте. Но это будет невозможно, если наш объект уже наследует от другого объекта.*/
obj03.__proto__ = Array.prototype;