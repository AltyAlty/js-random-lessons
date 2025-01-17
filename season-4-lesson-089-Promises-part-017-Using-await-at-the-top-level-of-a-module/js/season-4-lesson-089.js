'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*На самом верхнем уровне области видимости в модулях! ключевое слово "await" работает без асинхронных функций.*/
let promise01 = await new Promise((resolve) => { setTimeout(() => { resolve('a') }, 1000) })
    .then(console.log);

console.log(4);

let promise02 = await new Promise((resolve) => { setTimeout(() => { resolve('b') }, 1000) })
    .then(console.log);

console.log(5);

let promise03 = await new Promise((resolve) => { setTimeout(() => { resolve('c') }, 1000) })
    .then(console.log);

console.log(6);