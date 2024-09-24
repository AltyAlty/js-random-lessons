'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Попробуем расширить встроенный класс "Array()". Встроенные методы, такие как "filter()", "map()" и другие возвращают
новые объекты унаследованного класса "ArrayTwo". Их внутренняя реализация такова, что для этого они используют 
свойство объекта "constructor".*/
class ArrayTwo extends Array { };
let arr01 = new ArrayTwo(1, 2, 3, 4, 5);

console.log(arr01.__proto__.constructor === ArrayTwo); // true

let arr02 = arr01.filter(item => item >= 3);
console.log(arr02); // Array(3) [ 3, 4, 5 ]
console.log(arr02.__proto__.constructor === ArrayTwo); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Чтобы указать какой именно класс нужно использовать встроенным методам, таким как "filter()" или "map()", нужно в
классе наследнике указать статический геттер "Symbol.species". Этот геттер автоматически вызывается указанными 
встроенными методами, когда необходимо определить на основе какого класса нужно создать новый экземпляр данных. Другие 
коллекции, такие как "Map", "Set", работают аналогично, они также используют геттер "Symbol.species".*/
class ArrayThree extends Array {
    static get [Symbol.species]() {
        return Array;
    };
};

let arr03 = new ArrayThree(1, 2, 3, 4, 5);

let arr04 = arr03.filter(item => item >= 3);
console.log(arr04); // Array(3) [ 3, 4, 5 ]
console.log(arr04.__proto__.constructor === Array); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Обычно, когда один класс наследует другой, то наследуются и статические методы. Но встроенные классы – исключение. 
Они не наследуют статические методы друг друга. Например, и классы "Array", и "Date" наследуют от класса "Object", так 
что в их экземплярах данных доступны методы из свойства "Object.prototype". Но "Array.__proto__" не ссылается на класс
"Object", поэтому нет методов "Array.keys()" или "Date.keys()".*/
class Class01 {
    static method01() { console.log(123) };
};

class Class02 extends Class01 {};
console.log(Class02.method01()); // 123, Class02 -> Class02.__proto__ -> Class03

console.log(Array.keys); // undefined, Array -> Array.__proto__ -> Function.prototype -> Function.prototype.__proto__ -> Object.prototype -> Object.prototype.__proto__ -> null
console.log(Object.keys); // function keys()