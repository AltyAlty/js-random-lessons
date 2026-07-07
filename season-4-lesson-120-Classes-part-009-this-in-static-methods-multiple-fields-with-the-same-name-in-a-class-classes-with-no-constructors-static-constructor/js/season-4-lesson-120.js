'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

/*При прямом вызове через класс для любого статического метода класса в JS this всегда будет ссылаться на сам класс. Но 
если передать метод как callback или присвоить переменной, то this потеряется, но в случае стрелочной функции this 
всегда будет ссылаться на класс.*/
class Class_01 {
    static method_01() { console.log(this) };
    static method_02 = () => { console.log(this) };
};

Class_01.method_01(); // [class Class_01] { method_02: [Function: method_02] }
Class_01.method_02(); // [class Class_01] { method_02: [Function: method_02] }

const obj_01 = {};
obj_01.method_01 = Class_01.method_01;
obj_01.method_02 = Class_01.method_02;
obj_01.method_01(); // { method_01: [Function: method_01], method_02: [Function: method_02] }
obj_01.method_02(); // [class Class_01] { method_02: [Function: method_02] }

const method_01 = Class_01.method_01;
const method_02 = Class_01.method_02;
method_01(); // undefined
method_02(); // [class Class_01] { method_02: [Function: method_02] }

console.log('--------------------------------------');

/*--------------------------------------------------------------------------------------------------------------------*/

/*При определении в классе нескольких методов или полей с одинаковым именем будет использоваться самое последнее 
определение. В JS нет перегрузки ни методов, ни параметров.*/
class Class_02 {
    constructor() {
        this.a = 1;
        this.a = 2;
    };

    b = 3;
    b = 4;

    static method_01() { console.log(5) };
    static method_01() { console.log(6) };

    method_02() { console.log(7) };
    method_02(a) { console.log(a) };
    method_02(a) { console.log(8) };
};

const obj_02 = new Class_02();
console.log(obj_02.a); // 2
console.log(obj_02.b); // 4
Class_02.method_01(); // 6
obj_02.method_02(1); // 8
obj_02.method_02(); // 8

console.log('--------------------------------------');

/*--------------------------------------------------------------------------------------------------------------------*/

/*При использовании класса без указания конструктора будет создавать конструктор по умолчанию, что позволит создавать
пустые объекты на основе этого класса.*/
class Class_03 { method_01() { console.log(1) } };
const obj_03 = new Class_03();
console.log(obj_03); // Object {  }
console.log(obj_03.__proto__ === Class_03.prototype); // true
obj_03.method_01(); // 1

console.log('--------------------------------------');

/*--------------------------------------------------------------------------------------------------------------------*/

/*При попытке создать статический конструктор в классе будет создан статический метод.*/
class Class_04 {
    static constructor(a) {
        this.a = a;
        return a;
    };
};

const obj_04 = new Class_04(1);
console.log(obj_04); // Object {  }
console.log(Class_04.constructor(1)); // 1