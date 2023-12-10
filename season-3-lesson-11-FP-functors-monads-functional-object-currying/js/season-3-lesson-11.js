'use strict';

/*
Функционнальное программирование содержит чистые функции:
1. Иммутабельность - если в функцию в качестве параметра пришел объект, то его нельзя менять.
2. Функция должно что-то возвращать.
3. В функциях не должно быть поочных эффектов - обращений к глобальным переменным, запросов на сервер, асинхронной
работы и так далее.

ФП основывается на лямбда-вычислениях. Лямбда вычисления - это формальная система, которая решает вопрос вычислимости
алгоритма и является аналогом машины Тьюринга, то есть чтобы определить, что алгоритм будет работать, какое время будет
работать и будет воспроизводим на вычислительной технике. Лямбда-функция - это любая безымянная функция.
*/
/*-------------------------------------------------------------------------------------------------------------------*/

const sumSomething = (a, b) => a + b;
const sumSomethingAndSix = (a) => sumSomething(a, 6);
console.log(sumSomethingAndSix(5)); // 11

const multiplySomething = (a, b) => a * b;
const multiplySomethingAndThree = (a) => multiplySomething(a, 3);
console.log(multiplySomethingAndThree(5)); // 15

const sumSomethingAndSixThenMultiplyThree = (a) => multiplySomethingAndThree(sumSomethingAndSix(a));
console.log(sumSomethingAndSixThenMultiplyThree(5)); // 33
console.log('1------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "Math.floor()" округляет число вниз.*/
console.log(Math.floor(2.3)); // 2

/*Метод "Math.ceil()" округляет число вверх.*/
console.log(Math.ceil(2.3)); // 3
console.log('2------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Функтор - это функция, которая получает какой-то набор значений и какую-то функцию, распаковывает набор значений для
получения этих значений, вызывает полученную функцию с каждым из этих значенияй, упаковывает возвращенные значения в
новую структуру, и в конце возвращает эту структуру. При этом возвращенная структура не обязательно должна иметь тот же
тип, что и оригинальная. Метод "map()" является функтором.*/

const someArrayOne = [4, 6, 8];
const someArrayTwo = someArrayOne.map(sumSomethingAndSix);
console.log(someArrayTwo); // [10, 12, 14]
console.log(someArrayOne === someArrayTwo); // false, два разных массива

/*Метод "filter()" также является функтором.*/

const someArrayThree = someArrayOne.filter(element => element >= 6);
console.log(someArrayThree); // [6, 8]
console.log(someArrayOne === someArrayThree); // false, два разных массива

/*Метод "forEach()" не является функтором.*/
const someArrayFour = someArrayOne.forEach(element => element * 2);
console.log(someArrayFour); // undefined
console.log(someArrayOne); // [4, 6, 8]
console.log('3------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Функторы должны поддерживать композицию. Композиция функций - это вызов набора функций, вызов вызова следующей
функции, с результатами от предыдущей. Композиция функций работает слева направо.*/

const someArrayFive = [5, 7, 9];

function compose(f, g) {
    return function (x) {
        return f(g(x))
    };
};

/*Сначала будет умножение на 3, а потом добавление 6. Справа налево.*/
const someArraySix = someArrayFive.map(compose(sumSomethingAndSix, multiplySomethingAndThree));
console.log(someArraySix); // [ 21, 27, 33 ]
console.log(someArrayFive === someArraySix); // false, два разных массива

/*Сначала будет добавление 6, а потом умножение на 3. Слева направо.*/
const someArraySeven = someArrayFive.map(sumSomethingAndSix).map(multiplySomethingAndThree);
console.log(someArraySeven); //  [ 33, 39, 45 ]
console.log(someArrayFive === someArraySeven); // false, два разных массива
console.log('4------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если рассматривать строку как коллекцию символов, то можно написать функтор для строк. Символы имеют коды, которые на
деле являются числом. Поэтому, мы можем выполним функцию "sumSomethingAndSix()" на каждом коде символа, и запаковать
обратно в строку каждый полученный символ.*/

const someStringOne = 'ABC';

function functorForStrings(value, func) {
    /*Метод "split()"" разбивает строку на массив строк путем разделения строки указанной подстрокой. В качестве
    параметра можно определить символы, разделяющую элементы внутри строки. Если параметр опущен, то возвращённый массив
    будет содержать один элемент со всей строкой. Если параметр равен пустой строке, то строка будет преобразована в
    массив символов.*/
    let chars = value.split("");
    console.log(chars); // ["A", "B", "C"]

    return chars.map(function (char) {
        /*Метод "String.fromCharCode()" возвращает строку, созданную из указанной последовательности значений единиц
        кода UTF-16.*/
        /*Метод "charCodeAt()" возвращает числовое значение Юникода для символа по указанному индексу (за исключением
        кодовых точек Юникода, больших 0x10000).*/
        /*Метод "join()" объединяет все элементы массива (или массивоподобного объекта) в строку. В качестве параметра
        можно определить строку, разделяющую элементы массива.*/
        /*То есть здесь мы сначала получаем элемент массива, например, строку "A". Затем получаем ее "номер" - 65. Затем
        к этому номеру прибавляем 6, получаем 71. После этого находим символ под кодом 71 - "G". И так далее с каждым
        элементом массива. В итоге промапив исходный массив, мы превращаем новый массив в строку.*/
        return String.fromCharCode(func(char.charCodeAt(0)));
    }).join("");
};

const someStringTwo = functorForStrings(someStringOne, sumSomethingAndSix);
console.log(someStringTwo); // GHI
console.log('5------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

function someFuncOne(a = 1, b = 2, c = 3) {
    return a + b + c;
};

function someFuncTwo(d = 4, e = 5, f = 6) {
    return d * e * f;
};

/*Способом ниже можно получить аргументы функции, которые были переданы во втором вызове.*/
function lookAtArguments(fOne, fTwo) {
    return function (a, b, c, d, e, f) {
        console.log(a); // 1
        console.log(b); // 2
        console.log(c); // 3
        console.log(d); // 4 
        console.log(e); // 5
        console.log(f); // 6

        return function () {
            return console.log(fOne(a, b, c) + ' ' + fTwo(d, e, f)); // "6 120"
        };
    };
};

const partOne = lookAtArguments(someFuncOne, someFuncTwo); // nothing
const partTwo = partOne(1, 2, 3, 4, 5, 6); // 1 => 2 => 3 => 4 => 5 => 6
partTwo(); // "6 120"
/*Последни три строчки можно заменить одной.*/
// lookAtArguments(someFuncOne, someFuncTwo)(1, 2, 3, 4, 5, 6)();

// lookAtArguments(someFuncOne, someFuncTwo); // nothing
// lookAtArguments(someFuncOne, someFuncTwo)(1, 2, 3, 4, 5, 6); // 1 => 2 => 3 => 4 => 5 => 6
// lookAtArguments(someFuncOne, someFuncTwo)(1, 2, 3, 4, 5, 6)(); // 1 => 2 => 3 => 4 => 5 => 6 => "6 120"
console.log('6------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Мы можем написать функтор для типа, где значение является функцией.*/

function functorForFunction(value, func) { // Здесь будут параметры первого вызова.
    return function (second) { // Здесь будут параметры второго вызова.
        console.log(second); // 2

        return function (third) { // Здесь будут параметры третьего вызова.
            console.log(third); // 7

            return console.log(func(value(second))); // 10. Здесь "second" будет получен через замыкание.
        };
    };
};

const firstCall = functorForFunction(function (x) { return x * x }, sumSomethingAndSix);
const secondCall = firstCall(2); // 2
secondCall(7); // 7 => 10
/*Последни три строчки можно заменить одной.*/
// functorForFunction(function (x) { return x * x }, sumSomethingAndSix)(2)(7);

// functorForFunction(function (x) { return x * x }, sumSomethingAndSix); // nothing
// functorForFunction(function (x) { return x * x }, sumSomethingAndSix)(2); // 2
// functorForFunction(function (x) { return x * x }, sumSomethingAndSix)(2)(7); // 2 => 7 => 10


/*Вариант с 4-мя вызовами.*/
// function functorForFunction(value, func) { // Здесь будут параметры первого вызова.
//     return function (second) { // Здесь будут параметры второго вызова.
//         console.log(second[0]); // 2

//         return function (third) { // Здесь будут параметры третьего вызова.
//             console.log(third); // 7

//             return function (fourth) { // Здесь будут параметры четвертого вызова.
//                 console.log(fourth); // 11
//                 const someNewArray = [];
//                 someNewArray[0] = func(value(second[0])); // [10]. Здесь "second" будет получен через замыкание.
//                 console.log(someNewArray[0]); // 10

//                 return someNewArray;
//             };
//         };
//     };
// };

// const someArrayEight = [2];
// const firstCall = functorForFunction(function (x) { return x * x }, sumSomethingAndSix); // nothing
// const secondCall = firstCall(someArrayEight); // 2
// const thirdCall = secondCall(7); // 7
// const fourthCall = thirdCall(11); // 11 => 10
// console.log(someArrayEight); // [2]
// console.log(fourthCall);// [10]
// console.log(someArrayEight === fourthCall); // false
console.log('7------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

function canWeUseIt(value, func) {
    return value === null || value === undefined ? value : func(value);
};

console.log(canWeUseIt(undefined, compose(sumSomethingAndSix, multiplySomethingAndThree))); // undefined
console.log(canWeUseIt(canWeUseIt(undefined, multiplySomethingAndThree), sumSomethingAndSix)); // undefined
console.log(canWeUseIt(1, compose(sumSomethingAndSix, multiplySomethingAndThree))); // 1 * 3 = 3 => 3 + 6 => 9
console.log(canWeUseIt(canWeUseIt(1, multiplySomethingAndThree), sumSomethingAndSix)); // 1 * 3 = 3 => 3 + 6 => 9

/*Функтор "canWeUseIt()" полезен для короткой проверки на неопределенность значения (монада Maybe). Его можно его
использовать как замену для следующего кода:*/
// if (result === null) {
//     return null
// } else {
//     return doSomething(result)
// };
console.log('8------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Функторы так же должны поддерживать идентичность.*/
let someArrayNine = [1, 2, 3];
let someArrayTen = someArrayNine.map(id => id);
console.log(someArrayTen); // [1, 2, 3]
console.log(someArrayNine === someArrayTen); // false
console.log('9------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Функтор, сделанный при помощи замыкания, безопаснее функторов, сделанных на классах или прототипах, так как во втором
случае, то значение, которое будет храниться в этом функторе, у всех к нему доступ.*/

/*Создаем конструктор.*/
function CanWeUseItTwo(x) {
    this.x = x;
};

CanWeUseItTwo.prototype.map = function (func) {
    if (this.x && func) {
        return new CanWeUseItTwo(func(this.x)); // Создаем новый экземпляр.
    } else {
        return new CanWeUseItTwo(null); // Создаем новый экземпляр.
    };
};

/*Сначала создается первый объект с x = 5. Затем у первого объекта вызываем метод "map()" без аргументов, как результат
будет создан второй объект с x = null. Затем уже у второго "пустового" объекта вызываем метод "map()", передав в
качестве параметра функцию, следовательно в консоли будет пусто, так как снова будет создан уже третий объект с
x = null.*/
new CanWeUseItTwo(5).map().map(console.log);

/*Сначала создается первый объект с x = 5. Затем у первого объекта вызываем метод "map()", передав в качестве параметра
функцию, как результат создаем второй объект с x = 10. Затем уже у второго объекта вызываем метод "map()", передав в
качестве параметра другую функцию, следовательно в консоли будет 10, так как будет создан уже третий объект с x = 10.*/
new CanWeUseItTwo(5).map(x => x * 2).map(console.log); // 10

/*Сначала создается первый объект с x = null. Затем у первого объекта вызываем метод "map()", передав в качестве
параметра функцию, как результат создаем второй объект с x = null. Затем уже у второго "пустового" объекта вызываем
метод "map()", передав в качестве параметра другую функцию, следовательно в консоли будет пусто, так как будет создан
уже третий объект с x = null.*/
new CanWeUseItTwo(null).map(x => x * 2).map(console.log);

/*Это вариант с использованием тернарного оператора.*/
CanWeUseItTwo.prototype.mapTwo = function (func) {
    return new CanWeUseItTwo(this.x && func ? func(this.x) : null);
};

new CanWeUseItTwo(5).mapTwo().mapTwo(console.log); // nothing
new CanWeUseItTwo(5).mapTwo(x => x * 2).mapTwo(console.log); // 10
new CanWeUseItTwo(null).mapTwo(x => x * 2).mapTwo(console.log); // nothing
console.log('10-----------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Теперь сделаем похожий функтор, только на замыкании и рекурсии.*/
function canWeUseItThree(x) { // Здесь параметры первого вызова.
    return function (func) { // Здесь параметры второго вызова.
        if (x && func) { // "x" и "func" берутся из замыкания.
            return canWeUseItThree(func(x));
        } else {
            return canWeUseItThree(null);
        };
    };
};

canWeUseItThree(5)()(console.log); // nothing
canWeUseItThree(5)(x => ++x)(console.log); // 6
canWeUseItThree(5)(x => x * 2)(console.log); // 10
canWeUseItThree(null)(x => x * 2)(console.log); // nothing

/*Разберем самый сложный пример:
1. Делаем первый вызов функцию "canWeUseItThree()" с x = 5.
2. Затем вызывается функция внутри с параметром в виде функции "x => x * 2".
3. Поскольку у нас есть и "x" и "func", то попадаем в первую ветвь if-блока.
4. Возвращается еще один вызов функции "canWeUseItThree()", параметр которой высчитывается как 5 => 5 * 2, то есть
x = 10.
5. Затем вызывается функция внутри с параметром в виде функции "x => ++x" (дело происходит уже во втором вызове функции
"canWeUseItThree()").
6. Поскольку у нас снова есть и "x" и "func", то попадаем в первую ветвь if-блока.
7. Возвращается еще один вызов функции "canWeUseItThree()" (третьий по счету), параметр которой высчитывается как
10 => ++10, то есть x = 11.
8. Затем вызывается функция внутри с параметром в виде функции "console.log" (дело происходит уже во третьем вызове
функции "canWeUseItThree()").
9. Поскольку у нас опять есть и "x" и "func", то попадаем в первую ветвь if-блока.
10. Возвращается еще один вызов функции "canWeUseItThree()" (четвертый по счету), параметр которой высчитывается как
"console.log(11)", то в консоли отобразится 11. Поскольку "console.log()" ничего не возвращает, то параметром
четвертового вызова функции "canWeUseItThree()" будет "undefined".
11. Четвертый вызов функции "canWeUseItThree()" по сути ничего не делает и завершает свою работу, так как вызова функции
внутри мы уже не делаем.
12. После завершения работы четвертого вызова функции "canWeUseItThree()", соотвественно третьему вызову функции
"canWeUseItThree()" ничего не передается и он тоже завершает свою работу.
13. После завершения работы третьего вызова функции "canWeUseItThree()", соотвественно второму вызову функции
"canWeUseItThree()" ничего не передается и он тоже завершает свою работу.
14. После завершения работы второго вызова функции "canWeUseItThree()", соотвественно первому вызову функции
"canWeUseItThree()" ничего не передается и он тоже завершает свою работу.
15. После этого нет смысла пытаться делать еще вызовы с какими-либо параметрами, так как будет нечего вызывать.*/
canWeUseItThree(5)(x => x * 2)(x => ++x)(console.log); // 11
canWeUseItThree(5)(x => x * 2)(x => ++x)(console.log)(x => ++x)(5)(console.log); // 11

/*Это вариант с использованием тернарного оператора.*/
const canWeUseItFour = x => func => canWeUseItFour(x && func ? func(x) : null);

canWeUseItFour(5)()(console.log); // nothing
canWeUseItFour(5)(x => ++x)(console.log); // 6
canWeUseItFour(5)(x => x * 2)(console.log); // 10
canWeUseItFour(null)(x => x * 2)(console.log); // nothing
canWeUseItFour(5)(x => x * 2)(x => ++x)(console.log); // 11
canWeUseItFour(5)(x => x * 2)(x => ++x)(console.log)(x => ++x)(5)(console.log); // 11
console.log('11-----------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Теперь сделаем аппликативный функтор при помощи прототипов. Аппликативный функтор - это функтор, который может
распаковать функтор со значением, фунтор с функцией, применить функцию к значению, полученный результат упаковать в
функтор.*/

/*Создаем конструктор.*/
function CanWeUseItSix(x) {
    this.x = x;
};

CanWeUseItSix.prototype.map = function (func) {
    /*Если есть "x" и была передана функция "func", то вызываем эту функцию с параметром в виде "x", иначе "null."*/
    const result = (this.x && func) ? func(this.x) : null;
    // console.log(result);

    /*Оператор "instanceof" проверяет, принадлежит ли объект к определенному классу. Если в предыдущей строке мы уже
    получили объект класса "CanWeUseItSix", тогда его и возвращаем, иначе создаем объект, где в качестве "x" будет
    значение "result".*/
    return result instanceof CanWeUseItSix ? result : new CanWeUseItSix(result);
};

/*Здесь в метод "appply" функтора мы передаем другой функтор.*/
CanWeUseItSix.prototype.appply = function (functor) {
    /*Здесь мы сначала из текущего функтора вызываем метод "map()", чтобы получить значение "value". И дальше это
    "value" попадает в другой функтор, и уже вызываем метод "map()" у этого другого функтора, чтобы получить из этого
    функтора функцию, чтобы в итоге вызвать эту функцию со значением "value".*/
    return this.map(value => functor.map(f => f(value)));
};

const canWeUseItSixInstOne = new CanWeUseItSix(5);
const functorOne = new CanWeUseItSix(x => x * 2);
const functorTWo = new CanWeUseItSix(x => ++x);

/*"canWeUseItSixInstOne" это объект с "x = 5". Сначала у этого объекта мы вызываем метод "appply()" и передаем в него
параметр в виде "functorOne" - объекта, где "x" это функция "x => x * 2". Что происходит внутри этого метода "appply()":

1. Вызываем метод "appply()" у объекта "canWeUseItSixInstOne".
2. В качестве параметра для этого метода используем "functorOne" - объект, где "x" это функция "x => x * 2".
3. То есть "functor" в этом вызове метода "appply()" равен объект "functorOne".
4. Этот метод "appply()" возвращает результат "this.map(value => functor.map(f => f(value)));".
5. В указанной строке кода сначала вызывается метод "map()" в текущем контексте, то есть в объекте
"canWeUseItSixInstOne".
6. Внутри этого вызова метода "map()" мы находим "result".
7. Поскольку в этом вызове метода "map()" "this.x" будет равен "5", а "func" будет равен
"value => functor.map(f => f(value))", то мы выполняем "func(this.x)", то есть "5 => functor.map(f => f(5))".
8. Далее в последнем указанном куске кода мы должны выполнить метод "map()" у "functor", то есть у объекта "functorOne",
передав параметр "f => f(5)".
9. В этом втором вызове метода "map()" мы находим "result".
10. Поскольку в этом втором вызове метода "map()" "this.x" будет равен функции "x => x * 2", а "func" будет равен
"f => f(5)", то мы выполняем "func(this.x)", то есть "(x => x * 2) => (x => x * 2)(5)". Грубо говоря, мы должны в итоге
вызвать функцию "x => x * 2" с параметром "5" и получить 10.
11. Затем в этом втором вызове метода "map()" возвращается "result".
12. Так как "result" равен "10", то он не является экземпляром "CanWeUseItSix", поэтому мы создаем новый объект класса
"CanWeUseItSix" c "x = 10".
13. Далее этот новый созданные объект получает наш первый вызов метода "map()", который мы делали в объекте
"canWeUseItSixInstOne".
14. В этом первом вызове в "result" сохраняется объект, полученный из второго вызова метода "map()".
15. Этот первый вызов метода "map()" должен вернуть "result".
16. Поскольку в этот раз "result" уже является экземпляром класса "CanWeUseItSix", то мы ничего не делаем с этим
"result" и отдаем этот объект наружу дальше методу "appply()".
17. Метод "appply()" в свою очередь возвращает дальше наружу полученный объект класса "CanWeUseItSix" с "x = 10".

18. Далее у этого объекта мы делаем второй вызом метода "appply()", передав в него объект "functorTWo", то есть объект,
где x это функция "x => ++x".
19. Далее повторяются шаги аналогичные шагам 1-17.
20. Главное отличие здесь будет в том, что в один момент мы будем использовать функцию "x => ++x" вместо "x => x * 2" и
применять мы будем эту функцию уже над "10", а не на "5".
21. То есть в итоге наружу вернется объект класса "CanWeUseItSix" с "x = 11".

22. Затем у этого объекта мы уже вызываем метод "map()", передав в качестве параметра "console.log".
23. Внутри этого вызова метода "map()" мы находим "result".
24. Поскольку в этом вызове метода "map()" "this.x" будет равен "11", а "func" будет равен "console.log", то мы
выполняем "func(this.x)", то есть "console.log(11)".
25. В итоге в консоли мы увидим "11".
26. Поскольку "console.log" ничего не возвращает, поэтому в "result" будет "undefined".
27. Затем в этом вызове возвращается "result".
28. Поскольку в этот раз "result" не является экземпляром класса "CanWeUseItSix", поэтому мы создаем новый объект класса
"CanWeUseItSix" c "x = undefined".
29. В итоге этот объект возвращается методом "map()" наружу.
30. Поскольку в этом объекте "x = undefined", то при дальнейшем применении методов "appply()" и "map()" мы будем
получать новые объекта класса "CanWeUseItSix" c "x = null", соотвественно в консоли мы ничего не увидим больше.
*/
let iAmNothing = canWeUseItSixInstOne.appply(functorOne).appply(functorTWo).map(console.log); // 11
console.log(iAmNothing);
console.log('12-----------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Теперь сделаем аппликативный функтор при помощи замыкания и чейнинга.*/

/*Для удобства создаем объект, куда будем складывать все нужные нам функции.*/
const fp = {};

/*Добавляем в наш объект метод "mapNull()", который на входе получает какую-то функцию и какое-то значение. Если это
какое-то значение было передано, то применяем полученную функцию к этому значению.*/
fp.mapNull = (func, x) => (x ? func(x) : null);

/*Добавляем в наш объект метод "canWeUseIt()", который на входе получает какое-то значение, попадающее в дальнейшем в
замыкание. Внутри этого метода мы создаем функцию "map()". Далее к этой функции мы создаем еще две функции "appply()" и
"chain()". Функции "map()" и "appply()" это аналоги одноименных методов из предыдущего примера, а функция "chain()"
нужна для осуществления применения функций по цепочке. В итоге этот метод "canWeUseIt()" возвращает функцию "map". Здесь
получается, что:
1. функция "map()" позволяет применять функции к значениям, переданным в функтор;
2. функция "appply()" позволяет применять другие функторы к значению в другом функторе;
3. функция "chain()" позволяет применять функции, которые возвращают функторы, к значению в другом функторе, то есть
грубо говоря позволяет делать цепочки вычислений.
Функтор, который имеет методы "map()" и "appply()", называется аппликативный функтор.
Функтор, который имеет методы "map()", "appply()" и "chain()", называется монада.*/
fp.canWeUseIt = x => {
    const map = func => fp.canWeUseIt(fp.mapNull(func, x));
    map.appply = funcA => funcA(func => fp.mapNull(func, x));
    map.chain = funcM => funcM(x);

    return map;
};

fp.canWeUseIt(5)(x => x * 2)(x => ++x)(console.log); // 11
// let step1 = fp.canWeUseIt(5); // Вернет функцию "map()", где везде "x" равен "5".
// let step2 = step1(x => x * 2); // Вернет функцию "map()", где везде "x" равен "10".
// let step3 = step2(x => ++x); // Вернет функцию "map()", где везде "x" равен "11".
// let step4 = step3(console.log); // В консоль выводим 11. Вернет функцию "map()", где везде "x" равен "undefined".

fp.canWeUseIt(5)(x => x * 2).appply(fp.canWeUseIt(x => ++x))(console.log); // 11
// let step1 = fp.canWeUseIt(5); // Вернет функцию "map()", где везде "x" равен "5".
// let step2 = step1(x => x * 2); // Вернет функцию "map()", где везде "x" равен "10".
// let step3 = step2.appply(fp.canWeUseIt(x => ++x));
/*
Здесь мы обращаемся к функции "map()", где везде "x" равен "10", и вызываем у нее функцию "appply()", которая должна
выглядеть примерно как "map.appply = funcA => funcA(func => fp.mapNull(func, 10));".

Мы вызываем эту функцию "appply()" с параметром "fp.canWeUseIt(x => ++x)", поэтому мы должны сначала узнать чему будет
равен этот параметр. То есть мы должны сначала вызвать функцию "fp.canWeUseIt()" с параметром в виде функции "x => ++x".

В итоге эта функция "fp.canWeUseIt()" вернет функцию "map()", где везде "x" равен функции "x => ++x". Получается, что
параметром для функции "appply()" станет другая функция "map()", где везде "x" равен функции "x => ++x".

Нужно помнить, что мы вызываем эту функцию "appply()" в контексте функции "map()", где везде "x" равен "10". Значит в
строке кода "map.appply = funcA => funcA(func => fp.mapNull(func, 10));" "funcA" будет равен функции "map()", где везде
"x" равен функции "x => ++x". То есть мы должно вызвать функцию
"map = func => fp.canWeUseIt(fp.mapNull(func, x => ++x));" с параметром в виде функции "func => fp.mapNull(func, 10)",
то есть примерно следующее:
"map = ( func => fp.mapNull(func, 10) ) => fp.canWeUseIt(fp.mapNull( (func => fp.mapNull(func, 10)) , (x => ++x) ));".

Попробуем разобраться как сработает эта функция "map()". Сначала мы должны расчитать параметр для функции
"fp.canWeUseIt()". Для этого мы должны вызвать функцию "fp.mapNull()" с параметром "func" равным функции
"func => fp.mapNull(func, 10)" и параметром "x" равным функции "x => ++x". Внутри функции "fp.mapNull()" мы вызовем
функцию "func => fp.mapNull(func, 10)" с параметром в виде функции "x => ++x", то есть примерно это -
"x => ++x => fp.mapNull(x => ++x, 10)". Это означает, что мы вызываем еще одну функцию "fp.mapNull()" с параметром
"func" равным функции "x => ++x" и параметром "x" равным "10", что в итоге вернет нам "11". Получается, что предыдущий
вызов функции "fp.mapNull()" получит это "11" и вернет это "11" наверх ввиде параметра для функции "fp.canWeUseIt()".
Эта функция "fp.canWeUseIt()" вернет функцию "map()", где везде "x" равен "11", что в итоге и сохранится в переменную
"step3".
*/
// let step4 = step3(console.log); // В консоль выводим 11. Вернет функцию "map()", где везде "x" равен "undefined".                                

fp.canWeUseIt(5).chain(x => fp.canWeUseIt(x * 2))(x => ++x)(console.log); // 11
// let step1 = fp.canWeUseIt(5); // Вернет функцию "map()", где везде "x" равен "5".
// let step2 = step1.chain(x => fp.canWeUseIt(x * 2)); // Вернет функцию "map()", где везде "x" равен "10".
// let step3 = step2(x => ++x); // Вернет функцию "map()", где везде "x" равен "11".
// let step4 = step3(console.log); // В консоль выводим 11. Вернет функцию "map()", где везде "x" равен "undefined".

/*Небольшой пример использования.*/
const config = {
    coords: {
        x: 0,
        y: 5
    },

    velocity: {
        x: 1,
        y: 1
    }
};

const addVelocity = velocity => coords => {
    coords.x += velocity.x;
    coords.y += velocity.y;

    console.log(coords.x);
    console.log(coords.y);
};

const coords = fp.canWeUseIt(config.coords);
const velocity = fp.canWeUseIt(config.velocity);
coords.appply(velocity(addVelocity))(console.log); // В консоли будет пусто

console.log(config); // Но объект изменится
console.log('13-----------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Функторы в JS порой могут улучшить синтаксис.*/