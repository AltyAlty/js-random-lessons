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
объекта устанавливается на объект-прототип "Object.prototype".*/
console.log(obj1.__proto__ === Object.prototype); // true

/*По цепочке объектов-прототипов выше свойства "Object.prototype" больше нет свойства "[[Prototype]]".*/
console.log(Object.prototype.__proto__); // null

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Другие встроенные функции-конструкторы, такие как "Array()", "Date()", "Function()" и другие, также хранят свои 
методы в своих объектах-прототипах. Например, при создании массива "[1, 2, 3]" внутренне используется конструктор 
массивов "Array()". Поэтому объектом-прототипом массива становится объект-прототип в свойстве "Array.prototype", 
предоставляя ему свои методы. Согласно спецификации, наверху иерархии встроенных объектов-прототипов находится 
объект-прототип в свойстве "Object.prototype".*/
let array01 = new Array();
console.log(array01.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
console.log(' ');

/*Некоторые методы в объектах-прототипах могут пересекаться, например, у объекта "Array.prototype" есть свой метод 
"toString()", который выводит элементы массива через запятую.*/
console.log(Array.prototype.toString);
console.log(Object.prototype.toString);
console.log(Array.prototype.toString === Object.prototype.toString); // false
console.log(' ');

/*Другие встроенные функции-конструкторы устроены аналогично. Даже функции – они объекты встроенной 
функции-конструктора "Function()", и все их методы ("call()", "apply()" и другие) берутся из объекта-прототипа в 
свойстве "Function.prototype". Также у функций есть свой метод "toString()".*/
let func01 = new Function('return 1');
console.log(func01.__proto__ === Function.prototype); // true
console.log(Function.prototype.__proto__ === Object.prototype); // true
console.log(Function.prototype.toString === Array.prototype.toString); // false

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если мы попытаемся получить доступ к свойствам примитивов, то тогда будет создан временный объект-обертка с 
использованием встроенных функций-конструкторов "String()", "Number()" и "Boolean()", который предоставит методы и 
после этого исчезнет. Методы этих объектов также находятся в объектах-прототипах, доступных через объекты в свойствах 
"String.prototype", "Number.prototype" и "Boolean.prototype".*/
console.log(3..a === Number.prototype.a); // true
console.log(3..toString === Number.prototype.toString); // true

console.log('abc'.a === String.prototype.a); // true
console.log('abc'.slice === String.prototype.slice); // true

console.log(true.a === Boolean.prototype.a); // true
console.log(true.toString === Boolean.prototype.toString); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Встроенные объекты-прототипы можно изменять. Объекты-прототипы глобальны, поэтому очень легко могут возникнуть 
конфликты. Если две библиотеки добавляют метод "String.prototype.show()", то одна из них перепишет метод другой. Так 
что, в общем, изменение встроенных объектов-прототипов считается плохой идеей. В современном программировании есть 
только один случай, в котором одобряется изменение встроенных объектов-прототипов - создание полифилов.*/
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

/*У объектов-прототипов можно заимствовать методы.*/
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

/*Также мы можем унаследовать весь объект в свойстве "Array.prototype", таким образом все методы "Array()" станут 
автоматически доступны в нашем объекте. Но это будет невозможно, если наш объект уже наследует от другого объекта.*/
obj03.__proto__ = Array.prototype;