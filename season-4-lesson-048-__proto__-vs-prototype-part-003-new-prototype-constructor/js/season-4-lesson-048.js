'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если у функции-конструктора создать свойство "prototype" и указать в нем объект, этот объект будет в свойстве
"__proto__" у всех объектов, созданных на основе этой функции-конструктора.*/
let obj01 = { a: 1 };
function Constructor01(b) { this.b = b };
Constructor01.prototype = obj01;
let obj02 = new Constructor01(2);
console.log(obj02); // { b: 2 }
console.log(obj02.a); // 1
console.log(obj02.__proto__); // obj01

/*Свойство "prototype" используется только при вызове конструктора и присваивается в качестве свойства "[[Prototype]]"
нового объекта. Если после создания свойство "prototype" изменится, то новые объекты, созданные с помощью new F, будут 
иметь в качестве "[[Prototype]]" другой объект, а уже существующие объекты сохранят старый.*/
let obj03 = { a: 3 }
Constructor01.prototype = obj03;
let obj04 = new Constructor01(2);
console.log(obj04.a); // 3
console.log(obj02.a); // 1

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*У каждой функции (за исключением стрелочных) по умолчанию уже есть свойство "prototype". По умолчанию "prototype" – 
объект с единственным свойством "constructor", которое ссылается на саму же функцию-конструктор. Соответственно, если 
мы ничего не меняем, то свойство "constructor" будет доступно всем объектам, созданным на основе этой 
функции-конструктора, через "[[Prototype]]".*/
function func01() { };
console.log(func01.prototype); // Object { … constructor: function func01() }
console.log(func01.prototype.constructor === func01); // true
console.log(func01.prototype === func01); // false
console.log(' ');

let obj05 = new func01();
console.log(obj05.constructor); // function func01()
console.log(obj05.constructor === func01); // true
console.log(obj05.__proto__ === func01.prototype); // true  
console.log(' ');

/*Мы можем использовать свойство "constructor" существующего объекта для создания нового. Это удобно, когда у нас есть 
объект, но мы не знаем, какой конструктор использовался для его создания (например, он мог быть взят из сторонней 
библиотеки), а нам необходимо создать еще один такой объект.*/
let obj06 = new obj05.constructor();
console.log(obj06.constructor); // function func01()
console.log(obj06.constructor === func01); // true
console.log(' ');

/*JavaScript сам по себе не гарантирует правильное значение свойства "constructor". Да, оно является свойством по 
умолчанию в "prototype" у функций, но что случится с ним позже – зависит только от нас. В частности, если мы заменим 
объект-прототип по умолчанию на другой объект, то свойства "constructor" в нем не будет.*/
let obj07 = { a: 1 };
func01.prototype = obj07;
let obj08 = new func01();
console.log(obj08); // Object {  }
console.log(obj08.constructor); // function Object(), взят у объекта "obj07"
console.log(obj08.constructor === func01); // false
console.log(obj08.a); // 1
console.log(' ');

/*Таким образом, чтобы сохранить верное свойство "constructor", мы должны добавлять/удалять/изменять свойства у 
объекта-прототипа по умолчанию вместо того, чтобы перезаписывать его целиком.*/
function func02() { };
let obj09 = { a: 1 };
func02.prototype.a = obj09.a;
let obj10 = new func02();
console.log(obj10); // Object {  }
console.log(obj10.constructor); // function func02()
console.log(obj10.constructor === func02); // true
console.log(obj10.a); // 1
console.log(' ');

/*Или мы можем заново создать свойство "constructor".*/
function func03() { };
let obj11 = { a: 1 };

func03.prototype = { 
    a: obj11.a, 
    constructor: func03 
};

let obj12 = new func03();
console.log(obj12); // Object {  }
console.log(obj12.constructor); // function func03()
console.log(obj12.constructor === func03); // true
console.log(obj12.a); // 1
console.log(' ');

console.log(obj12.__proto__ === func03.prototype); // true