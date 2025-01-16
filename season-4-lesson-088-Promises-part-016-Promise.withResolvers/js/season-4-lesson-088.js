'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*При создании промиса его функции "resolve()" и "reject()" можно сохранить во внешние переменные и использовать их
позднее.*/
let resolve01, reject01;

let promise01 = new Promise((resolve, reject) => {
    resolve01 = resolve;
    reject01 = reject;
});

promise01
    .then(() => {
        console.log('promise01 has been resolved');
    });

setTimeout(() => { resolve01(); }, 1000);

/*Метод "Promise.withResolvers()" позволяет сделать тоже самое, только более удобным способом.*/
let { promise: promise02, resolve: resolve02, reject: reject02 } = Promise.withResolvers();

console.log(promise02);
console.log(resolve02);
console.log(reject02);

promise02
    .then(() => {
        console.log('promise02 has been resolved');
    });

setTimeout(() => { resolve02(); }, 2000);