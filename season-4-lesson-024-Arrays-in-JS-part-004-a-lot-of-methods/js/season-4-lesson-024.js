'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Поскольку массивы являются объектами, то для удаления элементов можно использовать "delete". При этом вместо 
удаленного элемента будет пустой слот и длинна массива не измениться, так как "delete" удаляет значение по ключу, а
не весь элемент.*/
let array1 = [1, 2, 3];
delete array1[1];
console.log(array1); // [1, <1 empty slot>, 3]
console.log(array1.length); // 3

/*Для добавления, удаления и изменения элементов в массиве лучше использовать метод "splice()". Первым параметром
указывается индекс элемента с которого должны начаться изменения. Вторым параметром указывается как много элементов
нужно удалить. Третьим и последующими параметрами указываются элементы, которые должны быть добавлены вместо 
удаленных. В конце работы будет возвращен массив из удаленных элементов. Допускается использование отрицательных
индексов.*/
let array2 = [1, 2, 3, 4, 5];
console.log(array2.splice(1, 1)); // [2]
console.log(array2); // [1, 3, 4, 5]

console.log(array2.splice(1, 2, 6, 7)); // [3, 4]
console.log(array2); // [1, 6, 7, 5 ]

console.log(array2.splice(2, 0, 8, 9)); // []
console.log(array2); // [1, 6, 8, 9, 7, 5]

console.log(array2.at(-1)); // 5
console.log(array2.at(array2.length - 1)); // 5

console.log(array2.splice(-1, 2, 10, 11)); // [5]
console.log(array2); // [1, 6, 8, 9, 7, 10, 11]

console.log(array2.splice(2)); // [8, 9, 7, 10, 11]
console.log(array2); // [1, 6]

let obj0 = { a: 1 };
let array2_1 = [1, 2, obj0];
let item0 = array2_1.splice(2, 1);
console.log(item0);
console.log(item0[0] === obj0); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "slice()" возвращает новый массив с указанного начального индекса до указанного конечного индекса (конец не 
включительно) какого-то массива. Допускается использование отрицательных индексов.*/
let array3 = [1, 2, 3, 4, 5, {}];
console.log(array3.slice(1, 3)); // [2, 3]
console.log(array3.slice(1)); // [2, 3, 4, 5, {}]
console.log(array3.slice(-2)); // [5, {}]
console.log(array3.slice(-4, -2)); // [3, 4]
console.log(array3.slice()); // [1, 2, 3, 4, 5, {}]
let array3_1 = array3.slice();
console.log(array3[5] === array3_1[5]); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "concat()" возвращает новый массив, в который копирует данные из других массивов и дополнительные значения. В
качестве параметров могут приниматься как массивы, так и другие значения.*/
let array4 = [1, 2, 3, 4, 5];
let array5 = [9, 10]
console.log(array4.concat([6, 7])); // [1, 2, 3, 4, 5, 6, 7]
console.log(array4.concat([6, 7], 8)); // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(array4.concat([6, 7], 8, array5)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(array4.concat([6, 7], [], { a: 1 })); // [1, 2, 3, 4, 5, 6, 7, { a: 1 }]

/*Если использовать массивоподобный объект со специальным свойством "Symbol.isConcatSpreadable", то он обработается
как массив.*/
let arrayLike1 = {
    0: 'a',
    1: 'b',
    [Symbol.isConcatSpreadable]: true,
    length: 2
};

console.log(array4.concat(arrayLike1)); // [1, 2, 3, 4, 5, 'a', 'b']

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "forEach()" позволяет запускать функцию для каждого элемента массива. В запускаемой функции может быть до трех
параметров. Первый - элемент массива, второй - его индекс, третий - сам массив. Результат функции, если он есть, 
отбрасывается и игнорируется.*/
let array6 = [1, 2, 3];

array6.forEach(
    (item, index, array) => {
        console.log(item);
        console.log(index);
        console.log(array);

        return 777;
    }
);

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "indexOf()" ищет указанный в первом параметре элемент в массиве, начиная с индекса указанного во втором 
параметре, и возвращает его индекс. Если элемент не найден то вернется -1. Можно использовать только с первым 
параметром.*/
let array7 = [1, 2, 3, 2];
console.log(array7.indexOf(2)); // 1
console.log(array7.indexOf(2, 0)); // 1
console.log(array7.indexOf(2, 2)); // 3
console.log(array7.indexOf(4)); // -1
console.log(array7.indexOf(4, 0)); // -1

/*Метод "includes()" ищет указанный в первом параметре элемент в массиве, начиная с индекса указанного во втором 
параметре, и возвращает true если элемент найден, иначе false. Можно использовать только с первым параметром.*/
console.log(array7.includes(2)); // true
console.log(array7.includes(2, 0)); // true
console.log(array7.includes(2, 2)); // true
console.log(array7.includes(4)); // false
console.log(array7.includes(4, 0)); // false

/*Оба метода "indexOf()" и "includes()" используют строгое сравнение.*/

/*Метод "lastIndexOf()" работает как и метод "indexOf()", только слева направо.*/
console.log(array7.lastIndexOf(2)); // 3
console.log(array7.lastIndexOf(2, 0)); // -1
console.log(array7.lastIndexOf(2, 2)); // 1
console.log(array7.lastIndexOf(4)); // -1
console.log(array7.lastIndexOf(4, 0)); // -1

/*Метод "includes()" правильно обрабатывает NaN, в отличие от методов "indexOf()" и "lastIndexOf()".*/
let array8 = [1, 2, 3, NaN];
console.log(array8.includes(NaN)); // true
console.log(array8.indexOf(NaN)); // -1
console.log(array8.lastIndexOf(NaN)); // -1

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "find()" перебирает массив и ищет элемент в соотвествии с условием в виде указанной функции. Этот метод берет
каждый элемент массива и вызывает с ним в качестве параметра указанную функцию. Если указанная функция возвращает true, 
то поиск прекращается и возвращается найденный элемент, иначе возвращается undefined. Указаннная функция может 
принимать до трех параметров: элемент, индекс элемента и сам массив.*/
let array9 = [
    { a: 1 },
    { a: 2 },
    { a: 3 },
    { a: 3 },
    { a: 5 }
];

let item1 = array9.find(
    (item, index, array) => item.a === 3 && index === 2 && array
);

console.log(item1); // { a: 3 }
console.log(item1 === array9[2]); // true

/*Метод "findIndex()" работает также как и метод "find()", но он возвращает индекс найденного элемента, а не сам
элемент.*/
let index1 = array9.findIndex(
    (item, index, array) => item.a === 3 && index === 2 && array
);

console.log(index1); // 2

/*Метод "findLastIndex()" работает также как и метод "findIndex()", но ищет справа налево.*/
let index2 = array9.findLastIndex(
    (item, index, array) => item.a === 3 && index === 3 && array
);

console.log(index2); // 3

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "filter()" работает также как и метод "find()", только возвращает массив всех найденных элементов.*/
let array10 = [
    { a: 1 },
    { a: 2 },
    { a: 3 },
    { a: 3 },
    { a: 5 }
];

let items1 = array10.filter(
    (item, index, array) => item.a === 3
);

console.log(items1); // [ { a: 3 }, { a: 3 } ]
console.log(items1[0] === array10[2]); // true
console.log(items1[1] === array10[3]); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "map()" вызывает указанную функцию для каждого элемента массива и формирует новый массив с результатами
вызванных функций.*/
let array11 = [
    { a: 1 },
    { a: 2 },
    { a: 3 },
    { a: 3 },
    { a: 5 }
];

// let items2 = array11.map(
//     (item, index, array) => item.a * index * array.length
// );

let items2 = array11.map(
    (item, index, array) => { if (index !== 1) { return item.a * index * array.length } }
);

console.log(items2); // [ 0, undefined, 30, 45, 100 ]
console.log(array11);

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "sort()" сортирует массив. Элементы сортируются как строки по умолчанию. Этот метод также возвращает 
отсортированный массив.*/
let array12 = [15, 2, 1];
console.log(array12.sort()); // [ 1, 15, 2 ]
console.log(array12.sort() === array12); // true
console.log(array12); // [ 1, 15, 2 ]

/*Чтобы использовать собственный порядок сортировки, нужно предоставить функцию в качестве аргумента для метода 
"sort()". Массив для сортировки может быть массивом чего угодно. Чтобы отсортировать его, нужна упорядочивающая 
функция, которая знает, как сравнивать его элементы. По умолчанию элементы сортируются как строки. Метод "sort()" 
реализует общий алгоритм сортировки. Нам не нужно думать о том, как он работает внутри, так как в большинстве случаев 
это оптимизированная быстрая сортировка или Timsort. Она проходится по массиву, сравнивает его элементы с помощью 
предоставленной функции и переупорядочивает их. Все, что нам нужно, это предоставить функцию, которая делает само 
сравнение. От функции сравнения требуется любое положительное число, чтобы сказать "больше", и отрицательное число, 
чтобы сказать "меньше".*/
function compareNumeric(a, b) {
    console.log(a + ' <> ' + b);

    if (a > b) return 1;
    if (a === b) return 0;
    if (a < b) return -1;
};

let array13 = [15, 2, 1];
array13.sort(compareNumeric);
console.log(array13); // [ 1, 2, 15 ]

function compareNumeric2(a, b) {
    console.log(a + ' <> ' + b);

    return a - b;
};

let array14 = [1, -2, 15, 2, 0, 8];
array14.sort(compareNumeric2);
console.log(array14); // [ -2, 0, 1, 2, 8, 15 ]

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "reverse()" меняет порядок элементов в массиве на обратный. Также этот метод возвращает отсортированный 
массив.*/
let array15 = [1, 2, 3];
console.log(array15.reverse()); // [ 3, 2, 1 ]
console.log(array15.reverse() === array15); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "split()" разбивает строку на массив по заданному разделителю. У этого метода есть необязательный второй 
параметр, который ограничивает количество элементов в массиве.*/
let string1 = 'a, b, c';
let array16 = string1.split(', ');
console.log(array16); // [ 'a', 'b', 'c' ]

let array17 = string1.split(', ', 2);
console.log(array17); // [ 'a', 'b' ]

/*Метод "join()" создает строку из элементов массива, вставляя указанный разделитель между ними.*/
let array18 = ['a', 'b', 'c'];
let string2 = array18.join(', ');
console.log(string2); // 'a, b, c'

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Методы "reduce()" и "reduceRight()" похожи на "forEach", "for" или "for..of" в качестве перебора массивов и на 
метод "map()" если нужно перебрать массив и вернуть данные для каждого элемента. Методы "reduce()" и "reduceRight()" 
используются для вычисления единого значения на основе всего массива. В качестве параметра указывается функция, 
которая применяется по очереди ко всем элементам массива и переносит свой результат на следующий вызов в качестве 
первого аргумента. Эта указаннная функция принимает до 4-х параметров: результат предыдущего вызова этой функции 
(равен второму параметру метода при первом вызове), очередной элемент массива, его позиция, сам массив. По окончанию
работы метода возвращается аккумулирующий результат.*/
let arrray19 = [1, 2, 3, 4, 5];
let result1 = arrray19.reduce((accumulator, item, index, array) => accumulator + item, 0);
console.log(result1); // 0 + 1 = 1 >>> 1 + 2 = 3 >>> 3 + 3 = 6 >>> 6 + 4 = 10 >>> 10 + 5 = 15
let result2 = arrray19.reduce((accumulator, item, index, array) => console.log(accumulator));
console.log(result2); // 1 = 1 >>> 1 + 2 = 3 >>> 3 + 3 = 6 >>> 6 + 4 = 10 >>> 10 + 5 = 15

/*Метод "reduceRight()" работает аналогично, но проходит по массиву справа налево.*/
let result3 = arrray19.reduceRight((accumulator, item, index, array) => accumulator + item);
console.log(result3); // 5 + 4 + 3 + 2 + 1 = 15

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Массивы не образуют отдельный тип данных. Они основаны на объектах.*/
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object'
console.log(typeof {} === typeof []); // true

/*Метод "Array.isArray()" корректно проверяет являются ли данные массивом.*/
console.log(Array.isArray({})); // false
console.log(Array.isArray([])); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Почти все методы массива, которые вызывают функции – такие как "find()", "filter()", "map()", за исключением метода 
"sort()", принимают необязательный последний параметр "thisArg". Значение этого параметра становится "this" для 
указанной функции.*/
let obj1 = {
    minAge: 18,
    maxAge: 65
};

let obj2 = {
    canJoin(user) {
        return user.age >= this.minAge && user.age < this.maxAge;
    }
};

let array20 = [
    { age: 14 },
    { age: 18 },
    { age: 20 },
    { age: 64 },
    { age: 65 },
    { age: 66 },
    { age: 85 }
];

let result4 = array20.filter(obj2.canJoin, obj1);

console.log(result4.length); // 3
console.log(result4);

console.log('--------------------------------------');

// #1 NORMAL
// function camelize(str) {
//     return str
//         .split('-')
//         .map(
//             (item, index) => {
//                 if (index !== 0) {
//                     return item[0].toUpperCase() + item.slice(1);
//                 } else {
//                     return item;
//                 };
//             }
//         ).join('');
// };

// console.log(camelize('background-color'));
// console.log(camelize('-webkit-transition'));
// console.log('--------------------------------------');

// #2 EASY
// let arr = [5, 3, 8, 1];

// function filterRange(arr, a, b) {
//     return arr.filter(
//         (item) => {
//             if (item >= a && item <= b) {
//                 return true
//             };
//         }
//     );
// };

// let filtered = filterRange(arr, 1, 4);
// console.log(filtered);
// console.log(arr);
// console.log('--------------------------------------');

// #3 HARD Сортировка массива на месте.
// let arr = [5, 3, 2, 1, 8, 6, 7, 1];

// function filterRangeInPlace(arr, a, b) {
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] < a || arr[i] > b) {
//             arr.splice(i, 1);
//             i--;
//         };
//     };
// };

// filterRangeInPlace(arr, 1, 4);
// console.log(arr);
// console.log('--------------------------------------');

// #4 EASY
// let arr = [5, 2, 1, -10, 8];
// arr.sort((a, b) => b - a);
// console.log(arr);
// console.log('--------------------------------------');

// #5 EASY
// let arr = ['HTML', 'JavaScript', 'CSS'];

// function copySorted(arr) {
//     arr.slice(0).sort();
// };

// let sorted = copySorted(arr);
// console.log(sorted);
// console.log(arr);
// console.log('--------------------------------------');

// #6 HARD Расширяемый калькулятор.
// function Calculator() {
//     this.methods = {
//         '+': (a, b) => a + b,
//         '-': (a, b) => a - b
//     },

//     this.calculate = function (str) {
//         let participants = str.split(' ');
//         let a = +participants[0];
//         let operation = participants[1];
//         let b = +participants[2];

//         if (!this.methods[operation] || isNaN(a) || isNaN(b)) {
//             return NaN;
//         };

//         console.log(this.methods[operation](a, b));
//     },

//     this.addMethod = function(str, func) {
//         this.methods[str] = func;
//     }
// };

// let powerCalc = new Calculator;
// powerCalc.addMethod('*', (a, b) => a * b);
// powerCalc.addMethod('/', (a, b) => a / b);
// powerCalc.addMethod('**', (a, b) => a ** b);
// powerCalc.calculate('2 ** 3');
// console.log('--------------------------------------');

// #7 EASY
// let vasya = { name: 'Вася', age: 25 };
// let petya = { name: 'Петя', age: 30 };
// let masha = { name: 'Маша', age: 28 };
// let users = [vasya, petya, masha];

// let names = users.map(
//     (item) => item.name
// );

// console.log(names);
// console.log('--------------------------------------');

// #8 EASY
// let vasya = { name: 'Вася', surname: 'Пупкин', id: 1 };
// let petya = { name: 'Петя', surname: 'Иванов', id: 2 };
// let masha = { name: 'Маша', surname: 'Петрова', id: 3 };
// let users = [vasya, petya, masha];

// let usersMapped = users
//     .slice(0)
//     .map(
//         (item) => {
//             return {
//                 fullname: item.name + ' ' + item.surname,
//                 id: item.id
//             }
//         }
//     );

// console.log(usersMapped);
// console.log(users);
// console.log('--------------------------------------');

// #9 EASY
// let vasya = { name: 'Вася', age: 25 };
// let petya = { name: 'Петя', age: 30 };
// let masha = { name: 'Маша', age: 28 };
// let arr = [vasya, petya, masha];

// function sortByAge(arr) {
//     arr.sort((a, b) => a.age - b.age);
// };

// sortByAge(arr);
// console.log(arr);
// console.log('--------------------------------------');

// #10 VERY HARD Перемешивание массива
// // Вариант №1
// let arr = [1, 2, 3];

// function shuffle(array) {
//     array.sort(() => Math.random() - 0.5);
// };

// // подсчет вероятности для всех возможных вариантов
// let count = {
//     '123': 0,
//     '132': 0,
//     '213': 0,
//     '231': 0,
//     '321': 0,
//     '312': 0
// };

// for (let i = 0; i < 1000000; i++) {
//     let array = [1, 2, 3];
//     shuffle(array);
//     count[array.join('')]++;
// };

// // показать количество всех возможных вариантов
// console.log(count);

// /*Вариант №2, используя алгоритм под названием Тасование Фишера - Йетса. Суть заключается в том, чтобы проходить по 
// массиву в обратном порядке и менять местами каждый элемент со случайным элементом, который находится перед ним.*/
// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

//         // поменять элементы местами
//         // мы используем для этого синтаксис "деструктурирующее присваивание"
//         // то же самое можно записать как:
//         // let t = array[i]; array[i] = array[j]; array[j] = t
//         [array[i], array[j]] = [array[j], array[i]];
//     };
// };

// // подсчет вероятности для всех возможных вариантов
// let count = {
//     '123': 0,
//     '132': 0,
//     '213': 0,
//     '231': 0,
//     '321': 0,
//     '312': 0
// };

// for (let i = 0; i < 1000000; i++) {
//     let array = [1, 2, 3];
//     shuffle(array);
//     count[array.join('')]++;
// };

// // показать количество всех возможных вариантов
// console.log(count);
// console.log('--------------------------------------');

// #11 EASY
// let vasya = { name: 'Вася', age: 25 };
// let petya = { name: 'Петя', age: 30 };
// let masha = { name: 'Маша', age: 29 };
// let arr = [vasya, petya, masha];
// let getAverageAge = (arr) => arr.reduce((acc, item) => acc + item.age, 0) / arr.length;
// console.log(getAverageAge(arr));
// console.log('--------------------------------------');

// #12 NORMAL
// function unique(arr) {
//     let finalArr = [];

//     arr.forEach(
//         (item) => {
//             if (!finalArr.includes(item)) {
//                 finalArr.push(item);
//             };
//         }
//     );

//     return finalArr;
// };

// let strings = ['кришна', 'кришна', 'харе', 'харе', 'харе', 'харе', 'кришна', 'кришна', ':-O'];
// console.log(unique(strings));
// console.log('--------------------------------------');

// #13 NORMAL
// let users = [
//     { id: 'john', name: 'John Smith', age: 20 },
//     { id: 'ann', name: 'Ann Smith', age: 24 },
//     { id: 'pete', name: 'Pete Peterson', age: 31 },
// ];

// function groupById(arr) {
//     let resultObj = {};

//     for (let i = 0; i < arr.length; i++) {
//         resultObj[arr[i].id] = arr[i];
//     };

//     return resultObj;

//     // return arr.reduce(
//     //     (obj, value) => {
//     //         obj[value.id] = value;
//     //         return obj;
//     //     }, {});
// };

// let usersById = groupById(users);

// console.log(usersById);
// console.log('--------------------------------------');