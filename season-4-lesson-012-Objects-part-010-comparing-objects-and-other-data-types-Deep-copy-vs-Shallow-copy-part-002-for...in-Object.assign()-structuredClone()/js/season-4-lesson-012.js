'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

let obj1 = {};
let obj2 = {a: 1};
obj1[obj2] = 2;
/*Приведение объекта к строке всегда приводит к строке "[object Object]".*/
console.log(obj1); // {"[object Object]": 2}

/*Для таких сравнений, как, например, ">", или для сравнений с примитивом объекты преобразуются в примитивы.*/
console.log(obj1 > obj2); // false, идет преобразование к строке
console.log(obj1 >= obj2); // true, идет преобразование к строке
console.log(obj1 == obj2); // false, объекты сравниваются по ссылке
console.log(obj1 === obj2); // false, объекты сравниваются по ссылке
console.log(obj1 == 5); // false, идет преобразование к строке
console.log(obj1 == '[object Object]'); // true, идет преобразование к строке

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Клонирование объекта при помощи "for...in".*/
let user = {
    name: 'John',
    age: 30
};

let clone = {};
for (let key in user) {
    clone[key] = user[key]
}

console.log(clone);

clone.name = 'Pete';

console.log(user.name); // "John"
console.log(clone.name); // "Pete"

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Клонирование объекта при помощи метода "Object.assign()".*/
let obj3 = {c: 3};
let obj4 = {d: 4};
let obj5 = {e: 5};

let obj6 = Object.assign(obj3, obj4, obj5);

console.log(obj3);
console.log(obj6);
console.log(obj3 === obj6);

/*Если скопированное имя свойства уже существует, оно будет перезаписано.*/
let obj7 = {c: 4};

Object.assign(obj3, obj7);
console.log(obj3); // c: 4

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

let obj8 = {
    a: 1,
    b: {f: 5},
    c: [23]
};

let obj9 = Object.assign({}, obj8);

console.log(obj9);

obj9.a++;
obj9.b.f--;
obj9.c.pop();

console.log(obj9); // c: []
/*Ссылочные типы данных в свойствах тоже копируются по ссылке. Такое копирование свойств называется поверхностным.*/
console.log(obj8); // c: []

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Клонирование объекта при помощи метода "structuredClone()".*/

let obj10 = {
    a: 1,
    b: {
        g: 8
    }
};

obj10.itself = obj10;
console.log(obj10);

/*Метод делает глубокое копирование, то есть копирует ссылочные типы данных в свойствах по значению.*/
let obj11 = structuredClone(obj10);
console.log(obj11);

console.log(obj11 === obj10); // false
console.log(obj11.a === obj10.a); // true 
console.log(obj11.b === obj10.b); // false
console.log(obj11.itself === obj10.itself); // false
console.log(obj11.itself === obj11); // true
console.log(obj11.itself === obj10); // false