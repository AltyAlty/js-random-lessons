'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Оператор "instanceof" возращает true если объект является экземпляром какого-то класса или функции-конструктора.*/
class Class01 { };
let obj01 = new Class01();
// obj01 -> Class01.prototype -> Object.prototype -> null
console.log(obj01 instanceof Class01); // true
console.log(obj01 instanceof Object); // true
console.log(' ');

function constructor01() { };
let obj02 = new constructor01();
console.log(obj02 instanceof constructor01); // true
console.log(' ');

/*Обычно оператор "instanceof" просматривает для проверки цепочку прототипов. Но это поведение может быть изменено 
при помощи статического метода "Symbol.hasInstance". Алгоритм работы оператора "instanceof" работает примерно так:

1) Если имеется статический метод "Symbol.hasInstance", тогда вызвать его: "Class[Symbol.hasInstance](obj)". Он 
должен вернуть либо true, либо false, и это конец.

2) Большая часть классов не имеет метода "Symbol.hasInstance". В этом случае используется стандартная логика: 
проверяется, равен ли Class.prototype одному из объектов-прототипов в прототипной цепочке экземпляра данных.*/
let arr01 = [];
console.log(arr01 instanceof Array); // true
console.log(arr01 instanceof Object); // true
console.log(' ');

class Class02 {
    static [Symbol.hasInstance](obj) {
        if (obj.a) return true;
    };
};

let obj03 = { a: 1 };
console.log(obj03 instanceof Class02); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Есть метод "objA.isPrototypeOf(objB)", который возвращает true, если объект "objA" есть где-то в прототипной цепочке 
объекта "objB". Так что "obj instanceof Class" можно перефразировать как "Class.prototype.isPrototypeOf(obj)".*/
let obj04 = {}
let obj05 = { __proto__: obj04 };
console.log(obj04.isPrototypeOf(obj05)); // true
console.log(Object.prototype.isPrototypeOf(obj05)); // true
console.log(obj05 instanceof Object); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*У метода объектов "toString()" имеются скрытые возможности, которые делают этот метод гораздо более мощным. Мы можем 
использовать его как расширенную версию "typeof" и как альтернативу "instanceof".*/
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(Object.prototype.toString.call(1)); // "[object Number]"
console.log(Object.prototype.toString.call('abc')); // "[object String]"
console.log(Object.prototype.toString.call(true)); // "[object Boolean]"
console.log(Object.prototype.toString.call(null)); // "[object Null]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call(BigInt(5))); // "[object BigInt]"
console.log(Object.prototype.toString.call(function () { })); // "[object Function]"
console.log(' ');

/*Поведение метода объектов "toString()" можно настраивать, используя специальное свойство объекта 
"Symbol.toStringTag".*/
let obj06 = { [Symbol.toStringTag]: 'Obj06' };
console.log(Object.prototype.toString.call(obj06)); // "[object Obj06]"
console.log(' ');

/*Такое свойство есть у большей части объектов, специфичных для определенных окружений.*/
console.log(window[Symbol.toStringTag]); // "Window"
console.log(XMLHttpRequest.prototype[Symbol.toStringTag]); // "XMLHttpRequest"

console.log(Object.prototype.toString.call(window)); // "[object Window]"
console.log(Object.prototype.toString.call(new XMLHttpRequest())); // "[object XMLHttpRequest]"

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Оператор "instanceof" не учитывает саму функцию при проверке, а только свойство "prototype", которое проверяется на 
совпадения в прототипной цепочке. В примере ниже прототипная цепочка объекта "obj07" будет выглядеть так:
obj07 -> constructor02.prototype -> Object.prototype -> null. Каждый элемент этой цепочки сравнивается с 
"constructor03.prototype", и в какой-то момент "constructor02.prototype === constructor03.prototype" вернет true.*/
function constructor02() { };
function constructor03() { };
constructor02.prototype = constructor03.prototype = {};

let obj07 = new constructor02();
console.log(obj07 instanceof constructor03); // true