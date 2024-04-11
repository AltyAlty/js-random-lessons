'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*JSON (JavaScript Object Notation) – это общий формат для представления значений и объектов. Его описание 
задокументировано в стандарте RFC 4627.*/

/*JavaScript предоставляет методы:
1) "JSON.stringify()" для преобразования объектов в JSON.
2) "JSON.parse()" для преобразования JSON обратно в объект.*/

let obj01 = {
    a: 'a',
    b: 2,
    c: false,
    d: ['x', 'y', 'z'],
    e: null
};

/*Метод "JSON.stringify()" берет объект и преобразует его в строку. Полученная строка json называется 
JSON-форматированным или сериализованным объектом. Мы можем отправить его по сети или поместить в обычное хранилище 
данных. Объект в формате JSON для строк и для имен свойств используют двойные кавычки.*/
console.log(JSON.stringify(obj01)); // "{"a":"a","b":2,"c":false,"d":["x","y","z"],"e":null}"
console.log(typeof JSON.stringify(obj01)); // string

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*JSON поддерживает следующие типы данных:
1) Объекты.
2) Массивы.
3) Примитивы:
    a) строки,
    b) числа,
    c) логические значения true/false,
    d) null.*/

console.log(JSON.stringify(['a', 'v', 'V']));
console.log(JSON.stringify('rock'));
console.log(JSON.stringify(315));
console.log(JSON.stringify(false));
console.log(JSON.stringify(null));

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*"JSON.stringify()" пропускает некоторые специфические свойства объектов JavaScript:

1) Свойства-функции (методы).
2) Символьные ключи и значения.
3) Свойства, содержащие undefined.*/

let symbol01 = Symbol('b');

let obj02 = {
    a: function () { },
    [symbol01]: 2,
    c: undefined
};

/*Форматы, которые не поддерживает JSON, возвращают undefined.*/
console.log(JSON.stringify(function () { })); // undefined
console.log(JSON.stringify(symbol01)); // undefined

console.log(JSON.stringify(obj02)); // {}

console.log(JSON.stringify(obj02.a)); // undefined
console.log(JSON.stringify(obj02[symbol01])); // 2
console.log(JSON.stringify(obj02.c)); // undefined
console.log(JSON.stringify(undefined)); // undefined

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Вложенные объекты поддерживаются и конвертируются автоматически.*/
let obj03 = {
    a: 1,
    b: {
        c: 2,
        d: [3, 4, 5]
    }
};

console.log(JSON.stringify(obj03)); // {"a":1,"b":{"c":2,"d":[3,4,5]}}

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*При преобразовании в JSON не должно быть циклических ссылок.*/
let obj04 = { a: 1 };
let obj05 = { b: 2 };
obj04.c = obj05;
obj05.d = obj04;

console.log(obj04);
console.log(obj05);
// console.log(JSON.stringify(obj04)); // Uncaught TypeError: cyclic object value
// console.log(JSON.stringify(obj05)); // Uncaught TypeError: cyclic object value
