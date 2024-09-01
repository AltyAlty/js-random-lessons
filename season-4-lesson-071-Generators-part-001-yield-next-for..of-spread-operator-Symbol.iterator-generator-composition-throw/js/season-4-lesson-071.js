'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Обычные функции возвращают только одно-единственное значение. Функции-генераторы могут порождать множество значений 
одно за другим, по мере необходимости. Для объявления функции-генератора используется специальная синтаксическая 
конструкция "function*".*/

/*Функция-генератор при вызове не выполняет свой код. Вместо этого она возвращает специальный объект, так называемый
"генератор", для управления ее выполнением.*/

/*Основным методом функции-генератора является метод "next()". При вызове он запускает выполнение кода до ближайшей
инструкции "yield" <значение> (значение может отсутствовать, в этом случае оно предполагается равным undefined). По 
достижении "yield" выполнение функции приостанавливается, а соответствующее значение возвращается во внешний код.

Результатом метода "next()" всегда является объект с двумя свойствами:
1) "value": значение из "yield".
2) "done: true", если выполнение функции завершено, иначе false.*/
function* funcGen01() {
    yield 1;
    yield 2;
    return 3;
};

let generator01 = funcGen01();
console.log(generator01); // Generator {  }

let generator01result01 = generator01.next();
console.log(generator01result01); // Object { value: 1, done: false }

let generator01result02 = generator01.next();
console.log(generator01result02); // Object { value: 2, done: false }

let generator01result03 = generator01.next();
console.log(generator01result03); // Object { value: 3, done: true }

let generator01result04 = generator01.next();
console.log(generator01result04); // Object { value: undefined, done: true }

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Функцию-генератор также можно объявить через "function *f()".*/
function* funcGen02() {
    yield 1;
    yield 2;
    yield 3;
};

let generator02 = funcGen02();

let generator02result01 = generator02.next();
console.log(generator02result01); // Object { value: 1, done: false }

let generator02result02 = generator02.next();
console.log(generator02result02); // Object { value: 2, done: false }

/*Если в функции-генераторе явно не указать "return", то после последнего "yield" в результирующем объекте, будет
"done: false". Но если вызвать метод "next()" у генератора еще раз, то в следующем результирующем объекте уже будет
"done: true".*/
let generator02result03 = generator02.next();
console.log(generator02result03); // Object { value: 3, done: false }

let generator02result04 = generator02.next();
console.log(generator02result04); // Object { value: undefined, done: true }

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Генераторы являются перебираемыми объектами.*/
function* funcGen03() {
    yield 1;
    yield 2;
    return 3;
};

let generator03 = funcGen03();

/*При переборе значение, которое возвращается при помощи "return", выведено не будет. Перебор через цикл "for..of"
игнорирует последнее значение, при котором "done: true".*/
for (const element of generator03) {
    console.log(element); // 1 -> 2
};

console.log(' ');

function* funcGen04() {
    yield 4;
    yield 5;
    yield 6;
};

let generator04 = funcGen04();

for (const element of generator04) {
    console.log(element); // 4 -> 5 -> 6
};

console.log(' ');

/*Так как генераторы являются перебираемыми объектами, мы можем использовать всю связанную с ними функциональность, 
например, оператор расширения "...".*/
let arr01 = [3, ...funcGen04()];
console.log(arr01); // Array(4) [ 3, 4, 5, 6 ]

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "[Symbol.iterator]()" можно использовать как функцию-генератор.*/
let obj01 = {
    a: 1,
    b: 6
};

obj01[Symbol.iterator] = function* () {
    for (let value = this.a; value <= this.b; value++) {
        yield value;
    }
};

for (const num of obj01) {
    console.log(num); // 1 -> 2 -> 3 -> 4 -> 5 -> 6
};

/*При помощи оператора расширения "..." и перебираемого объекта можно создат массив элементов.*/
let arr02 = [...obj01];
console.log(arr02); // Array(6) [ 1, 2, 3, 4, 5, 6 ]

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Генераторы могут генерировать бесконечно. В примерах выше мы генерировали конечные последовательности, но мы также 
можем сделать генератор, который будет возвращать значения бесконечно.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Композиция генераторов – это особенная возможность генераторов, которая позволяет прозрачно "встраивать" генераторы
друг в друга. Для генераторов есть особый синтаксис "yield*"", который позволяет "вкладывать" генераторы один в другой,
то есть осуществлять их композицию.

Директива "yield*" делегирует выполнение другому генератору. Этот термин означает, что "yield* gen" перебирает 
генератор "gen" и прозрачно направляет его вывод наружу. Как если бы значения были сгенерированы внешним генератором.

Композиция генераторов – естественный способ вставлять вывод одного генератора в поток другого. Она не использует 
дополнительную память для хранения промежуточных результатов.*/
function* funcGen05(start, end) {
    for (let i = start; i <= end; i++) yield i;
};

function* funcGen06() {
    yield* funcGen05(48, 57);
    yield* funcGen05(65, 90);
    yield* funcGen05(97, 122);
};

let generator06 = funcGen06();
console.log([...generator06]); // Array(62) [ 48, …, 122 ]

let str = '';
for (let code of funcGen06()) { str += String.fromCharCode(code) };
console.log(str); // "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*"yield" - это дорога в обе стороны: он не только возвращает результат наружу, но и может передавать значение извне в
генератор. Чтобы это сделать, нам нужно вызвать "generator.next(arg)" с аргументом. Этот аргумент становится 
результатом "yield".*/
function* funcGen07() {
    let result = yield '2 + 2 = ?';
    console.log(result);
};

let generator07 = funcGen07();
let question01 = generator07.next().value;
console.log('question: ' + question01); // "question: 2 + 2 = ?"
generator07.next(4); // 4

/*Вот что происходит в коде выше:

1) Первый вызов "generator07.next()" - это всегда вызов без аргумента, он начинает выполнение и возвращает результат 
первого "yield", то есть " yield '2 + 2 = ?' ". На этой точке генератор приостанавливает выполнение.

2) Затем результат "yield" переходит во внешний код в переменную "question".

3) При вызове "generator07.next(4)" выполнение генератора возобновляется, а 4 выходит из присваивания как результат: 
"let result = 4". То есть если мы вызываем метод "next()" с каким-то параметром, то этот параметр вставится на место,
где был выполнен последний "yield".*/

console.log(' ');

/*Еще один пример.*/
function* funcGen08() {
    let answer01 = yield '2 + 2 = ?';

    console.log(answer01); // 4

    let answer02 = yield '3 * 3 = ?';

    console.log(answer02); // 9
};

let generator08 = funcGen08();

console.log(generator08.next().value); // "2 + 2 = ?"
console.log(generator08.next(4).value); // "3 * 3 = ?"
console.log(generator08.next(9).done); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Внешний код может передавать значение в генератор как результат "yield", но можно передать не только результат, но и
инициировать ошибку. Для того, чтобы передать ошибку в "yield", нам нужно вызвать "generator.throw(error)". В таком 
случае исключение "error" возникнет на строке с "yield".*/
function* funcGen09() {
    try {
        let result = yield '4 - 4 = ?';
    } catch (error) {
        console.log(error);
    };
};

let generator09 = funcGen09();
let question02 = generator09.next().value;
console.log('question: ' + question02); // "4 - 4 = ?"
generator09.throw(new Error('wrong number')); // Error: wrong number