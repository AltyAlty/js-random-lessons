'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

let obj1 = {
    a: 1,
    func: function () {
        console.log(this);
        console.log('--------------------------------------');
    }
};

setTimeout(obj1.func, 1000); // Window, отдали просто "чертеж" функции.

/*Стрелочная функция тоже вызовется через Window, но внутренний код уже будет работать с "obj1".*/
setTimeout(() => {
    console.log(this); // Window
    obj1.func(); // { a: 1 ...}
    console.log('--------------------------------------');
}, 1200);

/*Анонимная функция тоже вызовется через Window, но внутренний код уже будет работать с "obj1".*/
setTimeout(function () {
    console.log(this); // Window
    obj1.func(); // { a: 1 ...}
    console.log('--------------------------------------');
}, 1400);

function doSmth() {
    console.log(this); // Window

    let func = () => {
        console.log(this); // Window
        obj1.func(); // { a: 1 ...}
        console.log('--------------------------------------');
    };

    func();
};

/*Функции "doSmth()" и "func()" тоже вызовется через Window, но внутренний код уже будет работать с "obj1".*/
setTimeout(doSmth, 1600);