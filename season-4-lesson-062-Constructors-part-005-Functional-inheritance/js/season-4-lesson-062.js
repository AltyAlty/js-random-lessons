'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*В JavaScript наследование можно реализовать несколькими путями, один из которых – с использованием наложения 
функций-конструкторов.*/
function Constructor01(x) {
    let a = 1;
    this.b = 2;
    this.method01 = function () { console.log(6) };
    this.x = x;
};

function Constructor02(x) {
    /*Когда мы создаем объект на основе функции-конструктора, то создается this равный пустому объекту.*/
    Constructor01.call(this, x); // аналог "super()"
    // Constructor01.apply(this, [x]); // аналог "super()"
    let c = 3;
    this.d = 4;

    /*Расширение родительского метода.*/
    let parentMethod01 = this.method01; // аналог "super.method"
    
    this.method01 = function () { 
        parentMethod01(); // 6, аналог "super.method()"
        console.log(7); // 7
    };
};

let obj01 = new Constructor02(5);
console.log(obj01);
obj01.method01();