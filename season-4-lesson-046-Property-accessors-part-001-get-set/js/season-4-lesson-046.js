'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Есть два типа свойств объекта. Первый тип это свойства-данные (data properties). Второй тип свойств это 
свойства-аксессоры (accessor properties). По своей сути это функции, которые используются для присвоения и получения 
значения, но во внешнем коде они выглядят как обычные свойства объекта.*/

/*Свойства-аксессоры представлены методами: "геттер" – для чтения и "сеттер" – для записи. При литеральном объявлении 
объекта они обозначаются "get" и "set". Геттер срабатывает, когда "obj.propName" читается, сеттер – когда значение 
присваивается.*/
let obj = {
    get propName() {
        // геттер, срабатывает при чтении obj.propName
    },

    set propName(value) {
        // сеттер, срабатывает при записи obj.propName = value
    }
};

let obj01 = {
    a: 'a',
    b: 'b',

    get ab() {
        return `${this.a} ${this.b}`;
    },

    set ab(value) {
        [this.a, this.b] = value.split(' ');
    }
};

console.log(obj01.ab); // "a b"
obj01.ab = 'c d';
console.log(obj01.a); // "c"
console.log(obj01.b); // "d"
console.log(obj01.ab); // "c d"

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если нет сеттера, то при попытке изменить свойство будет ошибка.*/
let obj02 = {
    a: 1,
    b: 2,

    get ab() {
        return `${this.a} ${this.b}`;
    }
};

console.log(obj02.ab);
// obj02.ab = '3 4'; // Uncaught TypeError: setting getter-only property "ab"

/*Если нет геттера, то при попытке получить свойство будет undefined.*/
let obj03 = {
    a: 5,
    b: 6,

    set ab(value) {
        [this.a, this.b] = value.split(' ');
    }
};

console.log(obj03.ab); // undefined
obj03.ab = '7 8';
console.log(obj03.a); // 7
console.log(obj03.b); // 8

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

let obj04 = {
    _a: 3,

    get a() {
        return this._a;
    },

    set a(value) {
        this._a = value * 2 + 1;
    }
};

obj04.aa++; // 3 + 1 => 4 * 2 => 8 + 1 => 9
console.log(obj04.aa); // 9

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Свойства-аксессоры не имеют "value" и "writable", но взамен предлагают функции "get" и "set".
То есть, дескриптор аксессора может иметь:
1) "get" – функция без аргументов, которая сработает при чтении свойства
2) "set" – функция, принимающая один аргумент, вызываемая при присвоении свойства
3) "enumerable" – то же самое, что и для свойств-данных,
4) "configurable" – то же самое, что и для свойств-данных.

При попытке указать и "get", и "value" в одном дескрипторе будет ошибка.*/
let obj05 = {
    a: 2,
    b: 3
};

Object.defineProperty(obj05, 'ab', {
    get() {
        return `${this.a} ${this.b}`;
    },

    set(value) {
        [this.a, this.b] = value.split(' ');
    },

    // value: 4 // Uncaught TypeError: property descriptors must not specify a value or be writable when a getter or setter has been specified
});

console.log(obj05.ab); // "2 3"

for (const key in obj05) {
    console.log(key); // "a" => "b"
};

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Геттеры и сеттеры можно использовать как обертки над реальными значениями свойств, чтобы получить больше контроля 
над операциями с ними. Технически, внешний код все еще может получить доступ к имени напрямую с помощью obj06._age, но 
существует широко известное соглашение о том, что свойства, которые начинаются с символа "_", являются внутренними, и 
к ним не следует обращаться из-за пределов объекта.*/
let obj06 = {
    _age: 24,

    get age() {
        return `age is ${this._age}`;
    },

    set age(a) {
        if (a >= 24) {
            this._age = a;
        } else {
            console.log('should be >= 24');
        };
    }
};

obj06.age = 65;
console.log(obj06.age); // "age is 65"
obj06.age = 22; // "should be >= 24"
console.log(obj06.age); // "age is 65"

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

{
    let a = 3;
    let b = 4;

    let obj07 = {
        a: 1,
        b: 2,
        // c: a + b, // 7
        // c: obj07.a + obj07.b, // Uncaught ReferenceError: can't access lexical declaration 'obj07' before initialization
        // c: this.a + this.b, // NaN (undefined + undefined?)
        // calcuateC: () => { obj07.c = obj07.a + obj07.b },

        get c() {
            return this.a + this.b; // 3
        },
    };

    // obj07.calcuateC();
    // console.log(obj07.c); // 3

    console.log(obj07.c); // 3
    console.log(undefined + undefined); // NaN
}