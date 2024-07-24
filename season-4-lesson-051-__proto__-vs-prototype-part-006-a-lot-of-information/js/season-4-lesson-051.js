'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*У стрелочных функций нет свойства "prototype", но есть свойство "__proto__", которое показывает, что стрелочные
функции наследуют от объекта-прототипа фугкции-конструктора function () ("Function.prototype").*/
let arrowFunc01 = () => { };
console.log(arrowFunc01);
console.log(arrowFunc01.prototype); // undefined
console.log(arrowFunc01.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype")
console.log(' ');

console.log('00----------------------------------------------------------------------------');
console.log('00----------------------------------------------------------------------------');
console.log('00----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*1) По умолчанию свойство "__proto__" какого-либо экземпляра данных ссылается на свойство "prototype" 
функции-конструктора, на основе которой был этот экземпляр данных создан. Само свойство "prototype" 
функции-конструктора ссылается на объект, в котором как минимум есть свойство "constructor", содержащее ссылку на саму
функцию-конструктор. То есть свойство "prototype" это объект, описывающий какую-то функцию-конструктор.

2) Объекты-прототипы функций-конструкторов предоставляет методы доступные через прототипное наследование, то есть к 
ним можно обращаться через точку у экземпляра данных, например как "array01.push()").

3) Функции-конструкторы предоставляет методы доступные через объекты самих функций-конструкторов, то есть к ним можно 
обращаться через саму функцию-конструктор, например как "Object.getOwnPropertyDescriptor(obj01, 'a')".

4) Прототипное наследование всегда идет по цепочке объектов-прототипов функций-конструкторов (например, свойство 
"Function.prototype"), а не по самим функция-конструкторам (например, функция-конструктор "Function()").

5) У всех функций (кроме стрелочных) и классов есть и свойство "prototype", и свойство "__proto__". Остальные типы 
данных имеют только свойство "__proto__".

6) У функции-конструктора function Function() ("new Function") свойства "__proto__" и "prototype" оба ссылаются на одно и 
тоже: на объект-прототипа функция-конструктора function () ("Function.prototype").

7) Любая встроенная функция-конструктор или любая функция всегда наследует от объекта-прототипа функции-конструктора 
function () ("Function.prototype"), который в свою очередь наследует от объекта-прототипа функции-конструктора 
Object { … } ("Object.prototype"), а последний в свойстве "__proto__" содержит null.*/
console.log('- = = F U N C T I O N S = = -');
function func01() { console.log(this.a) };
// let func01 = function () { console.log(this.a) };
// let func01 = () => { console.log(this.a) };
console.log(func01);
console.log(func01.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype"), предоставляет методы доступные через прототипное наследование как "func01.method()"
console.log(func01.__proto__.constructor); // функция-конструктор function Function() ("new Function"), предоставляет методы доступные как "Function.method(func01)"
console.log(func01.__proto__ === func01.__proto__.constructor); // false, объект-прототип функции-конструктора function ("Function.prototype") () !== функция-конструктор function Function() ("new Function")
console.log(func01.__proto__ === func01.__proto__.constructor.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(func01.__proto__ === Function); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== функция-конструктор function Function() ("new Function")
console.log(func01.__proto__ === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(func01.__proto__.constructor === Function); // true, функция-конструктор function Function() ("new Function") === функция-конструктор function Function() ("new Function")
console.log(func01.__proto__.constructor.prototype === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log('------');

console.log(Function.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Function.__proto__.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Function.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Function.__proto__ === func01.__proto__); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Function.__proto__ === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Function.prototype.__proto__ === Object.prototype); // true, объект-прототип функции-конструктора Object { … } ("Object.prototype") === объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log('------');

Function.call({}); // ошибки не будет
func01.call({ a: 1 }); // 1
let customCall01 = Function.call; // получаем метод через функцию-конструктор function Function() ("new Function"), но неизвестно как его теперь использовать
console.log(customCall01); // function call()
console.log(func01.customCall01); // undefined
// func01.customCall01({ a: 1 });
console.log(' ');

/*--------------------------------*/

console.log('- = = O B J E C T S = = -');
let obj01 = {};
console.log(obj01);
console.log(obj01.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype"), предоставляет методы доступные через прототипное наследование как "obj01.method()"
console.log(obj01.__proto__.constructor); // функция-конструктор function Object() ("new Object"), предоставляет методы доступные как "Object.method(obj01)"
console.log(obj01.__proto__ === obj01.__proto__.constructor); // false, объект-прототип функции-конструктора Object { … } ("Object.prototype") !== функция-конструктор function Object() ("new Object")
console.log(obj01.__proto__ === obj01.__proto__.constructor.prototype); // true, объект-прототип функции-конструктора Object { … } ("Object.prototype") === объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(obj01.__proto__ === Object); // false, объект-прототип функции-конструктора Object { … } ("Object.prototype") !== функция-конструктор function Object() ("new Object")
console.log(obj01.__proto__ === Object.prototype); // true, объект-прототип функции-конструктора Object { … } ("Object.prototype") === объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(obj01.__proto__.constructor === Object); // true, функция-конструктор function Object() ("new Object") === функция-конструктор function Object() ("new Object")
console.log(obj01.__proto__.constructor.prototype === Object.prototype); // true, объект-прототип функции-конструктора Object { … } ("Object.prototype") === объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log('------');

console.log(Object.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Object.__proto__.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Object.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Object.__proto__ === obj01.__proto__); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Object.__proto__ === Object.prototype); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Object.prototype.__proto__ === Object.prototype); // false, null !== объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Object.__proto__ === Function.__proto__); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Object.__proto__ === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(' ');

/*--------------------------------*/

console.log('- = = A R R A Y S = = -');
let array01 = ['q', 'w', 'e'];
console.log(array01);
console.log(array01.__proto__); // объект-прототип функции-конструктора Array [] ("Array.prototype"), предоставляет методы доступные через прототипное наследование как "array01.method()"
console.log(array01.__proto__.constructor); // функция-конструктор function Array() ("new Array"), предоставляет методы доступные как "Array.method(array01)"
console.log(array01.__proto__ === array01.__proto__.constructor); // false, объект-прототип функции-конструктора Array [] ("Array.prototype") !== функция-конструктор function Array() ("new Array")
console.log(array01.__proto__ === array01.__proto__.constructor.prototype); // true, объект-прототип функции-конструктора Array [] ("Array.prototype") === объект-прототип функции-конструктора Array [] ("Array.prototype")
console.log(array01.__proto__ === Array); // false, объект-прототип функции-конструктора Array [] ("Array.prototype") !== функция-конструктор function Array() ("new Array")
console.log(array01.__proto__ === Array.prototype); // true, объект-прототип функции-конструктора Array [] ("Array.prototype") === объект-прототип функции-конструктора Array [] ("Array.prototype")
console.log(array01.__proto__.constructor === Array); // true, функция-конструктор function Array() ("new Array") === функция-конструктор function Array() ("new Array")
console.log(array01.__proto__.constructor.prototype === Array.prototype); // true, объект-прототип функции-конструктора Array [] ("Array.prototype") === объект-прототип функции-конструктора Array [] ("Array.prototype")
console.log('------');

console.log(Array.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Array.__proto__.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Array.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Array.__proto__ === array01.__proto__); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора Array [] ("Array.prototype")
console.log(Array.__proto__ === Array.prototype); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора Array [] ("Array.prototype")
console.log(Array.prototype.__proto__ === Object.prototype); // true, объект-прототип функции-конструктора Object { … } ("Object.prototype") === объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Array.__proto__ === Function.__proto__); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Array.__proto__ === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(' ');

/*--------------------------------*/

console.log('- = = N U M B E R S = = -');
let number01 = 123;
console.log(number01.__proto__); // объект-прототип функции-конструктора Number { 0 } ("Number.prototype"), предоставляет методы доступные через прототипное наследование как "number01.method()"
console.log(number01.__proto__.constructor); // функция-конструктор function Number() ("new Number"), предоставляет методы доступные как "Number.method(number01)"
console.log(number01.__proto__ === number01.__proto__.constructor); // false, объект-прототип функции-конструктора Number { 0 } ("Number.prototype") !== функция-конструктор function Number() ("new Number")
console.log(number01.__proto__ === number01.__proto__.constructor.prototype); // true, объект-прототип функции-конструктора Number { 0 } ("Number.prototype") === объект-прототип функции-конструктора Number { 0 } ("Number.prototype")
console.log(number01.__proto__ === Number); // false, объект-прототип функции-конструктора Number { 0 } ("Number.prototype") !== функция-конструктор function Number() ("new Number")
console.log(number01.__proto__ === Number.prototype); // true, объект-прототип функции-конструктора Number { 0 } ("Number.prototype") === объект-прототип функции-конструктора Number { 0 } ("Number.prototype")
console.log(number01.__proto__.constructor === Number); // true, функция-конструктор function Number() ("new Number") === функция-конструктор function Number() ("new Number")
console.log(number01.__proto__.constructor.prototype === Number.prototype); // true, объект-прототип функции-конструктора Number { 0 } ("Number.prototype") === объект-прототип функции-конструктора Number { 0 } ("Number.prototype")
console.log('------');

console.log(Number.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Number.__proto__.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Number.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Number.__proto__ === number01.__proto__); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора Number { 0 } ("Number.prototype")
console.log(Number.__proto__ === Number.prototype); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора Number { 0 } ("Number.prototype")
console.log(Number.prototype.__proto__ === Object.prototype); // true, объект-прототип функции-конструктора Object { … } ("Object.prototype") === объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Number.__proto__ === Function.__proto__); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Number.__proto__ === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(' ');

/*--------------------------------*/

console.log('- = = S T R I N G S = = -');
let string01 = 'abc';
console.log(string01.__proto__); // объект-прототип функции-конструктора String { "" } ("String.prototype"), предоставляет методы доступные через прототипное наследование как "string01.method()"
console.log(string01.__proto__.constructor); // функция-конструктор function String() ("new String"), предоставляет методы доступные как "String.method(string01)"
console.log(string01.__proto__ === string01.__proto__.constructor); // false, объект-прототип функции-конструктора String { "" } ("String.prototype") !== функция-конструктор function String() ("new String")
console.log(string01.__proto__ === string01.__proto__.constructor.prototype); // true, объект-прототип функции-конструктора String { "" } ("String.prototype") === объект-прототип функции-конструктора String { "" } ("String.prototype")
console.log(string01.__proto__ === String); // false, объект-прототип функции-конструктора String { "" } ("String.prototype") !== функция-конструктор function String() ("new String")
console.log(string01.__proto__ === String.prototype); // true, объект-прототип функции-конструктора String { "" } ("String.prototype") === объект-прототип функции-конструктора String { "" } ("String.prototype")
console.log(string01.__proto__.constructor === String); // true, функция-конструктор function String() ("new String") === функция-конструктор function String() ("new String")
console.log(string01.__proto__.constructor.prototype === String.prototype); // true, объект-прототип функции-конструктора String { "" } ("String.prototype") === объект-прототип функции-конструктора String { "" } ("String.prototype")
console.log('------');

console.log(String.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype")
console.log(String.__proto__.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(String.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(String.__proto__ === string01.__proto__); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора String { "" } ("String.prototype")
console.log(String.__proto__ === String.prototype); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора String { "" } ("String.prototype")
console.log(String.prototype.__proto__ === Object.prototype); // true, объект-прототип функции-конструктора Object { … } ("Object.prototype") === объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(String.__proto__ === Function.__proto__); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(String.__proto__ === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(' ');

/*--------------------------------*/

console.log('- = = B O O L E A N S = = -');
let boolean01 = true;
console.log(boolean01.__proto__); // объект-прототип функции-конструктора Boolean { false } ("Boolean.prototype"), предоставляет методы доступные через прототипное наследование как "boolean01.method()"
console.log(boolean01.__proto__.constructor); // функция-конструктор function Boolean() ("new Boolean"), предоставляет методы доступные как "Boolean.method(boolean01)"
console.log(boolean01.__proto__ === boolean01.__proto__.constructor); // false, объект-прототип функции-конструктора Boolean { false } ("Boolean.prototype") !== функция-конструктор function Boolean() ("new Boolean")
console.log(boolean01.__proto__ === boolean01.__proto__.constructor.prototype); // true, объект-прототип функции-конструктора Boolean { false } ("Boolean.prototype") === объект-прототип функции-конструктора Boolean { false } ("Boolean.prototype")
console.log(boolean01.__proto__ === Boolean); // false, объект-прототип функции-конструктора Boolean { false } ("Boolean.prototype") !== функция-конструктор function Boolean() ("new Boolean")
console.log(boolean01.__proto__ === Boolean.prototype); // true, объект-прототип функции-конструктора Boolean { false } ("Boolean.prototype") === объект-прототип функции-конструктора Boolean { false } ("Boolean.prototype")
console.log(boolean01.__proto__.constructor === Boolean); // true, функция-конструктор function Boolean() ("new Boolean") === функция-конструктор function Boolean() ("new Boolean")
console.log(boolean01.__proto__.constructor.prototype === Boolean.prototype); // true, объект-прототип функции-конструктора Boolean { false } ("Boolean.prototype") === объект-прототип функции-конструктора Boolean { false } ("Boolean.prototype")
console.log('------');

console.log(Boolean.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Boolean.__proto__.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Boolean.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Boolean.__proto__ === boolean01.__proto__); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора Boolean { false } ("Boolean.prototype")
console.log(Boolean.__proto__ === Boolean.prototype); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора Boolean { false } ("Boolean.prototype")
console.log(Boolean.prototype.__proto__ === Object.prototype); // true, объект-прототип функции-конструктора Object { … } ("Object.prototype") === объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Boolean.__proto__ === Function.__proto__); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Boolean.__proto__ === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(' ');

/*--------------------------------*/

console.log('- = = S Y M B O L S = = -');
let symbol01 = Symbol('a');
console.log(symbol01.__proto__); // объект-прототип функции-конструктора Object { … } ("Symbol.prototype", не путать с "Object.prototype"), предоставляет методы доступные через прототипное наследование как "symbol01.method()"
console.log(symbol01.__proto__.constructor); // функция-конструктор function Symbol() ("Symbol"), предоставляет методы доступные как "Symbol.method(symbol01)"
console.log(symbol01.__proto__ === symbol01.__proto__.constructor); // false, объект-прототип функции-конструктора Object { … } ("Symbol.prototype") !== функция-конструктор function Symbol() ("Symbol")
console.log(symbol01.__proto__ === symbol01.__proto__.constructor.prototype); // true, объект-прототип функции-конструктора Object { … } ("Symbol.prototype") === объект-прототип функции-конструктора Object { … } ("Symbol.prototype")
console.log(symbol01.__proto__ === Symbol); // false, объект-прототип функции-конструктора Object { … } ("Symbol.prototype") !== функция-конструктор function Symbol() ("Symbol")
console.log(symbol01.__proto__ === Symbol.prototype); // true, объект-прототип функции-конструктора Object { … } ("Symbol.prototype") === объект-прототип функции-конструктора Object { … } ("Symbol.prototype")
console.log(symbol01.__proto__.constructor === Symbol); // true, функция-конструктор function Symbol() ("Symbol") === функция-конструктор function Symbol() ("Symbol")
console.log(symbol01.__proto__.constructor.prototype === Symbol.prototype); // true, объект-прототип функции-конструктора Object { … } ("Symbol.prototype") === объект-прототип функции-конструктора Object { … } ("Symbol.prototype")
console.log('------');

console.log(Symbol.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Symbol.__proto__.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Symbol.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Symbol.__proto__ === symbol01.__proto__); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора Object { … } ("Symbol.prototype")
console.log(Symbol.__proto__ === Symbol.prototype); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора Object { … } ("Symbol.prototype")
console.log(Symbol.prototype.__proto__ === Object.prototype); // true, объект-прототип функции-конструктора Object { … } ("Object.prototype") === объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Symbol.__proto__ === Function.__proto__); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Symbol.__proto__ === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(' ');

/*--------------------------------*/

console.log('- = = B I G I N T S = = -');
let bigInt01 = BigInt(10);
console.log(bigInt01.__proto__); // объект-прототип функции-конструктора BigInt.prototype { … } ("BigInt.prototype"), предоставляет методы доступные через прототипное наследование как "bigInt01.method()"
console.log(bigInt01.__proto__.constructor); // функция-конструктор function BigInt() ("BigInt"), предоставляет методы доступные как "BigInt.method(bigInt01)"
console.log(bigInt01.__proto__ === bigInt01.__proto__.constructor); // false, объект-прототип функции-конструктора BigInt.prototype { … } ("BigInt.prototype") !== функция-конструктор function BigInt() ("BigInt")
console.log(bigInt01.__proto__ === bigInt01.__proto__.constructor.prototype); // true, объект-прототип функции-конструктора BigInt.prototype { … } ("BigInt.prototype") === объект-прототип функции-конструктора BigInt.prototype { … } ("BigInt.prototype")
console.log(bigInt01.__proto__ === BigInt); // false, объект-прототип функции-конструктора BigInt.prototype { … } ("BigInt.prototype") !== функция-конструктор function BigInt() ("BigInt")
console.log(bigInt01.__proto__ === BigInt.prototype); // true, объект-прототип функции-конструктора BigInt.prototype { … } ("BigInt.prototype") === объект-прототип функции-конструктора BigInt.prototype { … } ("BigInt.prototype")
console.log(bigInt01.__proto__.constructor === BigInt); // true, функция-конструктор function BigInt() ("BigInt") === функция-конструктор function BigInt() ("BigInt")
console.log(bigInt01.__proto__.constructor.prototype === BigInt.prototype); // true, объект-прототип функции-конструктора BigInt.prototype { … } ("BigInt.prototype") === объект-прототип функции-конструктора BigInt.prototype { … } ("BigInt.prototype")
console.log('------');

console.log(BigInt.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype")
console.log(BigInt.__proto__.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(BigInt.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(BigInt.__proto__ === bigInt01.__proto__); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора BigInt.prototype { … } ("BigInt.prototype")
console.log(BigInt.__proto__ === BigInt.prototype); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора BigInt.prototype { … } ("BigInt.prototype")
console.log(BigInt.prototype.__proto__ === Object.prototype); // true, объект-прототип функции-конструктора Object { … } ("Object.prototype") === объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(BigInt.__proto__ === Function.__proto__); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(BigInt.__proto__ === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(' ');

/*--------------------------------*/

console.log('- = = C L A S S E S = = -');
class Class01 { };
console.log(Class01);
console.log(Class01.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype"), предоставляет методы доступные через прототипное наследование как "Class01.method()"
console.log(Class01.__proto__.constructor); // функция-конструктор function Function() ("new Function"), предоставляет методы доступные как "Function.method(Class01)"
console.log(Class01.__proto__ === Class01.__proto__.constructor); // false, объект-прототип функции-конструктора function ("Function.prototype") () !== функция-конструктор function Function() ("new Function")
console.log(Class01.__proto__ === Class01.__proto__.constructor.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Class01.__proto__ === Function); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== функция-конструктор function Function() ("new Function")
console.log(Class01.__proto__ === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Class01.__proto__.constructor === Function); // true, функция-конструктор function Function() ("new Function") === функция-конструктор function Function() ("new Function")
console.log(Class01.__proto__.constructor.prototype === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log('------');

console.log(Function.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Function.__proto__.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Function.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Function.__proto__ === Class01.__proto__); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Function.__proto__ === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Function.prototype.__proto__ === Object.prototype); // true, объект-прототип функции-конструктора Object { … } ("Object.prototype") === объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(' ');

/*--------------------------------*/

console.log('- = = P R O M I S E S = = -');
let promise01 = new Promise(() => { });
console.log(promise01);
console.log(promise01.__proto__); // объект-прототип функции-конструктора Promise.prototype { … } ("Promise.prototype"), предоставляет методы доступные через прототипное наследование как "promise01.method()"
console.log(promise01.__proto__.constructor); // функция-конструктор function Promise() ("new Promise"), предоставляет методы доступные как "Promise.method(promise01)"
console.log(promise01.__proto__ === promise01.__proto__.constructor); // false, объект-прототип функции-конструктора Promise.prototype { … } ("Promise.prototype") !== функция-конструктор function Promise() ("new Promise")
console.log(promise01.__proto__ === promise01.__proto__.constructor.prototype); // true, объект-прототип функции-конструктора Promise.prototype { … } ("Promise.prototype") === объект-прототип функции-конструктора Promise.prototype { … } ("Promise.prototype")
console.log(promise01.__proto__ === Promise); // false, объект-прототип функции-конструктора Promise.prototype { … } ("Promise.prototype") !== функция-конструктор function Promise() ("new Promise")
console.log(promise01.__proto__ === Promise.prototype); // true, объект-прототип функции-конструктора Promise.prototype { … } ("Promise.prototype") === объект-прототип функции-конструктора Promise.prototype { … } ("Promise.prototype")
console.log(promise01.__proto__.constructor === Promise); // true, функция-конструктор function Promise() ("new Promise") === функция-конструктор function Promise() ("new Promise")
console.log(promise01.__proto__.constructor.prototype === Promise.prototype); // true, объект-прототип функции-конструктора Promise.prototype { … } ("Promise.prototype") === объект-прототип функции-конструктора Promise.prototype { … } ("Promise.prototype")
console.log('------');

console.log(Promise.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Promise.__proto__.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Promise.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Promise.__proto__ === promise01.__proto__); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора Promise.prototype { … } ("Promise.prototype")
console.log(Promise.__proto__ === Promise.prototype); // false, объект-прототип функции-конструктора function () ("Function.prototype") !== объект-прототип функции-конструктора Promise.prototype { … } ("Promise.prototype")
console.log(Promise.prototype.__proto__ === Object.prototype); // true, объект-прототип функции-конструктора Object { … } ("Object.prototype") === объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(Promise.__proto__ === Function.__proto__); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(Promise.__proto__ === Function.prototype); // true, объект-прототип функции-конструктора function () ("Function.prototype") === объект-прототип функции-конструктора function () ("Function.prototype")
console.log(' ');

console.log('01----------------------------------------------------------------------------');
console.log('01----------------------------------------------------------------------------');
console.log('01----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Свойства "__proto__" экземпляров данных, созданных на основе разных функций-конструкторов, разные. Свойства 
"__proto__" экземпляров данных, созданных на основе одной и той же функции-конструктора, одинаковые.*/
let obj02 = {};
let obj03 = {};
let number02 = 7;
console.log(obj02.__proto__ === obj03.__proto__); // true
console.log(obj02.__proto__ === number02.__proto__); // false
console.log(' ');

console.log('02----------------------------------------------------------------------------');
console.log('02----------------------------------------------------------------------------');
console.log('02----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*В JS есть встроенные функции-конструкторы, такие как "Object()", "Promise()", "Function()", "Boolean()", "Number()", 
"String()", "Array()", "Function()". Когда мы создаем новый экземпляр данных какого-либо типа, то на самом деле где-то
"под капотом" вызываются такие функции-конструкторы. Чтобы понять, что стоит за каким-либо свойством "__proto__" 
какого-то экземпляра данных, нужно узнать с помощью какой функции-конструктора или класса был создан этот экземпляр 
данных, а затем посмотреть свойство "prototype" у этой функции-конструктора.*/
let obj04 = {}
let array05 = [1, 2];
function func02() { };
let obj05 = new func02();
console.log(obj04.__proto__ === Object.prototype); // true
console.log(array05.__proto__ === Array.prototype); // true
console.log(obj05.__proto__ === func02.prototype); // true
console.log(' ');

console.log('03----------------------------------------------------------------------------');
console.log('03----------------------------------------------------------------------------');
console.log('03----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Любой класс или функция имеет свойство "prototype". Каждое свойство "prototype" это независимый объект со свойствами
и методами. Свойство "__proto__" любого экземпляра данных ссылается на свойство "prototype" функции-конструктора или 
класса, при помощи которого этот экземпляр данных был создан. Свойство "__proto__" нужен для того, чтобы экземпляр 
данных мог связаться со свойством "prototype" своего "завещателя". Свойство "prototype" по умолчанию является объектом 
с единственным свойством "constructor", которое ссылается на саму же функцию-конструктор или класс
(func01.prototype.constructor = func01).*/
console.log(Object.prototype); // объект-прототип функции-конструктора Object
console.log(Promise.prototype); // объект-прототип функции-конструктора Promise
console.log(Function.prototype); // объект-прототип функции-конструктора Function
console.log(Boolean.prototype); // объект-прототип функции-конструктора Boolean
console.log(Number.prototype); // объект-прототип функции-конструктора Number
console.log(String.prototype); // объект-прототип функции-конструктора String
console.log(Array.prototype); // объект-прототип функции-конструктора Array
console.log(' ');

console.log('04----------------------------------------------------------------------------');
console.log('04----------------------------------------------------------------------------');
console.log('04----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(({}).prototype === ({}).__proto__); // false
console.log(({}).prototype); // undefined
console.log(({}).__proto__); // объект-прототип функции-конструктора Object
console.log(' ');

console.log('05----------------------------------------------------------------------------');
console.log('05----------------------------------------------------------------------------');
console.log('05----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

function func03() { console.log(func03.prototype === func03.__proto__) };
func03(); // false
console.log(func03.prototype); // объект-прототип функции func03
console.log(func03.__proto__); // объект-прототип функции-конструктора Function
console.log(func03.__proto__ === Function.prototype); // true
console.log(' ');

console.log('06----------------------------------------------------------------------------');
console.log('06----------------------------------------------------------------------------');
console.log('06----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

function func04() { };
function func05() { };
console.log(func04.__proto__ === func05.__proto__); // true
console.log(func04.__proto__ === Function.prototype); // true
console.log(func04.prototype === func05.prototype); // false
console.log(func04.__proto__); // объект-прототип функции-конструктора Function
console.log(func05.__proto__); // объект-прототип функции-конструктора Function
console.log(func04.prototype); // объект-прототип функции func04
console.log(func05.prototype); // объект-прототип функции func05
console.log(' ');

console.log('07----------------------------------------------------------------------------');
console.log('07----------------------------------------------------------------------------');
console.log('07----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

let arrowFunc02 = (props) => { return '<div>I know nothing</div>' };
console.log(arrowFunc02.prototype === Object.prototype); // false
console.log(arrowFunc02.prototype); // underfined
console.log(arrowFunc02.__proto__ === Function.prototype); // true
console.log(arrowFunc02.__proto__); // объект-прототип функции-конструктора Function
console.log(' ');

console.log('08----------------------------------------------------------------------------');
console.log('08----------------------------------------------------------------------------');
console.log('08----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

let number03 = 24;
console.log(number03.prototype === Number.prototype); // false
console.log(number03.prototype); // undefined
console.log(number03.__proto__ === Number.prototype); // true
console.log(number03.__proto__); // объект-прототип функции-конструктора Number
console.log(' ');

console.log('09----------------------------------------------------------------------------');
console.log('09----------------------------------------------------------------------------');
console.log('09----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

class Class02 { };
console.log(Class02.__proto__ === Function.prototype); // true
console.log(Class02.__proto__); // объект-прототип функции-конструктора Function
console.log(Class02.prototype); // объект-прототип функции-конструктора (класса) Class02
console.log(' ');

console.log('10----------------------------------------------------------------------------');
console.log('10----------------------------------------------------------------------------');
console.log('10----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

function func06() { let d = 0 };
console.log(func06.__proto__ === Function.prototype); // true
console.log(func06.__proto__); // объект-прототип функции-конструктора Function
console.log(' ');

console.log('11----------------------------------------------------------------------------');
console.log('11----------------------------------------------------------------------------');
console.log('11----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если мы пытаемся прочитать какое-либо свойство у какого-либо экземпляра данных, либо вызвать у него какой-либо метод, 
и при этом указанного свойства или метода у этого экземпляра данных нет, то этот экземпляр данных будет искать их через
свойство "__proto__", то есть через ссылку на свойство "prototype" своей функции-конструктора. Поэтому при создании 
функций-конструкторов методы лучше указывать в их свойстве "prototype".*/
let obj06 = { a: 'abc' };
console.log(obj06.toString()); // "[Object object]": { a: 'abc' } => Object.prototype
console.log(' ');

console.log('12----------------------------------------------------------------------------');
console.log('12----------------------------------------------------------------------------');
console.log('12----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

function func07(a) { this.a = a };
func07.prototype.showA = function () { console.log(this.a) };
let obj07 = new func07(0);
let obj08 = new func07(1);
obj07.showA(); // 0
obj08.showA(); // 1
console.log('--1--');

class Class03 {
    constructor(a) { this.a = a };
    showA() { console.log(this.a) };
};

console.log(Class03.prototype); // объект-прототип функции-конструктора (класса) Class03
let obj09 = new Class03(0);
let obj10 = new Class03(1);
obj09.showA(); // 0
obj10.showA(); // 1
console.log('--2--');

console.log(obj09.__proto__); // объект-прототип функции-конструктора (класса) Class03
console.log(Class03.prototype); // объект-прототип функции-конструктора (класса) Class03
console.log(obj09.__proto__ === Class03.prototype); // true
console.log('--3--');

console.log(obj09.__proto__.__proto__); // объект-прототип функции-конструктора Object
console.log(Class03.prototype.__proto__); // объект-прототип функции-конструктора Object
console.log(obj09.__proto__.__proto__ === Object.prototype); // true
console.log(Class03.prototype.__proto__ === Object.prototype); // true
console.log('--4--');

console.log(obj09.__proto__.__proto__.__proto__); // null
console.log(obj09.__proto__.__proto__.prototype); // undefined
console.log('--5--');

console.log(Class03.prototype.__proto__.__proto__); // null
console.log(Class03.prototype.__proto__.prototype); // undefined
console.log('--6--');

console.log(Object.prototype.__proto__); // null
console.log(Object.prototype.prototype); // undefined
console.log('--7--');

console.log(obj09.__proto__.__proto__.__proto__ === Object.prototype.__proto__); // true
console.log(obj09.__proto__.__proto__.prototype === Object.prototype.prototype); // true
console.log(Class03.prototype.__proto__.__proto__ === Object.prototype.__proto__); // true
console.log(Class03.prototype.__proto__.prototype === Object.prototype.prototype); // true
console.log('--8--');

console.log(Class03.__proto__); // объект-прототип функции-конструктора Function
console.log(Class03.__proto__ === Function.prototype); // true
console.log('--9--');

console.log(Class03.__proto__.__proto__); // объект-прототип функции-конструктора Object
console.log(Class03.__proto__.__proto__ === Object.prototype); // true
console.log('--10--');

console.log(Class03.__proto__.prototype); // undefined
console.log(Class03.__proto__.prototype === Object.prototype.prototype); // true
console.log('--11--');

console.log(obj09.__proto__.constructor); // функция-конструктор (класс) Class03
console.log(obj09.__proto__.constructor === Class03); // true
console.log('--12--');

console.log(obj09.__proto__.constructor.__proto__); // объект-прототип функции-конструктора Function
console.log(Class03.__proto__); // объект-прототип функции-конструктора Function
console.log(obj09.__proto__.constructor.__proto__ === Function.prototype); // true
console.log(obj09.__proto__.constructor.__proto__ === Class03.__proto__); // true
console.log('--13--');

console.log(obj09.__proto__.constructor.prototype); // 
console.log(Class03.prototype); //
console.log(obj09.__proto__.constructor.prototype === Class03.prototype); //
console.log('--14--');

console.log(obj09.__proto__.constructor.prototype.__proto__); // объект-прототип функции-конструктора Object
console.log(Class03.prototype.__proto__); // объект-прототип функции-конструктора Object
console.log(obj09.__proto__.constructor.prototype.__proto__ === Class03.prototype.__proto__); // true
console.log(obj09.__proto__.constructor.prototype.__proto__ === Object.prototype); // true
console.log('--15--');

console.log(obj09.__proto__.constructor.prototype.__proto__.__proto__); // null
console.log(Class03.prototype.__proto__.__proto__); // null
console.log(obj09.__proto__.constructor.prototype.__proto__.__proto__ === Class03.prototype.__proto__.__proto__); // true
console.log(' ');

console.log('13----------------------------------------------------------------------------');
console.log('13----------------------------------------------------------------------------');
console.log('13----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(Object.__proto__); // объект-прототип функции-конструктора Function
console.log(Promise.__proto__); // объект-прототип функции-конструктора Function
console.log(Function.__proto__); // объект-прототип функции-конструктора Function
console.log(Boolean.__proto__); // объект-прототип функции-конструктора Function
console.log(Number.__proto__); // объект-прототип функции-конструктора Function
console.log(String.__proto__); // объект-прототип функции-конструктора Function
console.log(Array.__proto__); // объект-прототип функции-конструктора Function

console.log(Object.__proto__ === Promise.__proto__); // true
console.log(Object.__proto__ === Function.__proto__); // true
console.log(Function.__proto__ === Function.prototype); // true
console.log(' ');

console.log('14----------------------------------------------------------------------------');
console.log('14----------------------------------------------------------------------------');
console.log('14----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(Object.__proto__.__proto__); // объект-прототип функции-конструктора Object
console.log(Promise.__proto__.__proto__); // объект-прототип функции-конструктора Object
console.log(Function.__proto__.__proto__); // объект-прототип функции-конструктора Object
console.log(Boolean.__proto__.__proto__); // объект-прототип функции-конструктора Object
console.log(Number.__proto__.__proto__); // объект-прототип функции-конструктора Object
console.log(String.__proto__.__proto__); // объект-прототип функции-конструктора Object
console.log(Array.__proto__.__proto__); // объект-прототип функции-конструктора Object
console.log(Object.__proto__.__proto__ === Function.__proto__.__proto__); // true
console.log(' ');

console.log('15----------------------------------------------------------------------------');
console.log('15----------------------------------------------------------------------------');
console.log('15----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(Object.prototype.__proto__); // null
console.log(Promise.prototype.__proto__); // объект-прототип функции-конструктора Object
console.log(Function.prototype.__proto__); // объект-прототип функции-конструктора Object
console.log(Boolean.prototype.__proto__); // объект-прототип функции-конструктора Object
console.log(Number.prototype.__proto__); // объект-прототип функции-конструктора Object
console.log(String.prototype.__proto__); // объект-прототип функции-конструктора Object
console.log(Array.prototype.__proto__); // объект-прототип функции-конструктора Object
console.log(Function.__proto__.__proto__ === Number.prototype.__proto__); // true
console.log(Function.__proto__.__proto__ === Function.__proto__.__proto__); // true
console.log(' ');

console.log('16----------------------------------------------------------------------------');
console.log('16----------------------------------------------------------------------------');
console.log('16----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(Object.prototype.prototype); // undefined
console.log(Promise.prototype.prototype); // undefined
console.log(Function.prototype.prototype); // undefined
console.log(Boolean.prototype.prototype); // undefined
console.log(Number.prototype.prototype); // undefined
console.log(String.prototype.prototype); // undefined
console.log(Array.prototype.prototype); // undefined
console.log(' ');

console.log('17----------------------------------------------------------------------------');
console.log('17----------------------------------------------------------------------------');
console.log('17----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Свойство "prototype" функций-конструкторов можно модифицировать, чтобы дочерние элементы могли иметь бОльший 
функционал. При помощи метода "Object.create()" можно создавать новые объекты на основе других.*/
// Object.prototype.showB = function () { console.log(`It's B!`) };
// ({}).showB(); // "It's B!"

// let obj11 = {
//     showC: function () { console.log(`It's C!`) }
// };

// let obj12 = Object.create(obj11);
// console.log(obj11); // Object { showC: showC() }
// console.log(obj12); // Object {  }
// console.log(obj11 === obj12); // false
// obj12.showC(); // "It's C!"
// obj12.showB(); // "It's B!"
// console.log(obj12.__proto__); // Object { showC: showC() } (объект "obj11")
// console.log(obj12.__proto__.__proto__); // объект-прототип функции-конструктора Object
// console.log(' ');

console.log('18----------------------------------------------------------------------------');
console.log('18----------------------------------------------------------------------------');
console.log('18----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Свойство "prototype" это всегда какой-то объект. Свойство "__proto__" может быть объектом, функцией или классом. 
При наследовании классов в свойство "__proto__" у класса-наследника кладется ссылка на весь класс-завещатель, а не на
свойство "prototype" этого класса-завещателя. То есть общее правило для поиска свойства "__proto__" остается 
неизменным, за исключением работы с классами, которые наследуются от другого класса:
Свойство "__proto__" экземпляра данных равно свойству "prototype" конструктора или класса, на основе которых был 
создан это экземпляр данных. А свойство "__proto__" класса-наследника равно всему классу-завещателю.*/
class Class04 {
    showA() { console.log(`It's A!`) }
};

class Class05 extends Class04 {
    showB() { console.log(`It's B!`) }
};

let obj13 = new Class05();
console.log(obj13); // Object {  }
console.log(obj13.__proto__.constructor === Class05); // true
obj13.showB(); // "It's B!" (obj13 => Class05.prototype)
obj13.showA(); // "It's A!" (obj13 => Class05.prototype => Class04.prototype)
console.log(' ');

console.log(Class04.prototype); // { constructor: class Class04 {}, showA: function showA() } объект-прототип функции-конструктора (класса) Class04
console.log(Class05.prototype); // { constructor: class Class05 {}, showB: function showB() } объект-прототип функции-конструктора (класса) Class05
console.log(Class04.__proto__); // объект-прототип функции-конструктора Function ("Function.prototype")
console.log(Class05.__proto__); // class Class04 {} функция-конструктор (класс) Class04 ("Class04"), а не объект-прототип функции-конструктора (класса) Class04 ("Class04.prototype")
console.log(' ');

console.log(Class04.__proto__ === Function.prototype); // true
console.log(Class05.__proto__ === Class04); // true
console.log(' ');

console.log('19----------------------------------------------------------------------------');
console.log('19----------------------------------------------------------------------------');
console.log('19----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Классы также работают при помощи прототипов.*/
class Class06 {
    constructor(name) { this.name = name };

    someMethod01() { console.log(this.name) };
    someMethod02() { console.log(this.name) };
    someMethod03() { console.log(this.name) };
};

console.log(Class06.prototype); // Object { constructor, someMethod01,​ someMethod02, someMethod03 }

let obj14 = new Class06('obj14');
console.log(obj14); // Object { name: "obj14" }
obj14.someMethod01(); // "obj14"
obj14.someMethod02(); // "obj14"
obj14.someMethod03(); // "obj14"
console.log(obj14.__proto__); // объект-прототип функции-конструктора (класса) Class06
console.log(obj14.__proto__.constructor.prototype); // объект-прототип функции-конструктора (класса) Class06
console.log(' ');

console.log('20----------------------------------------------------------------------------');
console.log('20----------------------------------------------------------------------------');
console.log('20----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(({}).__proto__); // объект-прототип функции-конструктора Object
console.log((1).__proto__); // объект-прототип функции-конструктора Number
console.log(('abc').__proto__); // объект-прототип функции-конструктора String
console.log((true).__proto__); // объект-прототип функции-конструктора Boolean
console.log(([1, 2, 3]).__proto__); // объект-прототип функции-конструктора Array
console.log((function () { }).__proto__); // объект-прототип функции-конструктора Function
console.log((new Promise(() => { })).__proto__); // объект-прототип функции-конструктора Promise
console.log(' ');

console.log('21----------------------------------------------------------------------------');
console.log('21----------------------------------------------------------------------------');
console.log('21----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(({}).__proto__.constructor === Object); // true
console.log((1).__proto__.constructor === Number); // true
console.log(('abc').__proto__.constructor === String); // true
console.log((true).__proto__.constructor === Boolean); // true
console.log(([1, 2, 3]).__proto__.constructor === Array); // true
console.log((function () { }).__proto__.constructor === Function); // true
console.log((new Promise(() => { })).__proto__.constructor === Promise); // true
console.log(' ');

console.log('22----------------------------------------------------------------------------');
console.log('22----------------------------------------------------------------------------');
console.log('22----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(({}).__proto__ === Object); // false
console.log((1).__proto__ === Number); // false
console.log(('abc').__proto__ === String); // false
console.log((true).__proto__ === Boolean); // false
console.log(([1, 2, 3]).__proto__ === Array); // false
console.log((function () { }).__proto__ === Function); // false
console.log((new Promise(() => { })).__proto__ === Promise); // false
console.log(' ');

console.log('23----------------------------------------------------------------------------');
console.log('23----------------------------------------------------------------------------');
console.log('23----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(({}).__proto__ === Object.prototype); // true
console.log((1).__proto__ === Number.prototype); // true
console.log(('abc').__proto__ === String.prototype); // true
console.log((true).__proto__ === Boolean.prototype); // true
console.log(([1, 2, 3]).__proto__ === Array.prototype); // true
console.log((function () { }).__proto__ === Function.prototype); // true
console.log((new Promise(() => { })).__proto__ === Promise.prototype); // true

console.log('24----------------------------------------------------------------------------');
console.log('24----------------------------------------------------------------------------');
console.log('24----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Скорее всего по умолчанию (то есть если мы сами не указали в коде по-другому) любой экземпляр данных не имеет своего 
геттера/сеттера "__proto__", а берет его через прототипное наследование, а когда получает его, то этот геттер/сеттер 
"__proto__" работает по-разному в зависимости от типа экземпляра данных.*/
console.log([1, 2, 3]); // сам массив Array(3) [ 1, 2, 3 ]
console.log([].__proto__); // объект-прототип функции-конструктора Array [] ("Array.prototype")
console.log([].__proto__.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log([].__proto__.__proto__.__proto__); // null  
console.log(' ');

function func08(a, b) { console.log('123') };
console.log(func08); // сама функция function func08(a, b)
console.log(func08.__proto__); // объект-прототип функции-конструктора function () ("Function.prototype")
console.log(func08.__proto__.__proto__); // объект-прототип функции-конструктора Object { … } ("Object.prototype")
console.log(func08.__proto__.__proto__.__proto__); // null
console.log(' ');

let obj15 = {
    _a: 1,
    get a() { return this._a },
    set a(x) { this._a = x },
};

console.log(obj15.a.toString()); // "1", сработает геттер, возвращает 1, а метод "toString()" не выведет код геттера, а вернет строку "1"
let descriptor01 = Object.getOwnPropertyDescriptor(obj15, 'a')
console.log(descriptor01); // Object { get: a(), set: a(x), enumerable: true, configurable: true }
console.log(descriptor01.get); // function a()
console.log(descriptor01.set); // function a(x)
console.log(descriptor01.get.toString()); // get a() { return this._a }
console.log(descriptor01.set.toString()); // set a(x) { this._a = x }
console.log(' ');

console.log(func08.toString()); //  function func08(a, b) { console.log('123') }
console.log(func08.__proto__.call.toString()); // function call() { [native code] }
console.log(func08.__proto__.__proto__.hasOwnProperty.toString()); // function call() { [native code] }
// console.log(func08.__proto__.__proto__.__proto__.toString()); //  Uncaught TypeError: func08.__proto__.__proto__.__proto__ is null
console.log(' ');

let descriptor02 = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
console.log(descriptor02); // Object { get: __proto__(), set: __proto__(), enumerable: false, configurable: true }
console.log(descriptor02.get); // function __proto__()
console.log(descriptor02.set); // function __proto__()
console.log(descriptor02.get.toString()); // function __proto__() { [native code] }
console.log(descriptor02.set.toString()); // function __proto__() { [native code] }