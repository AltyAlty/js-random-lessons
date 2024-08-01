'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*На уровне языка "#" является специальным символом, который означает, что поле приватное. Мы не можем получить к нему
доступ извне или из наследуемых классов. Приватные поля не конфликтуют с публичными.*/
class Class01 {
    a = 1; // Публичное поле класса
    #a = 2; // Приватное поле класса

    method01() { console.log(this.#a) }; // Публичный метод класса
    #method01() { console.log(this.#a) }; // Приватный метод класса

    get privateA() {
        this.#method01();
        return this.#a;
    };

    set privateA(x) {
        this.#a = x;
        this.#method01();
    };
};

let obj01 = new Class01();
console.log(obj01); // Object { a: 1, #a: 2 }, нет метода "#method01"

// console.log(obj01.#a); // Uncaught SyntaxError: reference to undeclared private field or method #a
console.log(obj01['#a']); // undefined
console.log(' ');

obj01.method01(); // 2
// obj01.#method01() // Uncaught SyntaxError: reference to undeclared private field or method #method01
console.log(' ');

/*Приватные методы определяются внутри тела класса, и их доступ возможен только через другие методы этого же класса.*/
console.log(Class01.prototype); // Object { constructor, method01, getPrivateA, setPrivateA }, нет метода "#method01"
console.log(Class01); // нет метода "#method01"
console.log(' ');

console.log(obj01.privateA); // 2 => 2
obj01.privateA = 3; // 3
console.log(' ');

class Class02 extends Class01 {
    // method02() { console.log(this.#a) }; // Uncaught SyntaxError: reference to undeclared private field or method #a
};

let obj02 = new Class02();
console.log(obj02); // Object { a: 1, #a: 2 }

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Один из важнейших принципов объектно-ориентированного программирования – разделение внутреннего и внешнего 
интерфейсов.*/

/*В JavaScript есть два типа полей (свойств и методов) объекта:
1) Публичные: доступны отовсюду. Они составляют внешний интерфейс. До этого момента мы использовали только публичные 
свойства и методы.
2) Приватные: доступны только внутри класса. Они для внутреннего интерфейса.*/
class Class03 {
    a = 1; // Публичное поле класса, внешний интерфейс
    _a = 2; // Защищенное поле класса, внутренний интерфейс
    #a = 3; // Приватное поле класса, внутренний интерфейс

    constructor() {
        this.b = 1; // Публичное поле класса, внешний интерфейс
        this._b = 2; // Защищенное поле класса, внутренний интерфейс
        // this.#b = 3; // Uncaught SyntaxError: reference to undeclared private field or method #b
    };

    method01() { }; // Публичный метод класса, внешний интерфейс
    _method01() { }; // Защищенный метод класса, внутренний интерфейс
    #method01() { }; // Приватный метод класса, внутренний интерфейс

    get privateA() { return this.#a }; // Геттер свойства-аксессора "privateA", внешний интерфейс
    set privateA(x) { this.#a = x }; // Сеттер свойства-аксессора "privateA", внешний интерфейс

    getPrivateA() { return this.#a }; // Публичный метод класса, внешний интерфейс
    setPrivateA(x) { this.#a = x }; // Публичный метод класса, внешний интерфейс
};

let obj03 = new Class03();

console.log(obj03.privateA); // 3
obj03.privateA = 4;
console.log(obj03.privateA); // 4

console.log(obj03.getPrivateA()); // 4
obj03.setPrivateA(5);
console.log(obj03.getPrivateA()); // 5

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*В терминах ООП отделение внутреннего интерфейса от внешнего называется инкапсуляция. Инкапсусляция позволяет
реализовать защиту от дурака, улучшает поддерживаемость кода, формирует код в виде черной коробки.*/