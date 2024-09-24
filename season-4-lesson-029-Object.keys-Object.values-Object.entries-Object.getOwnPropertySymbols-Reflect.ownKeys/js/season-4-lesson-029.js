'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Поскольку массивы являются итерируемыми, то это означает, что мы можем использовать для них методы "keys()", 
"values()", "entries()".*/

let arr01 = ['a', 'b', 'c'];

for (const key of arr01.keys()) {
    console.log(key); // 0 -> 1 -> 2
}

for (const value of arr01.values()) {
    console.log(value); // 'a' -> 'b' -> 'c'
}

for (const entry of arr01.entries()) {
    console.log(entry); // Array [ 0, "a" ] -> Array [ 1, "b" ] -> Array [ 2, "c" ]
}

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Для простых объектов доступны следующие методы:
1) "Object.keys(obj)" – возвращает массив ключей.
2) "Object.values(obj)" – возвращает массив значений.
3) "Object.entries(obj)" – возвращает массив пар [ключ, значение].*/
let obj01 = {a: 10, b: 20, c: 30};

console.log(Object.keys(obj01)); // [ 'a', 'b', 'c' ]
console.log(Object.values(obj01)); // [ 10, 20, 30 ]
console.log(Object.entries(obj01)); // [ [ "a", 10 ], [ "b", 20 ], [ "c", 30 ] ] []{]())()}

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*"Object.keys()", "Object.values()" и "Object.entries()" игнорируют символьные свойства, так же, как и цикл 
"for..in".*/
let symbol01 = Symbol('a');
let obj02 = {b: 2};
obj02[symbol01] = 1;
console.log(obj02); // { b: 2, Symbol("a"): 1 }

for (const key in obj02) {
    console.log(obj02[key]); // 2
}

console.log(Object.keys(obj02)); // [ "b" ]
console.log(Object.values(obj02)); // [ 2 ]
console.log(Object.entries(obj02)); // [ [ "b", 2 ] ]

/*Но если требуется учитывать и символьные ключи, то для этого существует отдельный метод 
"Object.getOwnPropertySymbols()", возвращающий массив только символьных ключей. Также, существует метод 
"Reflect.ownKeys(obj)", который возвращает все ключи.*/

console.log(Object.getOwnPropertySymbols(obj02)); // Array [ Symbol("a") ]
console.log(Reflect.ownKeys(obj02)); // Array [ "b", Symbol("a") ]

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

let obj03 = {
    a: 1,
    b: 2,
    c: 3
};

console.log(Object.entries(obj03));

let doubleObj03 = Object.fromEntries(
    Object.entries(obj03) // Получим массив массивов: [ [ "a", 1 ], [ "b", 2 ], [ "c", 3 ] ]
        .map(
            /*Первый параметр будет элементом, но мы его рассмотрим как массив двух значений, где первое значение
            будет лежать в "key", а второй в "value".*/
            ([key, value]) => [key, value * 2]
        ) // Получим массив массивов: [ [ "a", 2 ], [ "b", 4 ], [ "c", 6 ] ]
);

console.log(doubleObj03.c); // 6