'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Используя специальное свойство "new.target" внутри функции, можно проверить, вызвана ли функция при помощи оператора 
"new" или без него. В случае обычного вызова функции свойство "new.target" будет undefined. Если же она была вызвана 
при помощи оператора "new", то свойство "new.target" будет равен самой функции. Это можно использовать внутри функции, 
чтобы узнать, была ли она вызвана как конструктор или нет.*/

function doSomething1() {
    console.log(new.target)
};

doSomething1(); // undefined
new doSomething1(); // function doSomething1 { ... }

console.log('--------------------------------------');

/*Можно сделать, чтобы вызовы с оператором "new" и без него делали одно и то же.*/

function SomeConstructor1(a) {
    if (!new.target) {
        return new SomeConstructor1(a)
    }
    
    this.a = a;
};

let obj1 = SomeConstructor1('obj1'); // переадресовывает вызов на new SomeConstructor
console.log(obj1.a); // 'obj1'

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если в конструкторе есть "return", то будет следующее:
При вызове "return" с объектом, вместо this вернется этот объект.
При вызове "return" с примитивным значением, это значение проигнорируется и вернется "this".*/

function SomeConstructor2() {
    this.a = 'obj2';
    return {a: 'obj3'};
};

console.log(new SomeConstructor2().a); // 'obj3'

function SomeConstructor3() {
    this.a = 'obj4';
    return 'obj5';
};

console.log(new SomeConstructor3().a); // 'obj4'

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Можно не ставить круглые скобки после "new".*/

function SomeConstructor4() {
    this.a = 'obj6'
};

let obj6 = new SomeConstructor4;
console.log(obj6);