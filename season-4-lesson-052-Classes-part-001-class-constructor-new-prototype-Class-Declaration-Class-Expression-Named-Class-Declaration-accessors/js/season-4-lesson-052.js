'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*В объектно-ориентированном программировании класс - это расширяемый шаблон кода для создания объектов, который 
устанавливает в них начальные значения (свойства) и реализацию поведения (методы).*/

/*Пример функции-конструктора.*/
function Constructor01(a, b) { // Часть #1, создание начальных свойств объектов
    this.a = a;
    this.b = b;
    // this.method01 = function (c) { console.log(c) }; // Часть #2, реализация методов объектов (в экземплярах данных)
};

Constructor01.prototype.method01 = function (c) { console.log(c) }; // Часть #2, реализация методов объектов (в объекте-прототипе)
Constructor01.prototype.d = 5; // Часть #2, реализация свойств объектов (в объекте-прототипе)

let obj01 = new Constructor01(1, 2);
let obj02 = new Constructor01(3, 4);
console.log(obj01); // Object { a: 1, b: 2 }
console.log(obj02); // Object { a: 3, b: 4 }
obj01.method01(666); // 666
obj02.method01(777); // 777
console.log(Object.getOwnPropertyNames(Constructor01.prototype)); // Array(3) [ "constructor", "method01", "d" ]
console.log(' ');

/*Пример класса. Функция "constructor()" создает начальные свойства объектов. Другие функции являются реализацией 
методов созданных объектов в объекте-прототипе, которые будут им доступны через прототипное наследование, то есть будут 
находиться в свойстве "Class01.prototype". Остальные идентификаторы будут добавлены оператором "new" как свойства 
созданных объектов до запуска функции "constructor()".*/
class Class01 {
    constructor(a, b) { // Аналог части #1
        this.a = a;
        this.b = b;
    };

    method01(c) { console.log(c) }; // Аналог части #2

    // let a = 1 // Uncaught SyntaxError: unexpected token: identifier
    // var a = 1; // Uncaught SyntaxError: unexpected token: identifier

    /*Свойство "d" не устанавливается в свойства "Class01.prototype". Вместо этого оно создается оператором "new" 
    перед запуском функции "constructor()", то есть "d" будет свойством созданных объектов.*/
    d = 5;
};

let obj03 = new Class01(1, 2);
let obj04 = new Class01(3, 4);
console.log(obj03); // Object { d: 5, a: 1, b: 2 }
console.log(obj04); // Object { d: 5, a: 3, b: 4 }
obj03.method01(666); // 666
obj04.method01(777); // 777
console.log(' ');

/*В JavaScript класс – это разновидность функции. Вот что делает конструкция "class Class01 {...}":
1) Создает функцию с именем "Class01", которая становится результатом объявления класса. Код функции берется из функции 
"constructor()" (она будет пустой, если такой функции указано не было).
2) Сохраняет все методы, такие как "method01", в свойстве "Class01.prototype", то есть в объекте-прототипе.*/
console.log(typeof Class01); // function
console.log(Class01 === Class01.prototype.constructor); // true
console.log(Class01.prototype.method01); // function method01(c)
console.log(Object.getOwnPropertyNames(Class01.prototype)); // Array [ "constructor", "method01" ]

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Функция, созданная с помощью ключевого слова "class", помечена специальным внутренним свойством 
"[[IsClassConstructor]]: true". В отличие от обычных функций, конструктор класса не может быть вызван без ключевого 
слова "new".*/
class Class02 {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    };

    method01(c) { console.log(c) };
};
// let obj05 = Class02(); // Uncaught TypeError: class constructors must be invoked with 'new'
let obj05 = new Class02();

/*Методы класса являются неперечислимыми. Определение класса устанавливает флаг "enumerable" в false для всех методов 
в свойстве "prototype". Если мы проходимся циклом "for..in" по объекту, то мы не увидим методов класса.*/
for (const key in obj05) {
    console.log(key); // "a" -> "b"
};

/*Классы всегда используют "use strict". Весь код внутри класса автоматически находится в строгом режиме.*/

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Class Declaration.*/
class Class03 { };

/*Class Expression.*/
let Class04 = class { };

/*Named Class Expression.*/
let Class05 = class hiddenClass05 { };

/*-------------------------------------------------------------------------------------------------------------------*/

/*У классов помимо конструктора и методов, можно также указать свойства-аксессоры.*/
class Class06 {
    /*Здесь будет вызван сеттер.*/
    constructor(a) { this.a = a };

    get a() { return this._a };

    set a(value) {
        if (value < 24) {
            console.log('wrong number!');
        } else {
            this._a = value;
        };
    };
};

let obj06 = new Class06(37);
console.log(obj06); // Object { _a: 37 }
console.log(obj06.a); // 37
obj06.a = 20; // "wrong number!"
obj06.a = 26;
console.log(obj06); // Object { _a: 26 }
console.log(obj06.a); // 26
console.log(' ');

let obj07 = new Class06(22);
console.log(obj07); // Object {  }
console.log(obj07.__proto__.constructor); // class Class06 { constructor(a) }
console.log(' ');

/*Также в классе можно указывать вычисляемые свойства.*/
class Class07 {
    ['a' + 'b']() { // "ab"
        console.log('abc');
    };
};

console.log(Class07.prototype.ab); // function ab()