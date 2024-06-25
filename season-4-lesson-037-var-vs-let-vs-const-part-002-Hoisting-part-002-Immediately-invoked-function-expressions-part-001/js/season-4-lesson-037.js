'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*let и const ведут себя одинаково по отношению к лексическому окружению, области видимости.*/

/*Для var не существует блочной области видимости. Область видимости переменных var ограничивается либо функцией, либо, 
если переменная глобальная, то скриптом. Такие переменные доступны за пределами блока.*/

if (true) {
    {
        var var01 = 1;
    }
};

console.log(var01); // 1

for (var varI01 = 0; varI01 < 5; varI01++) { };
console.log(varI01); // 5

/*Если блок кода находится внутри функции, то var становится локальной переменной в этой функции.*/

function func01() {
    if (true) {
        {
            var var02 = 2;
        }
    };

    console.log(var02); // 2
};

func01();
// console.log(var02); // Ошибка: Uncaught ReferenceError: var02 is not defined

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если в блоке кода дважды объявить одну и ту же переменную let, то будет ошибка. Тоже самое будет при повторном 
инициализации переменной const. Используя var, можно переобъявлять переменную сколько угодно раз.*/

// let let01 = 1;
// let let01 = 1; // Uncaught SyntaxError: redeclaration of let let01

// const const01 = 1;
// const const01 = 1; // Uncaught SyntaxError: redeclaration of const const01

var var03 = 3;
var var03 = 3;
console.log(var03); // 3
var var03; // ничего не делает
console.log(var03); // 3
var var03 = 2;
console.log(var03); // 2

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Объявления переменных var обрабатываются в начале выполнения функции (или запуска скрипта, если переменная является
глобальной). То есть переменные var считаются объявленными с самого начала исполнения функции вне зависимости от того, 
в каком месте функции реально находятся их объявления (при условии, что они не находятся во вложенной функции). То есть
переменные var не имеют изначально состояния "Uninitialized", а доступны с самого начала со значением undefined. Это 
поведение называется "hoisting" (всплытие, поднятие), потому что все объявления переменных var и все Function 
Declaration "всплывают" в самый верх функции. Разница в этом моменте между переменными var и Function Declaration в 
том, что если тело Function Declaration доступно в месте объявления, то функция будет полностью доступна с самого 
начала, когда даже если мы полностью инициализировали переменную var, то "вверх поднимется" только сам идентификатор
переменной, но не ее значение.*/

function func02() {
    console.log(var04); // undefined
    var var04 = 4;
    console.log(var04); // 4

    console.log('1-----');

    if (true) { console.log(var05) }; // undefined
    var var05 = 5;
    if (true) { console.log(var05) }; // 5

    console.log('2-----');

    console.log(var06); // undefined
    if (false) { var var06 = 6; }; // Это условие никогда не выполнится, но var06 все равно доступно.
    console.log(var06); // undefined

    console.log('3-----');

    console.log(func03); // undefined, а с use sctrict ошибка: Uncaught ReferenceError: func03 is not defined 

    if (false) {
        function func03() {
            console.log(33);
        };
    };

    console.log('4-----');

    console.log(func04); // undefined, а с use sctrict ошибка: Uncaught ReferenceError: func03 is not defined 

    if (true) {
        function func04() {
            console.log(44);
        };
    };

    console.log('5-----');

    func05(); // 55

    function func05() {
        console.log(55);
    };
};

// func02();

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*В прошлом, поскольку существовал только var, а он не имел блочной области видимости, программисты придумали способ 
ее эмулировать. Этот способ получил название "Immediately-invoked function expressions" (IIFE).*/

/*Здесь создается и немедленно вызывается Function Expression. Так что код выполняется сразу же и у него есть свои 
локальные переменные. Function Expression обернуто в скобки (), потому что, когда JavaScript встречает "function" в 
основном потоке кода, он воспринимает это как начало Function Declaration, но у Function Declaration должно быть имя, 
иначе будет ошибка.*/
(function () {
    var var07 = 7;
    console.log(var07); // 7
})();

// function() { // Uncaught  SyntaxError: Function statements require a function name
//     var var08 = 8;
//     console.log(var08);
// } ();

/*JavaScript также не позволяет вызывать Function Declaration немедленно.*/
// function func06() { // Uncaught SyntaxError: expected expression, got ')'
//     var var09 = 9;
//     console.log(var09);
// } ();

/*Так что скобки вокруг функции – это трюк, который позволяет объяснить JavaScript, что функция была создана в 
контексте другого выражения, а значит, что это Function Expression: ей не нужно имя и ее можно вызвать немедленно.*/

/*Помимо круглых скобок существуют и другие способы сообщить JavaScript, что мы имеем в виду Function Expression.*/

(function () {
    console.log('Круглые скобки вокруг функции');
})();

(function () {
    console.log('Круглые скобки вокруг всего выражения');
}());

!function () {
    console.log('Выражение начинается с логического оператора НЕ');
}();

+function () {
    console.log('Выражение начинается с унарного плюса');
}();

function func07(v) {
    (function () {
        var var10 = 10;
        console.log('here1');
        func08(var10); // 10
    })();

    // var var10 = 11;
    console.log(var10);
};

// func07(); // Uncaught ReferenceError: var10 is not defined

function func08(v) { console.log('func08 ' + v) };

{
    var var11 = 11;

    (function () {
        var var12 = 12;
        console.log('here2');
    })();
};

console.log(var11); // 11
// console.log(var12); // Uncaught ReferenceError: var12 is not defined

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если мы где-либо создадим новую переменную, не используя "var", "let" или "const", и при этом зададим значение этой
переменной, то такая переменная будет создана на самом верхнем уровне программы.*/
// console.log(a); // Uncaught ReferenceError: a is not defined
console.log(b); // undefined
// console.log(c); //  Uncaught ReferenceError: c is not defined
console.log(d); // undefined

/*Как будто после срабатывания этой строчки добавится строка "var a = 0". С use sctrict будет ошибка: 
Uncaught ReferenceError: assignment to undeclared variable a.*/
// a = 0;
var b = 1;

{
    {
        /*Как будто после срабатывания этой строчки добавится строка "var c = 2". С use sctrict будет ошибка: 
        Uncaught ReferenceError: assignment to undeclared variable c.*/
        // c = 2;
        var d = 3;
    }
};

// console.log(a); // 0, с use sctrict будет ошибка: Uncaught ReferenceError: a is not defined
console.log(b); // 1
// console.log(c); // 2, с use sctrict будет ошибка: Uncaught ReferenceError: c is not defined
console.log(d); // 3

function func09() {
    e = 4;
};

func09();
console.log(e); // 4, с use sctrict будет ошибка: Uncaught ReferenceError: assignment to undeclared variable e