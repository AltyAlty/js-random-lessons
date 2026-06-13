'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

/*Ключевое слово await всегда:
1. Приостанавливает дальнейшее синхронное выполнение текущей async-функции и "оборачивает в callback-функцию" весь код 
внутри этой async-функции, идущий после этого ключевого слова await до ближайшего ключевого слова await или return.
2. Приводит значение справа к промису через вызов метода "Promise.resolve(value)".
2.1 Если "value" это значение отличное от промиса, то будет создан новый промис в состоянии fulfilled, содержащий внутри
это значение.
2.2 Если "value" это промис, то будет использован этот промис.
2.3 Если "value" это промис от async-функции, то будет использован этот промис.
3. Вешает then-обработчик на промис.
4. Указывает в then-обработчике созданную callback-функцию в качестве параметра.

Когда промис перейдет в состояние settled, то then-обработчик добавит микрозадачу с продолжение работы функции в очередь 
микрозадач. Продолжение работы функции будет происходит, когда будет выполняться эта микрозадача.

В консоли будет: 3 4 6 7 9 10 5 8 1 2*/
setTimeout(() => { console.log('1') }, 0);
setTimeout(() => { console.log('2') }, 1000);

new Promise(function (res, rej) {
    console.log('3');
    res();
    console.log('4');
})
    .then(() => console.log('5'));

console.log('6');

async function func_01() {
    console.log('7');
    await func_02(); // new Promise(function (resolve, reject) { resolve(func_02()) }).then(() => { console.log('8') });
    // await new Promise(function (resolve, reject) { console.log('9'); resolve(); }); // .then(() => { console.log('8') });
    // await new Promise(function (resolve, reject) { console.log('9'); reject(); }).catch(() => { }); // .then(() => { console.log('8') });
    // await undefined; // new Promise(function (resolve, reject) { resolve(undefined) }).then(() => { console.log('8') });
    console.log('8');
};

async function func_02() { console.log('9') };
func_01();
console.log('10');