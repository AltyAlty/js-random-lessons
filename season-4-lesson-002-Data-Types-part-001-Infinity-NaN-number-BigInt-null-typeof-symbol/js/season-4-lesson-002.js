'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Infinity это математическая бесконечность "∞".*/

console.log(1 / 0); // Infinity
console.log(Infinity); // Infinity

/*NaN означает ошибку вычисления.*/

console.log('string' / 2); // NaN
console.log(NaN); // NaN
console.log(NaN ** 0); // 1, "**" - возведение в степень

/*-------------------------------------------------------------------------------------------------------------------*/

/*В JavaScript тип "number" не может безопасно работать с числами, большими, чем (2 в степени 53 -1) (т. е. 
9007199254740991) или меньшими, чем -(2 в степение 53 -1) для отрицательных чисел.*/

/*Тип "BigInt", дает возможность работать с целыми числами произвольной длины. Чтобы создать значение типа 
"BigInt", необходимо добавить "n" в конец числового литерала.*/

let bigInt = 1234567890123456789012345678901234567890n;
console.log(++bigInt);

/*-------------------------------------------------------------------------------------------------------------------*/

/*В JavaScript "null" не является "ссылкой на несуществующий объект" или "нулевым указателем", как в некоторых 
других языках. Это просто специальное значение, которое представляет собой "ничего", "пусто" или "значение 
неизвестно".*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "typeof()" может определить тип данных.*/

console.log(typeof (null)); // object - Официально признанная ошибка.

/*-------------------------------------------------------------------------------------------------------------------*/

/*Тип "symbol" (символ) используется для создания уникальных идентификаторов в объектах.*/