'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

let obj01 = {
    a: 1,
    method01: function () { console.log(this.a) }
};

obj01.method01(); // 1

let method01Copy = obj01.method01;
// method01Copy(); // Uncaught TypeError: this is undefined

/*Для работы вызовов типа "obj01.method01()", JavaScript использует трюк - точка "." возвращает не саму функцию, а 
специальное значение "ссылочного типа", называемого "Reference Type". Этот ссылочный тип (Reference Type) является 
внутренним типом.

Значение ссылочного типа - комбинация из трех значений:

1) "base" - это объект.
2) "name" - это имя свойства объекта.
3) "strict" - это режим исполнения. Является true, если действует строгий режим.

Результатом доступа к свойству "obj01.method01" является не функция, а значение ссылочного типа. Для "obj01.method01"
в строгом режиме оно будет таким: "(obj01, "method01", true)".

Когда скобки "()" применяются к значению ссылочного типа, то они получают полную информацию об объекте и его методе, и 
могут поставить правильный this.

Ссылочный тип - исключительно внутренний, промежуточный, используемый, чтобы передать информацию от точки "." до 
вызывающих скобок "()".

При любой другой операции, например, присваивании " let method01Copy = obj01.method01 ", ссылочный тип заменяется на 
собственно значение "obj01.method01" (функцию), и дальше работа уже идет только с ней. Поэтому дальнейший вызов 
происходит уже без this, равного "obj01".

Таким образом, значение this передается правильно, только если функция вызывается напрямую с использованием синтаксиса
точки "obj.method()" или квадратных скобок "obj['method']()". Существуют различные способы решения этой проблемы: одним 
из таких является применение функции "bind()".*/