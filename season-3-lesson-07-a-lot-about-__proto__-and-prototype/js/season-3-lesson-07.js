let a;
console.log(a); // undefined

let b = document.querySelector('.some-thing');
console.log(b); // null
console.log('0-----------------------------------------------------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*"prototype" и "__proto___" это свойства объектов. "prototype" каких-то одних объектов может быть 
равен "__proto___" каких-то других объектов.*/

/*-------------------------------------------------------------------------------------------------------------*/

/*"__proto___" это почти всегда какой-то объект. "__proto___" есть у всех объектов. Даже у чисел и 
строк!*/
let objZero = {};
console.log(objZero.__proto__); // Object { constructor: function Object() ... }

let arrayZero = [];
console.log(arrayZero.__proto__); // Array [ constructor: function Array() ... ]

let numberZero = 123;
console.log(numberZero.__proto__); // Number { 0; constructor: function Number() ... }

let stringZero = 'abc';
console.log(stringZero.__proto__); // String { ""; constructor: function String() ... }

function functionZero() { };
console.log(functionZero.__proto__); // function ( constructor: function Function() ... )

let functionOne = function () { };
console.log(functionOne.__proto__); // function ( constructor: function Function() ... )

let functionTwo = () => { };
console.log(functionTwo.__proto__); // function ( constructor: function Function() ... )

/*Класс это "навороченная функция".*/
class ClassZero { };
console.log(ClassZero.__proto__); // function ( constructor: function Function() ... )

let classZeroObjZero = new ClassZero();
console.log(classZeroObjZero.__proto__); // Object { constructor: class ClassZero { } ... }

let booleanZero = true;
console.log(booleanZero.__proto__); // Boolean { false; constructor: function Boolean() ... }

let promiseZero = new Promise(() => { });
console.log(promiseZero.__proto__); // Promise.prototype { constructor: function Promise() ... }
console.log('1-----------------------------------------------------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*"__proto___" разных по типу объектов - разные, а "__proto___" одинаковых по типу объектов - одинаковые.
Любой объект в JS создается на самом деле с помощью классов или функций-конструкторов.*/
let objOne = {};
let objTwo = {};
console.log(objOne.__proto__ === objTwo.__proto__); // true. "__proto___" одинаковых по типу объектов - одинаковые.

let numberOne = 7;
console.log(objOne.__proto__ === numberOne.__proto__); // false. "__proto___" разных по типу объектов - разные.
console.log('2-----------------------------------------------------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*В JS есть встроенные функции-конструкторы, такие как "Object", "Promise", "Function", "Boolean", 
"Number", "String", "Array", "Function". Когда мы создаем новые данные какого-либо типа, то на самом деле
где-то вызываются такие конструкторы. Чтобы понять, что стоит за каким-либо "__proto___", нужно знать с 
помощью какой функции-конструктора или класса был создан какой-то объект, "__proto___" которого нас 
интересует. Стрелочная функция не является функцией-конструктором, то есть мы можем конструировать объекты
при помощи классов или ключевого слова "function", но не при помощи стрелочных функций. "prototype" используется 
при создании новых объектов оператором "new".*/
let objThree = new Object({ a: 0 });
console.log(objThree.__proto__); // Object { constructor: function Object() ... }

let arrayOne = new Array([]);
console.log(arrayOne.__proto__); // Array [ constructor: function Array() ... ]

let numberTwo = new Number(321);
console.log(numberTwo.__proto__); // Number { 0; constructor: function Number() ... }

let stringOne = new String('cba');
console.log(stringOne.__proto__); // String { ""; constructor: function String() ... }

let functionThree = new Function('a', 'b', 'return a + b');
console.log(functionThree); // function anonymous(a, b) {return a + b}
console.log(functionThree.__proto__); // function ( constructor: function Function() ... )

function functionFour() { };
let functionFourObjZero = new functionFour();
console.log(functionFour.__proto__); // function ( constructor: function Function() ... )
console.log(functionFourObjZero.__proto__); // Object { constructor: function functionFour() ... }

let booleanOne = new Boolean(true);
console.log(booleanOne.__proto__); // Boolean { false; constructor: function Boolean() ... }

let promiseOne = new Promise(() => { });
console.log(promiseOne.__proto__); // Promise.prototype { constructor: function Promise() ... }
console.log('3-----------------------------------------------------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Любой класс или функция имеет "prototype". Каждый "prototype" это независимый объект со свойствами и 
методами. "__proto___" любого объекта ссылается на "prototype" функции-конструктора или класса, при 
помощи которого этот объект был создан. "__proto___" нужен для того, чтобы объект связался с "prototype" 
своего родителя. "prototype" по умолчанию является объектом с единственным свойством "constructor", которое 
ссылается на саму функцию или класс.*/
class ClassTwo { };
console.log(ClassTwo.prototype); // Object { constructor: class ClassTwo {} ... }

function functionFive() { };
console.log(functionFive.prototype); // Object { constructor: function functionFive() ... }

let functionSix = function () { };
console.log(functionSix.prototype); // Object { constructor: function functionSix() ... }

console.log(Object.prototype); // Object { constructor: function Object() ... }
console.log(Promise.prototype); // Promise.prototype { constructor: function Promise() ... }
console.log(Function.prototype); // function ( constructor: function Function() ... )
console.log(Boolean.prototype); // Boolean { false; constructor: function Boolean() ... }
console.log(Number.prototype); // Number { 0; constructor: function Number() ... }
console.log(String.prototype); // String { ""; constructor: function String() ... }
console.log(Array.prototype); // Array [ constructor: function Array() ... ]
console.log('4-----------------------------------------------------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*У каждой функции создается свой уникальный "prototype".*/
console.log(({}).prototype === ({}).__proto__); // false, так как у объекта нет "prototype"
console.log(({}).prototype); // undefined
console.log(({}).__proto__); // Object { constructor: function Object() ... }
console.log(({}).__proto__ === Object.prototype); // true
console.log('5-----------------------------------------------------------------------------------------------------');

function someFuncOne() {
    console.log(someFuncOne.prototype === someFuncOne.__proto__);
};
someFuncOne(); // false
console.log(someFuncOne.prototype); // Object { constructor: function someFuncOne() ... } 
console.log(someFuncOne.__proto__); // function ( constructor: function Function() ... )
console.log(someFuncOne.__proto__ === Function.prototype); // true
console.log('6-----------------------------------------------------------------------------------------------------');

function someFuncTwo() { };
function someFuncThree() { };
console.log(someFuncTwo.__proto__ === someFuncThree.__proto__); // true
console.log(someFuncTwo.__proto__ === Function.prototype); // true
console.log(someFuncTwo.prototype === someFuncThree.prototype); // false
console.log(someFuncTwo.__proto__); // function ( constructor: function Function() ... )
console.log(someFuncThree.__proto__); // function ( constructor: function Function() ... )
console.log(someFuncTwo.prototype); // Object { constructor: function someFuncTwo() ... }
console.log(someFuncThree.prototype); // Object { constructor: function someFuncThree() ... }
console.log('7-----------------------------------------------------------------------------------------------------');

let someEntityOne = (props) => {
    return '<div>I know nothing</div>'
};
console.log(someEntityOne.prototype === Object.prototype); // false, так у стрелочной функции нет "prototype"
console.log(someEntityOne.prototype); // undefined
console.log(someEntityOne.__proto__ === Function.prototype); // true
console.log(someEntityOne.__proto__); // function ( constructor: function Function() ... )
console.log('8-----------------------------------------------------------------------------------------------------');

let c = 24;
console.log(c.prototype === Number.prototype); // false, так как у числа нет "prototype"
console.log(c.prototype); // undefined
console.log(c.__proto__ === Number.prototype); // true
console.log(c.__proto__); // Number { 0; constructor: function Number() ... }
console.log('9-----------------------------------------------------------------------------------------------------');

class SomeClassOne { };
console.log(SomeClassOne.__proto__ === Function.prototype); // true
console.log(SomeClassOne.__proto__); // function ( constructor: function Function() ... )
console.log(SomeClassOne.prototype); // Object { constructor: class SomeClassOne {} ... }
console.log('10----------------------------------------------------------------------------------------------------');

function someFuncFour() { let d = 0 };
console.log(someFuncFour.__proto__ === Function.prototype); // true
console.log(someFuncFour.__proto__); // function ( constructor: function Function() ... )
console.log('11----------------------------------------------------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Если мы пытаемся прочитать какое-либо свойство у какого-либо объекта, либо вызвать у него какой-либо 
метод, и при этом указанного свойства или метода у этого объекта нет, то объект будет искать их через
свойство "__proto__", то есть через ссылку на свойство "prototype" своего родителя. Поэтому при создании
функций-конструкторов методы лучше указывать в "prototype".*/

let objFour = { a: 'abc' };
console.log(objFour.toString()); // строка "[object Object]". Метод "toString()" был найден в "Object.prototype".
console.log('12----------------------------------------------------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

function SomeFuncFive(a) {
    this.a = a;
};

SomeFuncFive.prototype.showA = function () {
    console.log(this.a);
};

let someFuncFiveObjZero = new SomeFuncFive(0);
let someFuncFiveObjOne = new SomeFuncFive(1);

/*В данном случае метод "showA()" будем браться по ссылке из "prototype" общего родителя двух объектов, но
контекст "this" для каждого объекта будет разным.*/
someFuncFiveObjZero.showA(); // 0
someFuncFiveObjOne.showA(); // 1

/*Но лучше использовать классы, чем "prototype" у функций-конструкторов. Метод "showA()" все равно в итоге
прицепится к "prototype".*/
class SomeClassTwo {
    constructor(a) {
        this.a = a;
    };

    showA() { console.log(this.a) };
};

console.log(SomeClassTwo.prototype); // Object { constructor: class SomeClassTwo {}; showA: function showA() ... }

let someClassTwoObjZero = new SomeClassTwo(0);
let someClassTwoObjOne = new SomeClassTwo(1);
someClassTwoObjZero.showA(); // 0
someClassTwoObjOne.showA(); // 1
console.log('13----------------------------------------------------------------------------------------------------');

console.log(someClassTwoObjZero.__proto__); // Object { constructor: class SomeClassTwo {}; showA: function showA() ... }
console.log(SomeClassTwo.prototype); // Object { constructor: class SomeClassTwo {}; showA: function showA() ... }
console.log(someClassTwoObjZero.__proto__ === SomeClassTwo.prototype); // true
console.log('14----------------------------------------------------------------------------------------------------');

console.log(someClassTwoObjZero.__proto__.__proto__); // Object { constructor: function Object() ... }
console.log(SomeClassTwo.prototype.__proto__); // Object { constructor: function Object() ... }
console.log(someClassTwoObjZero.__proto__.__proto__ === Object.prototype); // true
console.log(SomeClassTwo.prototype.__proto__ === Object.prototype); // true
console.log('15----------------------------------------------------------------------------------------------------');

console.log(someClassTwoObjZero.__proto__.__proto__.__proto__); // null
console.log(someClassTwoObjZero.__proto__.__proto__.prototype); // undefined

console.log(SomeClassTwo.prototype.__proto__.__proto__); // null
console.log(SomeClassTwo.prototype.__proto__.prototype); // undefined

console.log(Object.prototype.__proto__); // null
console.log(Object.prototype.prototype); // undefined

console.log(someClassTwoObjZero.__proto__.__proto__.__proto__ === Object.prototype.__proto__); // true
console.log(someClassTwoObjZero.__proto__.__proto__.prototype === Object.prototype.prototype); // true
console.log(SomeClassTwo.prototype.__proto__.__proto__ === Object.prototype.__proto__); // true
console.log(SomeClassTwo.prototype.__proto__.prototype === Object.prototype.prototype); // true
console.log('16----------------------------------------------------------------------------------------------------');

console.log(SomeClassTwo.__proto__); // function ( constructor: function Function() ... )
console.log(SomeClassTwo.__proto__ === Function.prototype); // true

console.log(SomeClassTwo.__proto__.__proto__); // Object { constructor: function Object() ... }
console.log(SomeClassTwo.__proto__.__proto__ === Object.prototype); // true

console.log(SomeClassTwo.__proto__.prototype); // undefined
console.log(SomeClassTwo.__proto__.prototype === Object.prototype.prototype); // true
console.log('17----------------------------------------------------------------------------------------------------');

console.log(someClassTwoObjZero.__proto__.constructor); // class SomeClassTwo { constructor(a) }
console.log(someClassTwoObjZero.__proto__.constructor === SomeClassTwo); // true
console.log('18----------------------------------------------------------------------------------------------------');

console.log(someClassTwoObjZero.__proto__.constructor.__proto__); // function ( constructor: function Function() ... )
console.log(SomeClassTwo.__proto__); // function ( constructor: function Function() ... )
console.log(someClassTwoObjZero.__proto__.constructor.__proto__ === Function.prototype); // true
console.log(someClassTwoObjZero.__proto__.constructor.__proto__ === SomeClassTwo.__proto__); // true
console.log('19----------------------------------------------------------------------------------------------------');

console.log(someClassTwoObjZero.__proto__.constructor.prototype); // Object { constructor: class SomeClassTwo {}; showA: function showA() ... }
console.log(SomeClassTwo.prototype); // Object { constructor: class SomeClassTwo {}; showA: function showA() ... }
console.log(someClassTwoObjZero.__proto__.constructor.prototype === SomeClassTwo.prototype); // true
console.log('20----------------------------------------------------------------------------------------------------');

console.log(someClassTwoObjZero.__proto__.constructor.prototype.__proto__); // Object { constructor: function Object() ... }
console.log(SomeClassTwo.prototype.__proto__); // Object { constructor: function Object() ... }
console.log(someClassTwoObjZero.__proto__.constructor.prototype.__proto__ === SomeClassTwo.prototype.__proto__); // true
console.log(someClassTwoObjZero.__proto__.constructor.prototype.__proto__ === Object.prototype); // true
console.log('21----------------------------------------------------------------------------------------------------');

console.log(someClassTwoObjZero.__proto__.constructor.prototype.__proto__.__proto__); // null
console.log(SomeClassTwo.prototype.__proto__.__proto__); // null
console.log(someClassTwoObjZero.__proto__.constructor.prototype.__proto__.__proto__ === SomeClassTwo.prototype.__proto__.__proto__); // true
console.log('22----------------------------------------------------------------------------------------------------');

console.log(Object.__proto__); // function ( constructor: function Function() ... )
console.log(Promise.__proto__); // function ( constructor: function Function() ... )
console.log(Function.__proto__); // function ( constructor: function Function() ... )
console.log(Boolean.__proto__); // function ( constructor: function Function() ... )
console.log(Number.__proto__); // function ( constructor: function Function() ... )
console.log(String.__proto__); // function ( constructor: function Function() ... )
console.log(Array.__proto__); // function ( constructor: function Function() ... )

console.log(Object.__proto__ === Promise.__proto__); // true
console.log(Object.__proto__ === Function.__proto__); // true
console.log(Function.__proto__ === Function.prototype); // true
console.log('23----------------------------------------------------------------------------------------------------');

console.log(Object.__proto__.__proto__); // Object { constructor: function Object() ... }
console.log(Promise.__proto__.__proto__); // Object { constructor: function Object() ... }
console.log(Function.__proto__.__proto__); // Object { constructor: function Object() ... }
console.log(Boolean.__proto__.__proto__); // Object { constructor: function Object() ... }
console.log(Number.__proto__.__proto__); // Object { constructor: function Object() ... }
console.log(String.__proto__.__proto__); // Object { constructor: function Object() ... }
console.log(Array.__proto__.__proto__); // Object { constructor: function Object() ... }

console.log(Object.__proto__.__proto__ === Function.__proto__.__proto__); // true
console.log('24----------------------------------------------------------------------------------------------------');

console.log(Object.prototype.__proto__); // null, так как класс "Object" самый главный в JS и все от него идет.
console.log(Promise.prototype.__proto__); // Object { constructor: function Object() ... }
console.log(Function.prototype.__proto__); // Object { constructor: function Object() ... }
console.log(Boolean.prototype.__proto__); // Object { constructor: function Object() ... }
console.log(Number.prototype.__proto__); // Object { constructor: function Object() ... }
console.log(String.prototype.__proto__); // Object { constructor: function Object() ... }
console.log(Array.prototype.__proto__); // Object { constructor: function Object() ... }

console.log(Function.__proto__.__proto__ === Number.prototype.__proto__); // true
console.log(Function.__proto__.__proto__ === Function.__proto__.__proto__); // true
console.log('25----------------------------------------------------------------------------------------------------');

console.log(Object.prototype.prototype); // undefined
console.log(Promise.prototype.prototype); // undefined
console.log(Function.prototype.prototype); // undefined
console.log(Boolean.prototype.prototype); // undefined
console.log(Number.prototype.prototype); // undefined
console.log(String.prototype.prototype); // undefined
console.log(Array.prototype.prototype); // undefined
console.log('26----------------------------------------------------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*"prototype" функций-конструкторов можно модифицировать, чтобы дочерние элементы могли иметь бОльший 
функционал.*/

Object.prototype.showB = function () {
    console.log(`It's B!`);
};

({}).showB(); // It's B!
console.log('27----------------------------------------------------------------------------------------------------');

let aaa = {
    showC: function () {
        console.log(`It's C!`);
    }
};

/*При помощи "Object.create()" можно создавать новые объекты на основе других.*/
let bbb = Object.create(aaa);
/*Методы "showC()" и "showB()" были найдены по цепочке "__proto__" благодаря замыканию.*/
console.log(aaa); // Object { showC: showC() }
console.log(bbb); // Object {  }
console.log(aaa === bbb); // false
bbb.showC(); // It's C!
bbb.showB(); // It's B!

console.log(bbb.__proto__); // Object { showC: function showC() ... } - то есть это объект "aaa"
console.log(bbb.__proto__.__proto__); // Object { constructor: function Object(); showC: function showC() ... } - это 
                                      // функция-конструктор "Object"
console.log('28----------------------------------------------------------------------------------------------------');

class SomeClassThree {

};

class SomeClassFour extends SomeClassThree {

};

console.log(SomeClassFour.prototype); // Object { constructor: class SomeClassFour {} ... }
console.log(SomeClassFour.__proto__); // class SomeClassThree {}
console.log(SomeClassThree === SomeClassFour.__proto__); // true
console.log(SomeClassFour === SomeClassFour.prototype.constructor); // true

let SomeClassFourObj = new SomeClassFour();
console.log(SomeClassFourObj.__proto__.constructor === SomeClassFour); // true

/*"__proto__" есть у всего, кроме "undefined" и "null".*/
/*"prototype" может быть только у класса или функции, но не у стрелочной.*/
/*"prototype" это всегда какой-то объект. "__proto__" может быть объектом, функцией или классом.*/
/*"prototype" ссылается на объект, внутри которого есть свойство "constructor" со значением в виде
ссылки на сущность, у которой было запрошено свойство "prototype".*/
/*"__proto__" ссылается на объект, функцию или класс, от которых была создана сущность, у 
которой было запрошено свойство "__proto__".*/
console.log('29----------------------------------------------------------------------------------------------------');

/*Классы также работают при помощи прототипов.*/
class SomeClassFive {
    constructor(name) {
        this.name = name;
    };

    someMethod() {
        console.log(this.name);
    };
};

let SomeClassFiveObj = new SomeClassFive('SomeClassFiveObj');
SomeClassFiveObj.someMethod(); // 'SomeClassFiveObj'
console.log(SomeClassFiveObj); // У этого объекта нет метода "someMethod()"
console.log(SomeClassFiveObj.__proto__); // Object { constructor: class SomeClassFive {} ... }
console.log(SomeClassFiveObj.__proto__.constructor.prototype); // А в "prototype" класса есть метод "someMethod()"
console.log('30----------------------------------------------------------------------------------------------------');

console.log(({}).__proto__); // Object { constructor: function Object() ... }
console.log((1).__proto__); // Number { 0; constructor: function Number() ... }
console.log(('abc').__proto__); // String { ""; constructor: function String() ... }
console.log((true).__proto__); // Boolean { false; constructor: function Boolean() ... }
console.log(([1, 2, 3]).__proto__); // Array [ constructor: function Array() ... ]
console.log((
    function () {

    }
).__proto__); // function ( constructor: function Function() ... )
console.log((new Promise(() => { })).__proto__); // Promise.prototype { constructor: function Promise() ... }
console.log('31----------------------------------------------------------------------------------------------------');

console.log(Promise); // function Promise()
console.log(Object); // function Object()
console.log(Function); // function Function()
console.log(Boolean); // function Boolean()
console.log(Number); // function Number()
console.log(String); // function String()
console.log(Array); // function Array()

console.log(({}).__proto__.constructor === Object); // true
console.log((1).__proto__.constructor === Number); // true
console.log(('abc').__proto__.constructor === String); // true
console.log((true).__proto__.constructor === Boolean); // true
console.log(([1, 2, 3]).__proto__.constructor === Array); // true
console.log((
    function () {

    }
).__proto__.constructor === Function); // true
console.log((new Promise(() => { })).__proto__.constructor === Promise); // true
console.log('32----------------------------------------------------------------------------------------------------');

console.log(({}).__proto__ === Object); // false
console.log((1).__proto__ === Number); // false
console.log(('abc').__proto__ === String); // false
console.log((true).__proto__ === Boolean); // false
console.log(([1, 2, 3]).__proto__ === Array); // false
console.log((
    function () {

    }
).__proto__ === Function); // false
console.log((new Promise(() => { })).__proto__ === Promise); // false
console.log('33----------------------------------------------------------------------------------------------------');

/*Другими словами "__proto__" какой-то сущности ссылается на "prototype" своего родителя.*/
console.log(({}).__proto__ === Object.prototype); // true
console.log((1).__proto__ === Number.prototype); // true
console.log(('abc').__proto__ === String.prototype); // true
console.log((true).__proto__ === Boolean.prototype); // true
console.log(([1, 2, 3]).__proto__ === Array.prototype); // true
console.log((
    function () {

    }
).__proto__ === Function.prototype); // true
console.log((new Promise(() => { })).__proto__ === Promise.prototype); // true