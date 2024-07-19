'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Свойство "__proto__" считается устаревшим, и по стандарту оно должно поддерживаться только браузерами.

Современные методы работы с прототипами:
1) "Object.create(proto[, descriptors])" – создает пустой объект со свойством "[[Prototype]]", указанным как "proto", и 
необязательными дескрипторами свойств "descriptors".
2) "Object.getPrototypeOf(obj)" – возвращает свойство "[[Prototype]]" объекта "obj".
3) "Object.setPrototypeOf(obj, proto)" – устанавливает свойство "[[Prototype]]" объекта "obj" как "proto".*/
let obj01 = { a: 1 };

let obj02 = Object.create(obj01, {
    b: {
        value: 2,
        writable: true,
        enumerable: true,
        configurable: true
    }
});

console.log(obj02); // Object { b: 2 }
console.log(Object.getPrototypeOf(obj02)); // Object { a: 1 }
let obj03 = { c: 3 };
Object.setPrototypeOf(obj02, obj03)
console.log(Object.getPrototypeOf(obj02)); // Object { c: 3 }

/*Также можно использовать метод "Object.create()" для продвинутого клонирования объекта, более мощного, чем 
копирование свойств в цикле "for..in".*/
let obj04 = Object.create(Object.getPrototypeOf(obj02), Object.getOwnPropertyDescriptors(obj02));
console.log(obj04); // { b: 2 }
console.log(Object.getPrototypeOf(obj04)); // Object { c: 3 }

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Технически мы можем установить/получить свойство "[[Prototype]]" в любое время. Но обычно мы устанавливаем 
объект-прототип только один раз во время создания объекта, а после уже не меняем. И JavaScript движки хорошо 
оптимизированы для этого. Изменение объекта-прототипа "на лету" с помощью метода "Object.setPrototypeOf()" или 
"obj.__proto__" является очень медленной операцией, которая ломает внутренние оптимизации для операций доступа к 
свойствам объекта.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Свойство "__proto__" особенное: оно должно быть либо объектом, либо null, а, например, строка не может стать 
прототипом. Скорее всего, когда вызывается сеттер в "[[Prototype]]" в самом начале идет проверка является ли 
полученный параметром объектом или null, и если нет, то операции записи не происходит.*/
let obj05 = {};
console.log(obj05['__proto__']); // конструктор Object { … }
console.log(obj05.__proto__); // конструктор Object { … }
console.log(' ');

obj05['__proto__'] = 'some value';
console.log(obj05); // Object {  }
console.log(obj05['__proto__']); // конструктор Object { … }
console.log(obj05.__proto__); // конструктор Object { … }
console.log(obj05['__proto__'] === Object.prototype); // true
console.log(' ');

/*Чтобы изменить указанное поведение, можно создать объект через метод "Object.create()" и в качестве объекта-прототипа 
указать null. Таким образом не будет унаследованного геттера/сеттера для свойства "__proto__". Теперь это свойство 
обрабатывается как обычное свойство, и приведенный выше пример работает "правильно". Мы можем назвать такой объект 
"простейшим" или "чистым словарным объектом", потому что он еще проще, чем обычные объекты. Недостаток в том, что у 
таких объектов не будет встроенных методов объекта.*/
let obj06 = Object.create(null); // {}
obj06['__proto__'] = 'some value';
console.log(obj06); // Object { __proto__: "some value" }
console.log(obj06['__proto__']); // "some value"
console.log(obj06.__proto__); // "some value"
console.log(obj06['__proto__'] === Object.prototype); // false

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Пример, как не потерять изначальный конструктор при использовании метода "Object.setPrototypeOf()".*/
function Constructor01(a) { this.a = a };
let obj07 = new Constructor01(1);

let obj08 = {
    b: 2,
    constructor: Constructor01
};

Object.setPrototypeOf(obj07, obj08);
console.log(obj07.__proto__.constructor); // function Constructor01(a)

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "Object.getOwnPropertyNames()" возвращает массив всех собственных строковых ключей.*/
let d = Symbol('d')
let obj09 = { a: 1, b: 2, c: 3 };
obj09[d] = 4;
console.log(Object.getOwnPropertyNames(obj09)); // [ "a", "b", "c" ]