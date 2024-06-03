'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если создать объект при помощи какой-то функции, которая возвращает объект с методом в виде анонимной функции, и
вызвать из полученного объекта этот метод, то если его контекст вызова будет ссылаться на window, то при 'use strict'
он будет ссылаться на "undefined".*/
function returnObjectWithArrowFunction() {
    return {
        ArrowFunction: () => {
            console.log(this); // undefined
            console.log(this.x); // Uncaught TypeError: this is undefined
        }
    }
};

let obj1 = returnObjectWithArrowFunction();
// obj1.ArrowFunction(); // Uncaught TypeError: this is undefined

/*-------------------------------------------------------------------------------------------------------------------*/

/*Как перебрать двоичную матрицу при помощи одного цикла "for".*/
const x1 = 0;
const y1 = 0;
const x2 = 24;
const y2 = 400;

for (let i = 0; i < (x2 - x1) * (y2 - y1); i++) {
    const x = i % (x2);
    const y = Math.floor(i / x2);
    console.log(`Координаты: (${x}, ${y})`);
};