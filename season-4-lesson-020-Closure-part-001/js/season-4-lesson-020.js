// 'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

function foo() {
    const x = 10;

    return {
        x: 20,

        bar: () => {
            console.log(this);
            console.log(this.x);
        },

        baz: function () {
            console.log(this);
            console.log(this.x);
        }
    };
};

const obj1 = foo(); // + дополнительная информация, что контекст вызова функции "foo()" был window

console.log(obj1); // Object { x: 20, bar: bar(), baz: baz() }
console.log(obj1.x); // 20

obj1.bar(); // window --- undefined
obj1.baz(); // obj1 --- 20

console.log('--------------------------------------');

const obj2 = foo.call({ x: 30 }); // + дополнительная информация, что контекст вызова функции "foo()" был {x: 30}

console.log(obj2); // Object { x: 20, bar: bar(), baz: baz() }
console.log(obj2.x); // 20

console.log('--------------------------------------');

let y = obj2.bar;
let z = obj2.baz;

console.log(y === obj2.bar); // true
console.log(z === obj2.baz); // true

y(); // { x: 30 } --- 30, стрелочная функция связана с контекстом функции, в которой была вызвана, из-за замыкания
z(); // window --- undefined

console.log('--------------------------------------');

obj2.bar(); // { x: 30 } --- 30, стрелочная функция связана с контекстом функции, в которой была вызвана, из-за замыкания
obj2.baz(); // obj2 ---- 20

console.log('--------------------------------------');

function func1() {
    let f = 25;

    return {
        a: function () {
            console.log(this);
            console.log(f);
        },

        b: () => {
            console.log(this);
            console.log(f);
        }
    }
};

let func2 = func1(); // + дополнительная информация, что контекст вызова функции "foo()" был window, а также локальная переменная f = 25;
func2.a() // func2 --- 25
func2.b() // window --- 25