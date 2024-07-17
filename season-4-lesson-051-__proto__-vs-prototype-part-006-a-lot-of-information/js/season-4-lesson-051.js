'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*У стрелочных функций нет свойства "prototype", но есть свойство "__proto__", которое показывает, что стрелочные
функции наследуют от объекта прототипа конструктора function () (Function.prototype).*/
let arrowFunc01 = () => { };
console.log(arrowFunc01);
console.log(arrowFunc01.prototype); // undefined
console.log(arrowFunc01.__proto__); // объект прототипа конструктора function ()
console.log(' ');

console.log('00----------------------------------------------------------------------------');
console.log('00----------------------------------------------------------------------------');
console.log('00----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*1) Объекты прототипов конструкторов предоставляет методы доступные через прототипное наследование, а сами 
конструкторы предоставляет методы доступные через объекты самих конструкторов. 

2) У всех функций (кроме стрелочных) и классов есть и свойство "prototype", и свойство "__proto__". Остальные типы 
данных имеют только свойство "__proto__".

3) У конструктора function Function() (new Function) свойства "__proto__" и "prototype" оба ссылаются на одно и тоже: 
на объект прототипа конструктора function ().

4) Любой встроенный конструктор или любая функция всегда наследует от объекта прототипа конструктора function () 
(Function.prototype), который в свою очередь наследует от объекта прототипа конструктора Object { … } 
(Object.prototype), а последний в свойстве "__proto__" содержит null.

5) Прототипное наследование всегда идет по цепочке объектов прототипов конструкторов (например, свойство 
"Finction.prototype"), а не по самим конструкторам (например, функция-конструктор Function).*/
console.log('- = = F U N C T I O N S = = -');
function func01() { console.log(this.a) };
// let func01 = function () { console.log(this.a) };
// let func01 = () => { console.log(this.a) };
console.log(func01);
console.log(func01.__proto__); // объект прототипа конструктора function () (Function.prototype), предоставляет методы доступные через прототипное наследование как "func01.method()"
console.log(func01.__proto__.constructor); // конструктор function Function() (new Function), предоставляет методы доступные как "Function.method(func01)"
console.log(func01.__proto__ === func01.__proto__.constructor); // false, объект прототипа конструктора function (Function.prototype) () !== конструктор function Function() (new Function)
console.log(func01.__proto__ === func01.__proto__.constructor.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(func01.__proto__ === Function); // false, объект прототипа конструктора function () (Function.prototype) !== конструктор function Function() (new Function)
console.log(func01.__proto__ === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(func01.__proto__.constructor === Function); // true, конструктор function Function() (new Function) === конструктор function Function() (new Function)
console.log(func01.__proto__.constructor.prototype === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log('------');

console.log(Function.__proto__); // объект прототипа конструктора function () (Function.prototype)
console.log(Function.__proto__.__proto__); // объект прототипа конструктора Object { … } (Object.prototype)
console.log(Function.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Function.__proto__ === func01.__proto__); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(Function.__proto__ === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(Function.prototype.__proto__ === Object.prototype); // true, объект прототипа конструктора Object { … } (Object.prototype) === объект прототипа конструктора Object { … } (Object.prototype)
console.log('------');

Function.call({}); // ошибки не будет
func01.call({ a: 1 }); // 1
let customCall01 = Function.call; // получаем метод через конструктор function Function() (new Function), но неизвестно как его использовать
console.log(customCall01); // function call()
console.log(func01.customCall01); // undefined
// func01.customCall01({ a: 1 });
console.log(' ');

/*--------------------------------*/

console.log('- = = O B J E C T S = = -');
let obj01 = {};
console.log(obj01);
console.log(obj01.__proto__); // объект прототипа конструктора Object { … } (Object.prototype), предоставляет методы доступные через прототипное наследование как "obj01.method()"
console.log(obj01.__proto__.constructor); // конструктор function Object() (new Object), предоставляет методы доступные как "Object.method(obj01)"
console.log(obj01.__proto__ === obj01.__proto__.constructor); // false, объект прототипа конструктора Object { … } (Object.prototype) !== конструктор function Object() (new Object)
console.log(obj01.__proto__ === obj01.__proto__.constructor.prototype); // true, объект прототипа конструктора Object { … } (Object.prototype) === объект прототипа конструктора Object { … } (Object.prototype)
console.log(obj01.__proto__ === Object); // false, объект прототипа конструктора Object { … } (Object.prototype) !== конструктор function Object() (new Object)
console.log(obj01.__proto__ === Object.prototype); // true, объект прототипа конструктора Object { … } (Object.prototype) === объект прототипа конструктора Object { … } (Object.prototype)
console.log(obj01.__proto__.constructor === Object); // true, конструктор function Object() (new Object) === конструктор function Object() (new Object)
console.log(obj01.__proto__.constructor.prototype === Object.prototype); // true, объект прототипа конструктора Object { … } (Object.prototype) === объект прототипа конструктора Object { … } (Object.prototype)
console.log('------');

console.log(Object.__proto__); // объект прототипа конструктора function () (Function.prototype)
console.log(Object.__proto__.__proto__); // объект прототипа конструктора Object { … } (Object.prototype)
console.log(Object.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Object.__proto__ === obj01.__proto__); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора Object { … } (Object.prototype)
console.log(Object.__proto__ === Object.prototype); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора Object { … } (Object.prototype)
console.log(Object.prototype.__proto__ === Object.prototype); // false, null !== объект прототипа конструктора Object { … } (Object.prototype)
console.log(Object.__proto__ === Function.__proto__); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(Object.__proto__ === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(' ');

/*--------------------------------*/

console.log('- = = A R R A Y S = = -');
let array01 = ['q', 'w', 'e'];
console.log(array01);
console.log(array01.__proto__); // объект прототипа конструктора Array [] (Array.prototype), предоставляет методы доступные через прототипное наследование как "array01.method()"
console.log(array01.__proto__.constructor); // конструктор function Array() (new Array), предоставляет методы доступные как "Array.method(array01)"
console.log(array01.__proto__ === array01.__proto__.constructor); // false, объект прототипа конструктора Array [] (Array.prototype) !== конструктор function Array() (new Array)
console.log(array01.__proto__ === array01.__proto__.constructor.prototype); // true, объект прототипа конструктора Array [] (Array.prototype) === объект прототипа конструктора Array [] (Array.prototype)
console.log(array01.__proto__ === Array); // false, объект прототипа конструктора Array [] (Array.prototype) !== конструктор function Array() (new Array)
console.log(array01.__proto__ === Array.prototype); // true, объект прототипа конструктора Array [] (Array.prototype) === объект прототипа конструктора Array [] (Array.prototype)
console.log(array01.__proto__.constructor === Array); // true, конструктор function Array() (new Array) === конструктор function Array() (new Array)
console.log(array01.__proto__.constructor.prototype === Array.prototype); // true, объект прототипа конструктора Array [] (Array.prototype) === объект прототипа конструктора Array [] (Array.prototype)
console.log('------');

console.log(Array.__proto__); // объект прототипа конструктора function () (Function.prototype)
console.log(Array.__proto__.__proto__); // объект прототипа конструктора Object { … } (Object.prototype)
console.log(Array.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Array.__proto__ === array01.__proto__); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора Array [] (Array.prototype)
console.log(Array.__proto__ === Array.prototype); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора Array [] (Array.prototype)
console.log(Array.prototype.__proto__ === Object.prototype); // true, объект прототипа конструктора Object { … } (Object.prototype) === объект прототипа конструктора Object { … } (Object.prototype)
console.log(Array.__proto__ === Function.__proto__); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(Array.__proto__ === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(' ');

/*--------------------------------*/

console.log('- = = N U M B E R S = = -');
let number01 = 123;
console.log(number01.__proto__); // объект прототипа конструктора Number { 0 } (Number.prototype), предоставляет методы доступные через прототипное наследование как "number01.method()"
console.log(number01.__proto__.constructor); // конструктор function Number() (new Number), предоставляет методы доступные как "Number.method(number01)"
console.log(number01.__proto__ === number01.__proto__.constructor); // false, объект прототипа конструктора Number { 0 } (Number.prototype) !== конструктор function Number() (new Number)
console.log(number01.__proto__ === number01.__proto__.constructor.prototype); // true, объект прототипа конструктора Number { 0 } (Number.prototype) === объект прототипа конструктора Number { 0 } (Number.prototype)
console.log(number01.__proto__ === Number); // false, объект прототипа конструктора Number { 0 } (Number.prototype) !== конструктор function Number() (new Number)
console.log(number01.__proto__ === Number.prototype); // true, объект прототипа конструктора Number { 0 } (Number.prototype) === объект прототипа конструктора Number { 0 } (Number.prototype)
console.log(number01.__proto__.constructor === Number); // true, конструктор function Number() (new Number) === конструктор function Number() (new Number)
console.log(number01.__proto__.constructor.prototype === Number.prototype); // true, объект прототипа конструктора Number { 0 } (Number.prototype) === объект прототипа конструктора Number { 0 } (Number.prototype)
console.log('------');

console.log(Number.__proto__); // объект прототипа конструктора function () (Function.prototype)
console.log(Number.__proto__.__proto__); // объект прототипа конструктора Object { … } (Object.prototype)
console.log(Number.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Number.__proto__ === number01.__proto__); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора Number { 0 } (Number.prototype)
console.log(Number.__proto__ === Number.prototype); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора Number { 0 } (Number.prototype)
console.log(Number.prototype.__proto__ === Object.prototype); // true, объект прототипа конструктора Object { … } (Object.prototype) === объект прототипа конструктора Object { … } (Object.prototype)
console.log(Number.__proto__ === Function.__proto__); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(Number.__proto__ === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(' ');

/*--------------------------------*/

console.log('- = = S T R I N G S = = -');
let string01 = 'abc';
console.log(string01.__proto__); // объект прототипа конструктора String { "" } (String.prototype), предоставляет методы доступные через прототипное наследование как "string01.method()"
console.log(string01.__proto__.constructor); // конструктор function String() (new String), предоставляет методы доступные как "String.method(string01)"
console.log(string01.__proto__ === string01.__proto__.constructor); // false, объект прототипа конструктора String { "" } (String.prototype) !== конструктор function String() (new String)
console.log(string01.__proto__ === string01.__proto__.constructor.prototype); // true, объект прототипа конструктора String { "" } (String.prototype) === объект прототипа конструктора String { "" } (String.prototype)
console.log(string01.__proto__ === String); // false, объект прототипа конструктора String { "" } (String.prototype) !== конструктор function String() (new String)
console.log(string01.__proto__ === String.prototype); // true, объект прототипа конструктора String { "" } (String.prototype) === объект прототипа конструктора String { "" } (String.prototype)
console.log(string01.__proto__.constructor === String); // true, конструктор function String() (new String) === конструктор function String() (new String)
console.log(string01.__proto__.constructor.prototype === String.prototype); // true, объект прототипа конструктора String { "" } (String.prototype) === объект прототипа конструктора String { "" } (String.prototype)
console.log('------');

console.log(String.__proto__); // объект прототипа конструктора function () (Function.prototype)
console.log(String.__proto__.__proto__); // объект прототипа конструктора Object { … } (Object.prototype)
console.log(String.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(String.__proto__ === string01.__proto__); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора String { "" } (String.prototype)
console.log(String.__proto__ === String.prototype); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора String { "" } (String.prototype)
console.log(String.prototype.__proto__ === Object.prototype); // true, объект прототипа конструктора Object { … } (Object.prototype) === объект прототипа конструктора Object { … } (Object.prototype)
console.log(String.__proto__ === Function.__proto__); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(String.__proto__ === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(' ');

/*--------------------------------*/

console.log('- = = B O O L E A N S = = -');
let boolean01 = true;
console.log(boolean01.__proto__); // объект прототипа конструктора Boolean { false } (Boolean.prototype), предоставляет методы доступные через прототипное наследование как "boolean01.method()"
console.log(boolean01.__proto__.constructor); // конструктор function Boolean() (new Boolean), предоставляет методы доступные как "Boolean.method(boolean01)"
console.log(boolean01.__proto__ === boolean01.__proto__.constructor); // false, объект прототипа конструктора Boolean { false } (Boolean.prototype) !== конструктор function Boolean() (new Boolean)
console.log(boolean01.__proto__ === boolean01.__proto__.constructor.prototype); // true, объект прототипа конструктора Boolean { false } (Boolean.prototype) === объект прототипа конструктора Boolean { false } (Boolean.prototype)
console.log(boolean01.__proto__ === Boolean); // false, объект прототипа конструктора Boolean { false } (Boolean.prototype) !== конструктор function Boolean() (new Boolean)
console.log(boolean01.__proto__ === Boolean.prototype); // true, объект прототипа конструктора Boolean { false } (Boolean.prototype) === объект прототипа конструктора Boolean { false } (Boolean.prototype)
console.log(boolean01.__proto__.constructor === Boolean); // true, конструктор function Boolean() (new Boolean) === конструктор function Boolean() (new Boolean)
console.log(boolean01.__proto__.constructor.prototype === Boolean.prototype); // true, объект прототипа конструктора Boolean { false } (Boolean.prototype) === объект прототипа конструктора Boolean { false } (Boolean.prototype)
console.log('------');

console.log(Boolean.__proto__); // объект прототипа конструктора function () (Function.prototype)
console.log(Boolean.__proto__.__proto__); // объект прототипа конструктора Object { … } (Object.prototype)
console.log(Boolean.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Boolean.__proto__ === boolean01.__proto__); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора Boolean { false } (Boolean.prototype)
console.log(Boolean.__proto__ === Boolean.prototype); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора Boolean { false } (Boolean.prototype)
console.log(Boolean.prototype.__proto__ === Object.prototype); // true, объект прототипа конструктора Object { … } (Object.prototype) === объект прототипа конструктора Object { … } (Object.prototype)
console.log(Boolean.__proto__ === Function.__proto__); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(Boolean.__proto__ === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(' ');

/*--------------------------------*/

console.log('- = = S Y M B O L S = = -');
let symbol01 = Symbol('a');
console.log(symbol01.__proto__); // объект прототипа конструктора Object { … } (Symbol.prototype, не путать с Object.prototype), предоставляет методы доступные через прототипное наследование как "symbol01.method()"
console.log(symbol01.__proto__.constructor); // конструктор function Symbol() (Symbol), предоставляет методы доступные как "Symbol.method(symbol01)"
console.log(symbol01.__proto__ === symbol01.__proto__.constructor); // false, объект прототипа конструктора Object { … } (Symbol.prototype) !== конструктор function Symbol() (Symbol)
console.log(symbol01.__proto__ === symbol01.__proto__.constructor.prototype); // true, объект прототипа конструктора Object { … } (Symbol.prototype) === объект прототипа конструктора Object { … } (Symbol.prototype)
console.log(symbol01.__proto__ === Symbol); // false, объект прототипа конструктора Object { … } (Symbol.prototype) !== конструктор function Symbol() (Symbol)
console.log(symbol01.__proto__ === Symbol.prototype); // true, объект прототипа конструктора Object { … } (Symbol.prototype) === объект прототипа конструктора Object { … } (Symbol.prototype)
console.log(symbol01.__proto__.constructor === Symbol); // true, конструктор function Symbol() (Symbol) === конструктор function Symbol() (Symbol)
console.log(symbol01.__proto__.constructor.prototype === Symbol.prototype); // true, объект прототипа конструктора Object { … } (Symbol.prototype) === объект прототипа конструктора Object { … } (Symbol.prototype)
console.log('------');

console.log(Symbol.__proto__); // объект прототипа конструктора function () (Function.prototype)
console.log(Symbol.__proto__.__proto__); // объект прототипа конструктора Object { … } (Object.prototype)
console.log(Symbol.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Symbol.__proto__ === symbol01.__proto__); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора Object { … } (Symbol.prototype)
console.log(Symbol.__proto__ === Symbol.prototype); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора Object { … } (Symbol.prototype)
console.log(Symbol.prototype.__proto__ === Object.prototype); // true, объект прототипа конструктора Object { … } (Object.prototype) === объект прототипа конструктора Object { … } (Object.prototype)
console.log(Symbol.__proto__ === Function.__proto__); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(Symbol.__proto__ === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(' ');

/*--------------------------------*/

console.log('- = = B I G I N T S = = -');
let bigInt01 = BigInt(10);
console.log(bigInt01.__proto__); // объект прототипа конструктора BigInt.prototype { … } (BigInt.prototype), предоставляет методы доступные через прототипное наследование как "bigInt01.method()"
console.log(bigInt01.__proto__.constructor); // конструктор function BigInt() (BigInt), предоставляет методы доступные как "BigInt.method(bigInt01)"
console.log(bigInt01.__proto__ === bigInt01.__proto__.constructor); // false, объект прототипа конструктора BigInt.prototype { … } (BigInt.prototype) !== конструктор function BigInt() (BigInt)
console.log(bigInt01.__proto__ === bigInt01.__proto__.constructor.prototype); // true, объект прототипа конструктора BigInt.prototype { … } (BigInt.prototype) === объект прототипа конструктора BigInt.prototype { … } (BigInt.prototype)
console.log(bigInt01.__proto__ === BigInt); // false, объект прототипа конструктора BigInt.prototype { … } (BigInt.prototype) !== конструктор function BigInt() (BigInt)
console.log(bigInt01.__proto__ === BigInt.prototype); // true, объект прототипа конструктора BigInt.prototype { … } (BigInt.prototype) === объект прототипа конструктора BigInt.prototype { … } (BigInt.prototype)
console.log(bigInt01.__proto__.constructor === BigInt); // true, конструктор function BigInt() (BigInt) === конструктор function BigInt() (BigInt)
console.log(bigInt01.__proto__.constructor.prototype === BigInt.prototype); // true, объект прототипа конструктора BigInt.prototype { … } (BigInt.prototype) === объект прототипа конструктора BigInt.prototype { … } (BigInt.prototype)
console.log('------');

console.log(BigInt.__proto__); // объект прототипа конструктора function () (Function.prototype)
console.log(BigInt.__proto__.__proto__); // объект прототипа конструктора Object { … } (Object.prototype)
console.log(BigInt.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(BigInt.__proto__ === bigInt01.__proto__); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора BigInt.prototype { … } (BigInt.prototype)
console.log(BigInt.__proto__ === BigInt.prototype); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора BigInt.prototype { … } (BigInt.prototype)
console.log(BigInt.prototype.__proto__ === Object.prototype); // true, объект прототипа конструктора Object { … } (Object.prototype) === объект прототипа конструктора Object { … } (Object.prototype)
console.log(BigInt.__proto__ === Function.__proto__); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(BigInt.__proto__ === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(' ');

/*--------------------------------*/

console.log('- = = C L A S S E S = = -');
class Class01 { };
console.log(Class01);
console.log(Class01.__proto__); // объект прототипа конструктора function () (Function.prototype), предоставляет методы доступные через прототипное наследование как "Class01.method()"
console.log(Class01.__proto__.constructor); // конструктор function Function() (new Function), предоставляет методы доступные как "Function.method(Class01)"
console.log(Class01.__proto__ === Class01.__proto__.constructor); // false, объект прототипа конструктора function (Function.prototype) () !== конструктор function Function() (new Function)
console.log(Class01.__proto__ === Class01.__proto__.constructor.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(Class01.__proto__ === Function); // false, объект прототипа конструктора function () (Function.prototype) !== конструктор function Function() (new Function)
console.log(Class01.__proto__ === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(Class01.__proto__.constructor === Function); // true, конструктор function Function() (new Function) === конструктор function Function() (new Function)
console.log(Class01.__proto__.constructor.prototype === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log('------');

console.log(Function.__proto__); // объект прототипа конструктора function () (Function.prototype)
console.log(Function.__proto__.__proto__); // объект прототипа конструктора Object { … } (Object.prototype)
console.log(Function.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Function.__proto__ === Class01.__proto__); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(Function.__proto__ === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(Function.prototype.__proto__ === Object.prototype); // true, объект прототипа конструктора Object { … } (Object.prototype) === объект прототипа конструктора Object { … } (Object.prototype)
console.log(' ');

/*--------------------------------*/

console.log('- = = P R O M I S E S = = -');
let promise01 = new Promise(() => { });
console.log(promise01);
console.log(promise01.__proto__); // объект прототипа конструктора Promise.prototype { … } (Promise.prototype), предоставляет методы доступные через прототипное наследование как "promise01.method()"
console.log(promise01.__proto__.constructor); // конструктор function Promise() (new Promise), предоставляет методы доступные как "Promise.method(promise01)"
console.log(promise01.__proto__ === promise01.__proto__.constructor); // false, объект прототипа конструктора Promise.prototype { … } (Promise.prototype) !== конструктор function Promise() (new Promise)
console.log(promise01.__proto__ === promise01.__proto__.constructor.prototype); // true, объект прототипа конструктора Promise.prototype { … } (Promise.prototype) === объект прототипа конструктора Promise.prototype { … } (Promise.prototype)
console.log(promise01.__proto__ === Promise); // false, объект прототипа конструктора Promise.prototype { … } (Promise.prototype) !== конструктор function Promise() (new Promise)
console.log(promise01.__proto__ === Promise.prototype); // true, объект прототипа конструктора Promise.prototype { … } (Promise.prototype) === объект прототипа конструктора Promise.prototype { … } (Promise.prototype)
console.log(promise01.__proto__.constructor === Promise); // true, конструктор function Promise() (new Promise) === конструктор function Promise() (new Promise)
console.log(promise01.__proto__.constructor.prototype === Promise.prototype); // true, объект прототипа конструктора Promise.prototype { … } (Promise.prototype) === объект прототипа конструктора Promise.prototype { … } (Promise.prototype)
console.log('------');

console.log(Promise.__proto__); // объект прототипа конструктора function () (Function.prototype)
console.log(Promise.__proto__.__proto__); // объект прототипа конструктора Object { … } (Object.prototype)
console.log(Promise.__proto__.__proto__.__proto__); // null
console.log('------');

console.log(Promise.__proto__ === promise01.__proto__); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора Promise.prototype { … } (Promise.prototype)
console.log(Promise.__proto__ === Promise.prototype); // false, объект прототипа конструктора function () (Function.prototype) !== объект прототипа конструктора Promise.prototype { … } (Promise.prototype)
console.log(Promise.prototype.__proto__ === Object.prototype); // true, объект прототипа конструктора Object { … } (Object.prototype) === объект прототипа конструктора Object { … } (Object.prototype)
console.log(Promise.__proto__ === Function.__proto__); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(Promise.__proto__ === Function.prototype); // true, объект прототипа конструктора function () (Function.prototype) === объект прототипа конструктора function () (Function.prototype)
console.log(' ');

console.log('01----------------------------------------------------------------------------');
console.log('01----------------------------------------------------------------------------');
console.log('01----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Свойство "__proto___" разных по типу объектов - разные, а свойство "__proto___" одинаковых по типу объектов - 
одинаковые.*/
let obj02 = {};
let obj03 = {};
let number02 = 7;
console.log(obj02.__proto__ === obj03.__proto__); //
console.log(obj02.__proto__ === number02.__proto__); //
console.log(' ');

console.log('02----------------------------------------------------------------------------');
console.log('02----------------------------------------------------------------------------');
console.log('02----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*В JS есть встроенные функции-конструкторы, такие как "Object", "Promise", "Function", "Boolean", "Number", "String",
"Array", "Function". Когда мы создаем новые данные какого-либо типа, то на самом деле где-то вызываются такие
конструкторы. Чтобы понять, что стоит за каким-либо свойством "__proto___", нужно знать с помощью какой 
функции-конструктора или класса были созданы какие-то данные, свойство "__proto___" которых нас интересует.*/
let obj04 = {}
let array05 = [1, 2];
function func02() { };
let obj05 = new func02();
// console.log(obj04.__proto__ === ???); // true
// console.log(array05.__proto__ === ???); // true
// console.log(obj05.__proto__ === ???); // true
console.log(' ');

console.log('03----------------------------------------------------------------------------');
console.log('03----------------------------------------------------------------------------');
console.log('03----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Любой класс или функция имеет свойство "prototype". Каждое свойство "prototype" это независимый объект со свойствами
и методами. Свойство "__proto___" любого объекта ссылается на свойство "prototype" функции-конструктора или класса, при 
помощи которого этот объект был создан. Свойство "__proto___" нужен для того, чтобы объект связался со свойством 
"prototype" своего "завещателя". Свойство "prototype" по умолчанию является объектом с единственным свойством 
"constructor", которое ссылается на саму функцию или класс.*/
console.log(Object.prototype); //
console.log(Promise.prototype); //
console.log(Function.prototype); //
console.log(Boolean.prototype); //
console.log(Number.prototype); //
console.log(String.prototype); //
console.log(Array.prototype); //
console.log(' ');

console.log('04----------------------------------------------------------------------------');
console.log('04----------------------------------------------------------------------------');
console.log('04----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(({}).prototype === ({}).__proto__); //
console.log(({}).prototype); //
console.log(({}).__proto__); //
console.log(' ');

console.log('05----------------------------------------------------------------------------');
console.log('05----------------------------------------------------------------------------');
console.log('05----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

function func03() { console.log(func03.prototype === func03.__proto__) };
func03(); //
console.log(func03.prototype); //
console.log(func03.__proto__); //
console.log(func03.__proto__ === Function.prototype); //
console.log(' ');

console.log('06----------------------------------------------------------------------------');
console.log('06----------------------------------------------------------------------------');
console.log('06----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

function func04() { };
function func05() { };
console.log(func04.__proto__ === func05.__proto__); //
console.log(func04.__proto__ === Function.prototype); //
console.log(func04.prototype === func05.prototype); //
console.log(func04.__proto__); //
console.log(func05.__proto__); //
console.log(func04.prototype); //
console.log(func05.prototype); //
console.log(' ');

console.log('07----------------------------------------------------------------------------');
console.log('07----------------------------------------------------------------------------');
console.log('07----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

let arrowFunc02 = (props) => { return '<div>I know nothing</div>' };
console.log(arrowFunc02.prototype === Object.prototype); //
console.log(arrowFunc02.prototype); //
console.log(arrowFunc02.__proto__ === Function.prototype); //
console.log(arrowFunc02.__proto__); //
console.log(' ');

console.log('08----------------------------------------------------------------------------');
console.log('08----------------------------------------------------------------------------');
console.log('08----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

let number03 = 24;
console.log(number03.prototype === Number.prototype); //
console.log(number03.prototype); //
console.log(number03.__proto__ === Number.prototype); //
console.log(number03.__proto__); //
console.log(' ');

console.log('09----------------------------------------------------------------------------');
console.log('09----------------------------------------------------------------------------');
console.log('09----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

class Class02 { };
console.log(Class02.__proto__ === Function.prototype); //
console.log(Class02.__proto__); //
console.log(Class02.prototype); //
console.log(' ');

console.log('10----------------------------------------------------------------------------');
console.log('10----------------------------------------------------------------------------');
console.log('10----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

function func06() { let d = 0 };
console.log(func06.__proto__ === Function.prototype); //
console.log(func06.__proto__); //
console.log(' ');

console.log('11----------------------------------------------------------------------------');
console.log('11----------------------------------------------------------------------------');
console.log('11----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если мы пытаемся прочитать какое-либо свойство у какого-либо объекта, либо вызвать у него какой-либо метод, и при 
этом указанного свойства или метода у этого объекта нет, то объект будет искать их через свойство "__proto__", то есть 
через ссылку на свойство "prototype" своего родителя. Поэтому при создании функций-конструкторов методы лучше указывать
в их свойстве "prototype".*/
let obj06 = { a: 'abc' };
console.log(obj06.toString()); //
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
obj07.showA(); // 
obj08.showA(); // 
console.log('--1--');

class Class03 {
    constructor(a) { this.a = a };
    showA() { console.log(this.a) };
};

console.log(Class03.prototype); // 
let obj09 = new Class03(0);
let obj10 = new Class03(1);
obj09.showA(); // 
obj10.showA(); // 
console.log('--1--');

console.log(obj09.__proto__); //
console.log(Class03.prototype); //
console.log(obj09.__proto__ === Class03.prototype); //
console.log('--2--');

console.log(obj09.__proto__.__proto__); //
console.log(Class03.prototype.__proto__); //
console.log(obj09.__proto__.__proto__ === Object.prototype); //
console.log(Class03.prototype.__proto__ === Object.prototype); //
console.log('--3--');

console.log(obj09.__proto__.__proto__.__proto__); //
console.log(obj09.__proto__.__proto__.prototype); //
console.log('--4--');

console.log(Class03.prototype.__proto__.__proto__); //
console.log(Class03.prototype.__proto__.prototype); //
console.log('--5--');

console.log(Object.prototype.__proto__); //
console.log(Object.prototype.prototype); //
console.log('--6--');

console.log(obj09.__proto__.__proto__.__proto__ === Object.prototype.__proto__); //
console.log(obj09.__proto__.__proto__.prototype === Object.prototype.prototype); //
console.log(Class03.prototype.__proto__.__proto__ === Object.prototype.__proto__); //
console.log(Class03.prototype.__proto__.prototype === Object.prototype.prototype); //
console.log('--7--');

console.log(Class03.__proto__); //
console.log(Class03.__proto__ === Function.prototype); //
console.log('--8--');

console.log(Class03.__proto__.__proto__); //
console.log(Class03.__proto__.__proto__ === Object.prototype); //
console.log('--9--');

console.log(Class03.__proto__.prototype); //
console.log(Class03.__proto__.prototype === Object.prototype.prototype); //
console.log('--10--');

console.log(obj09.__proto__.constructor); //
console.log(obj09.__proto__.constructor === Class03); //
console.log('--11--');

console.log(obj09.__proto__.constructor.__proto__); //
console.log(Class03.__proto__); //
console.log(obj09.__proto__.constructor.__proto__ === Function.prototype); //
console.log(obj09.__proto__.constructor.__proto__ === Class03.__proto__); //
console.log('--12--');

console.log(obj09.__proto__.constructor.prototype); //
console.log(Class03.prototype); //
console.log(obj09.__proto__.constructor.prototype === Class03.prototype); //
console.log('--13--');

console.log(obj09.__proto__.constructor.prototype.__proto__); //
console.log(Class03.prototype.__proto__); //
console.log(obj09.__proto__.constructor.prototype.__proto__ === Class03.prototype.__proto__); //
console.log(obj09.__proto__.constructor.prototype.__proto__ === Object.prototype); //
console.log('--14--');

console.log(obj09.__proto__.constructor.prototype.__proto__.__proto__); //
console.log(Class03.prototype.__proto__.__proto__); //
console.log(obj09.__proto__.constructor.prototype.__proto__.__proto__ === Class03.prototype.__proto__.__proto__); //
console.log(' ');

console.log('13----------------------------------------------------------------------------');
console.log('13----------------------------------------------------------------------------');
console.log('13----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(Object.__proto__); //
console.log(Promise.__proto__); //
console.log(Function.__proto__); //
console.log(Boolean.__proto__); //
console.log(Number.__proto__); //
console.log(String.__proto__); //
console.log(Array.__proto__); //

console.log(Object.__proto__ === Promise.__proto__); //
console.log(Object.__proto__ === Function.__proto__); //
console.log(Function.__proto__ === Function.prototype); //
console.log(' ');

console.log('14----------------------------------------------------------------------------');
console.log('14----------------------------------------------------------------------------');
console.log('14----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(Object.__proto__.__proto__); //
console.log(Promise.__proto__.__proto__); //
console.log(Function.__proto__.__proto__); //
console.log(Boolean.__proto__.__proto__); //
console.log(Number.__proto__.__proto__); //
console.log(String.__proto__.__proto__); //
console.log(Array.__proto__.__proto__); //
console.log(Object.__proto__.__proto__ === Function.__proto__.__proto__); //
console.log(' ');

console.log('15----------------------------------------------------------------------------');
console.log('15----------------------------------------------------------------------------');
console.log('15----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(Object.prototype.__proto__); //
console.log(Promise.prototype.__proto__); //
console.log(Function.prototype.__proto__); //
console.log(Boolean.prototype.__proto__); //
console.log(Number.prototype.__proto__); //
console.log(String.prototype.__proto__); //
console.log(Array.prototype.__proto__); //
console.log(Function.__proto__.__proto__ === Number.prototype.__proto__); //
console.log(Function.__proto__.__proto__ === Function.__proto__.__proto__); //
console.log(' ');

console.log('16----------------------------------------------------------------------------');
console.log('16----------------------------------------------------------------------------');
console.log('16----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(Object.prototype.prototype); //
console.log(Promise.prototype.prototype); //
console.log(Function.prototype.prototype); //
console.log(Boolean.prototype.prototype); //
console.log(Number.prototype.prototype); //
console.log(String.prototype.prototype); //
console.log(Array.prototype.prototype); //
console.log(' ');

console.log('17----------------------------------------------------------------------------');
console.log('17----------------------------------------------------------------------------');
console.log('17----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/* Свойство "prototype" функций-конструкторов можно модифицировать, чтобы дочерние элементы могли иметь бОльший 
функционал. При помощи метода "Object.create()" можно создавать новые объекты на основе других.*/
// Object.prototype.showB = function () { console.log(`It's B!`) };
// ({}).showB(); //

// let obj11 = {
//     showC: function () { console.log(`It's C!`) }
// };

// let obj12 = Object.create(obj11);
// console.log(obj11); // 
// console.log(obj12); // 
// console.log(obj11 === obj12); // 
// obj12.showC(); // 
// obj12.showB(); //
// console.log(bbb.__proto__); //
// console.log(bbb.__proto__.__proto__); // 
// console.log(' ');

console.log('18----------------------------------------------------------------------------');
console.log('18----------------------------------------------------------------------------');
console.log('18----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Свойство "prototype" это всегда какой-то объект. Свойство "__proto__" может быть объектом, функцией или классом. 
Свойство "__proto__" ссылается на объект, функцию или класс, от которых была создана сущность, у которой было запрошено 
свойство "__proto__".*/
class Class04 { };
class Class05 extends Class04 { };

console.log(Class05.prototype); // 
console.log(Class05.__proto__); // 
console.log(Class04 === Class05.__proto__); //
console.log(Class05 === Class05.prototype.constructor); // 

let obj13 = new Class05();
console.log(obj13.__proto__.constructor === Class05); //
console.log(' ');

console.log('19----------------------------------------------------------------------------');
console.log('19----------------------------------------------------------------------------');
console.log('19----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Классы также работают при помощи прототипов.*/
class Class06 {
    constructor(name) { this.name = name };
    someMethod() { console.log(this.name) };
};

let obj14 = new Class06('obj14');
obj14.someMethod(); //
console.log(obj14); //
console.log(obj14.__proto__); //
console.log(obj14.__proto__.constructor.prototype); //
console.log(' ');

console.log('20----------------------------------------------------------------------------');
console.log('20----------------------------------------------------------------------------');
console.log('20----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(({}).__proto__); //
console.log((1).__proto__); //
console.log(('abc').__proto__); //
console.log((true).__proto__); //
console.log(([1, 2, 3]).__proto__); //
console.log((function () { }).__proto__); //
console.log((new Promise(() => { })).__proto__); //
console.log(' ');

console.log('21----------------------------------------------------------------------------');
console.log('21----------------------------------------------------------------------------');
console.log('21----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(({}).__proto__.constructor === Object); //
console.log((1).__proto__.constructor === Number); //
console.log(('abc').__proto__.constructor === String); //
console.log((true).__proto__.constructor === Boolean); //
console.log(([1, 2, 3]).__proto__.constructor === Array); //
console.log((function () { }).__proto__.constructor === Function); //
console.log((new Promise(() => { })).__proto__.constructor === Promise); //
console.log(' ');

console.log('22----------------------------------------------------------------------------');
console.log('22----------------------------------------------------------------------------');
console.log('22----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(({}).__proto__ === Object); //
console.log((1).__proto__ === Number); //
console.log(('abc').__proto__ === String); //
console.log((true).__proto__ === Boolean); //
console.log(([1, 2, 3]).__proto__ === Array); //
console.log((function () { }).__proto__ === Function); //
console.log((new Promise(() => { })).__proto__ === Promise); //
console.log(' ');

console.log('23----------------------------------------------------------------------------');
console.log('23----------------------------------------------------------------------------');
console.log('23----------------------------------------------------------------------------');
console.log(' ');

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(({}).__proto__ === Object.prototype); //
console.log((1).__proto__ === Number.prototype); //
console.log(('abc').__proto__ === String.prototype); //
console.log((true).__proto__ === Boolean.prototype); //
console.log(([1, 2, 3]).__proto__ === Array.prototype); //
console.log((function () { }).__proto__ === Function.prototype); //
console.log((new Promise(() => { })).__proto__ === Promise.prototype); // 