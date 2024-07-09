'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Стрелочные функции нельзя использовать с new, так как у них нет this.*/
let arrowConstructor = (a, b) => {
    this.a = a;
    let c = b;
};

// let obj01 = new arrowConstructor(); // Uncaught TypeError: arrowConstructor is not a constructor

let obj02 = {
    a: 'A',
    numbers: [1, 2, 3],

    do() {
        this.numbers.forEach(
            // this будет браться не у себя, а у метода obj02.do в момент вызова.
            number => console.log(this.a + ': ' + number)

            // Здесь this был бы undefined, поэтому получили бы ошибку: Uncaught TypeError: this is undefined
            // function (student) { console.log(this.a + ': ' + number) }
        );
    }
};

obj02.do();

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*При использовании стрелочной функции с методами "bind()", "call()" и "apply" this не привязывается.*/
let func01 = () => {
    console.log(this);
};

let func02 = func01.bind({ a: 1 });
func02(); // Window
func01.call({ a: 1 }); // Window
func01.apply({ a: 1 }); // Window

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Поскольку у стрелочных функций также нет переменной "arguments", то это отлично подходит для декораторов, когда нам 
нужно пробросить вызов с текущими this и "arguments".*/

/*Эта функция принимает функцию и возвращает обертку над ней, которая откладывает вызов.*/
function defer(func, delay) {
    // "func": функция (a) { console.log(a) }
    // "delay": 1000 
    return function () {
        setTimeout(
            // Своего this у стрелочной функции нет, поэтому возьмется this из вызванной функции-обертки
            // this: undefined (без "use sctrict" был бы Window)
            // Своего "arguments" у стрелочной функции нет, поэтому возьмется "arguments" из вызванной функции-обертки
            // "arguments": 123
            () => func.apply(this, arguments),
            delay)
    };

    /*То же самое без стрелочной функции выглядело бы так.*/
    return function (...args) {
        // Сохраняем в отдельную локальную переменную контекст вызова вызванной функции-обертки
        let ctx = this;

        setTimeout(
            // "ctx" и "args" возьмутся через замыкание у вызванной функции-обертки
            // "ctx" выступает как внешний контекст вызова, потому что свой this был бы равен undefined
            // "args" выступает как "arguments" у вызванной функции-обертки
            function () { return func.apply(ctx, args) },
            delay);
    };
};

function func03(a) { console.log(a) };

let func03Deferred = defer(func03, 1000);
func03Deferred(123);