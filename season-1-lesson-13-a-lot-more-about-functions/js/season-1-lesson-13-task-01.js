var firstClass = 'first';
var secondClass = 'second';
var thirdClass = 'third';
var firstElement = document.getElementsByClassName(firstClass);
var secondElement = document.getElementsByClassName(secondClass);
var thirdElement = document.getElementsByClassName(thirdClass);

var addMyNameClass = 'addMyName';
var addMyLastNameClass = 'addMyLastName';
var addMyNameElement = document.getElementsByClassName(addMyNameClass);
var addMyLastNameElement = document.getElementsByClassName(addMyLastNameClass);

var hideClass = 'hide';
var showClass = 'show';
var hideElement = document.getElementsByClassName(hideClass);
var showElement = document.getElementsByClassName(showClass);
var invisibleClass = 'invisible';
var visibleClass = 'visible';

var someWindowClass = 'some-window';
var someWindowElement = document.getElementsByClassName(someWindowClass);
var hidingClass = 'hiding';
var showingClass = 'showing';

/*-------------------------------------------------------------------------------------------------------------------*/

myName = 'John';
myLastname = 'Shepard';

function addSomethingToInput(element, something) {
    if (element[0] != null) {
        element[0].value = something;
    };
};

addMyNameElement[0].onclick = function () {
    addSomethingToInput(firstElement, myName);
    addSomethingToInput(secondElement, myName);
    addSomethingToInput(thirdElement, myName);
};

addMyLastNameElement[0].onclick = function () {
    addSomethingToInput(firstElement, myLastname);
    addSomethingToInput(secondElement, myLastname);
    addSomethingToInput(thirdElement, myLastname);
};

/*-------------------------------------------------------------------------------------------------------------------*/

function wantMySum(a, b) {
    var aa = parseInt(a); /*Используем функцию "parseInt()", чтобы привести строку к числу.*/
    var bb = parseInt(b);
    var c = aa + bb;
    return c;
};

/*Чтобы вызвать при помощи функции "setTimeout()" другую функцию, которая принимает какие-то параметры, для последней
функции нужно создать функцию-обвертку, внутри которой будет вызываться нужная нам функция с нужными параметрами. Далее
эту функцию-обвертку мы должны поместить в функцию "setTimeout()".*/
function wantMySumInOneSecond() {
    console.log('23 + 23 in 1 second = ' + wantMySum(23, 23));
};

setTimeout(wantMySumInOneSecond, 1000);

console.log('34 + 23 = ' + wantMySum(34, 23));
console.log('"34" + "23" = ' + wantMySum('34', '23'));

/*-------------------------------------------------------------------------------------------------------------------*/

function makeItInvisible(element) {
    if (element[0] != null) {
        element[0].classList.remove(visibleClass); /*Таким образом мы удаляем какой-то отдельный класс из списка классов
        у HTML-элемента.*/
        element[0].className = element[0].className + ' ' + invisibleClass;
    };
};

function makeItVisible(element) {
    if (element[0] != null) {
        element[0].classList.remove(invisibleClass);
        element[0].className = element[0].className + ' ' + visibleClass;
    };
};

hideElement[0].onclick = function () {
    makeItInvisible(firstElement);
    makeItInvisible(secondElement);
    makeItInvisible(thirdElement);
};

showElement[0].onclick = function () {
    makeItVisible(firstElement);
    makeItVisible(secondElement);
    makeItVisible(thirdElement);
};

/*-------------------------------------------------------------------------------------------------------------------*/

/*Функция должна работать только с теми переменными, которые объявлены в теле этой функции. Если функции нужно
использовать какие-либо данные вне ее тела, то такие данные должны передаваться в эту функцию как параметр.*/
function giveMeInfinity(counter) {
    setInterval(function () {
        counter++;
        console.log(counter);
    }, 1000);
};

giveMeInfinity(0); /*Бесконечный счетчик от 0 и далее.*/

/*-------------------------------------------------------------------------------------------------------------------*/

function removeSomething(someClass) {
    element = document.getElementsByClassName(someClass);
    if (element[0] != null) { /*Делаем проверку, чтобы избежать ошибки.*/
        element[0].remove(); /*Таким образом удаляем какой-либо HTML-элемент со страницы.*/
    };
};

removeSomething(firstClass);
removeSomething('firstClass1'); /*Используем несуществующий класс. Из-за проверки не выдаст ошибку.*/

/*-------------------------------------------------------------------------------------------------------------------*/

function shrinkSomething(element) { /*Функция для плавного скрытия HTML-элемента.*/
    if (element[0] != null) {
        element[0].classList.add(hidingClass); /*Таким образом мы добавляем какой-то отдельный класс к списку классов у
        HTML-элемента.*/
    };
};

function shrinkSomeWindow() { /*Обвертка для "shrinkSomething()".*/
    shrinkSomething(someWindowElement);
};

setTimeout(shrinkSomeWindow, 1000); /*Скрываем HTML-элемент.*/

function unshrinkSomething(element) { /*Функция для плавного раскрытия HTML-элемента.*/
    if (element[0] != null) {
        element[0].classList.remove(hidingClass);
        element[0].classList.add(showingClass);
    };
};

function unshrinkSomeWindow() { /*Обвертка для "unshrinkSomething()".*/
    unshrinkSomething(someWindowElement);
};

setTimeout(unshrinkSomeWindow, 3000); /*Раскрываем HTML-элемент.*/

/*-------------------------------------------------------------------------------------------------------------------*/

var arrayOfHTML = []; /*Создаем пустой массив.*/

/*Заполняем наш массив HTML-элементами.*/
arrayOfHTML.push(secondElement[0]);
arrayOfHTML.push(thirdElement[0]);

function deleteSomethingByValue(someArray, someValue) {
    for (var i = 0; i < someArray.length; i++) { /*Пробегаемся по нашему массиву.*/
        if (someArray[i].value === someValue) { /*Если какой-то элемент массива имеет определенное значение атрибута
        "value", то удаляем его.*/
            someArray[i].remove();
        };
    };
};

setTimeout(function () { /*Таким образом можно передавать в функцию "setTimeout()" функцию с указанием
параметров для нее.*/
    deleteSomethingByValue(arrayOfHTML, 'Second');
}, 2000);

/*-------------------------------------------------------------------------------------------------------------------*/

function logSum(sum) { /*Создаем callback-функцию.*/
    console.log('sum of [3, 2, 1, 4] = ' + sum);
};

function sumArray(someArray, someFunction) {
    var sum = 0;
    for (var i = 0; i < someArray.length; i++) {
        sum = sum + someArray[i];
    };
    someFunction(sum); /*Здесь будет вызываться callback-функцию.*/
};

sumArray([3, 2, 1, 4], logSum);

/*-------------------------------------------------------------------------------------------------------------------*/

function plusOne(someNumber) {
    someNumber = someNumber + 1;
    console.log(someNumber);
};

function plusTwo(someNumber) {
    someNumber = someNumber + 2;
    console.log(someNumber);
};

function plusThree(someNumber) {
    someNumber = someNumber + 3;
    console.log(someNumber);
};

/*Здесь для каждого элемента массива "someNumberArray" применяем одну из функций второго массива
"[func1, func2, func3]", указывая параметр "command".*/
function mainBrain(someNumberArray, [func1, func2, func3], command) {
    switch (command) {
        case 1:
            for (var i = 0; i < someNumberArray.length; i++) {
                func1(someNumberArray[i]);
            };
            break;
        case 2:
            for (var i = 0; i < someNumberArray.length; i++) {
                func2(someNumberArray[i]);
            };
            break;
        case 3:
            for (var i = 0; i < someNumberArray.length; i++) {
                func3(someNumberArray[i]);
            };
            break;
        default:
            console.log('What?!');
    };
};

mainBrain([37, 38, 39], [plusOne, plusTwo, plusThree], 2);

/*Здесь для каждого элемента массива "someNumberArray" применяем каждую из функций второго массива "someFuncArray".*/
function mainBrainSecond(someNumberArray, someFuncArray) {
    for (var i = 0; i < someNumberArray.length; i++) {
        for (var j = 0; j < someFuncArray.length; j++) {
            someFuncArray[j](someNumberArray[i]);
        };
    };
};

var funcArray = [plusOne, plusTwo, plusThree];

mainBrainSecond([37, 38, 39], funcArray);