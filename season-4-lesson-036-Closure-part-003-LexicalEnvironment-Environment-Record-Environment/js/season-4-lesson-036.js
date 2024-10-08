'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*В JavaScript у каждой выполняемой функции, блока кода {...} и скрипта есть связанный с ними внутренний (скрытый) 
объект, называемый лексическим окружением "LexicalEnvironment".

Объект лексического окружения состоит из двух частей:
1) "Environment Record" – объект, в котором как свойства хранятся все локальные переменные (а также некоторая другая 
информация, такая как значение this).
2) Ссылка на внешнее лексическое окружение ("LexicalEnvironment") – то есть то, которое соответствует коду снаружи 
(снаружи от текущих фигурных скобок).

Исходя из этого можно сказать, что переменная – это свойство специального внутреннего объекта "LexicalEnvironment", 
связанного с текущим выполняющимся блоком/функцией/скриптом, а работа с переменными – это на самом деле работа со 
свойствами этого объекта.*/

/*При запуске скрипта или в начале создания любой области видимости лексическое окружение предварительно заполняется 
всеми объявленными переменными. Изначально они находятся в состоянии "Uninitialized". Это особое внутреннее состояние, 
которое означает, что движок знает о переменной, но на нее нельзя ссылаться, пока она не будет объявлена с помощью 
"let/const/var". Это почти то же самое, как если бы переменная не существовала.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Function Declaration мгновенно инициализируется полностью. Когда создается лексическое окружение, Function 
Declaration сразу же становится функцией, готовой к использованию (в отличие от "let/const/var", который до момента 
объявления не может быть использован из-за состояния "Uninitialized"). Именно поэтому мы можем вызвать функцию, 
объявленную как Function Declaration, до самого ее объявления.*/

/*Когда запускается функция, в начале ее вызова автоматически создается новое лексическое окружение для хранения 
локальных переменных и параметров вызова.*/

/*Когда код хочет получить доступ к переменной – сначала происходит поиск во внутреннем лексическом окружении, затем во 
внешнем, затем в следующем и так далее, до глобального.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если переменная не была найдена, это будет ошибкой в строгом режиме (use strict). Без строгого режима, для обратной 
совместимости, присваивание несуществующей переменной создает новую глобальную переменную с таким же именем.*/

// a = 1;
// console.log(a);

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Все функции помнят лексическое окружение, в котором они были созданы. Все функции имеют скрытое свойство 
"[[Environment]]", которое хранит ссылку на лексическое окружение, в котором была создана функция. Ссылка на 
"[[Environment]]" устанавливается один раз и навсегда при создании функции.*/
function makeCounter() {
    let count = 0;

    return function () {
        return count++;
    };
};

let counter = makeCounter();
// 1) "LexicalEnvironment" of counter = "Environment Record": [] | -> outer "LexicalEnvironment"
// 2) "[[Environment]]" of counter = -> "LexicalEnvironment" of makeCounter
// 3) "LexicalEnvironment" of makeCounter = "Environment Record": [count: 0] | -> outer "LexicalEnvironment"
// 4) "[[Environment]]" of makeCounter = -> Global "LexicalEnvironment"
// 5) Global "LexicalEnvironment" = "Environment Record": [] | -> null

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2

/*Замыкание – это функция, которая запоминает свои внешние переменные и может получить к ним доступ. В JavaScript, все 
функции изначально являются замыканиями (есть только одно исключение в синтаксисе "new Function"). То есть они 
автоматически запоминают, где были созданы, с помощью скрытого свойства "[[Environment]]", и все они могут получить 
доступ к внешним переменным.*/

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

{
    let a = 111;
    {
        console.log(a);
    }
}
// 1) "LexicalEnvironment" of the inner code block = "Environment Record": [] | -> "LexicalEnvironment" of the outer code block
// 2) "LexicalEnvironment" of the outer code block = "Environment Record": [a: 111] | -> Global "LexicalEnvironment"
// 3) Global "LexicalEnvironment" = "Environment Record": [] | -> null

/*-------------------------------------------------------------------------------------------------------------------*/

/*Обычно лексическое окружение удаляется из памяти вместе со всеми переменными после завершения вызова функции. Это 
связано с тем, что на него нет ссылок. Как и любой объект JavaScript, оно хранится в памяти только до тех пор, пока к 
нему можно обратиться. Однако если существует вложенная функция, которая все еще доступна после завершения функции, то 
она имеет свойство "[[Environment]]", ссылающееся на лексическое окружение. В этом случае лексическое окружение 
остается доступным даже после завершения работы функции.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*На практике движки JavaScript пытаются оптимизировать использование "[[Environment]]". Они анализируют использование 
переменных и, если легко по коду понять, что внешняя переменная не используется – она удаляется. Одним из важных 
побочных эффектов в V8 (Chrome, Edge, Opera) является то, что такая переменная становится недоступной при отладке. Если
запустить код ниже и во время остановки написать "console.log(value)", то мы получим ответ, что такой переменной нет. 
В теории, она должна быть доступна, но попала под оптимизацию движка.*/
function f() {
    let value = Math.random();

    function g() {
        // debugger; // в консоли: напишите console.log(value);
    };

    return g;
};

let g = f();
g();

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Встроенными способами в JavaScript нельзя сделать полную копию какой-то функции, поэтому в примере ниже мы вызываем
каждый раз один и тот же экземпляр функции, у которой всегда один и тот же "[[Environment]]".*/
function func01() {
    let x = 1;

    function func02() {
        console.log(x);
    };

    function func03(f) {
        let x = 2;
        f();
    };

    func03(func02); // 1

    {
        let x = 3;
        let func04 = func02;
        func04(); // 1

        let func05 = func02.bind({});
        func05(); // 1

        console.log(func04 === func02); // true
        console.log(func05 === func02); // false
        console.log(func05 === func04); // false
    };
};

func01();

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Алгоритм поиска переменных у функции:
1) Идем в свой "LexicalEnvironment" в первую часть "Environment Record"
2) Идем в свой "[[Environment]]", в которым лежит ссылка на "LexicalEnvironment", в котором была создана функция, куда 
дальше мы идем в первую часть "Environment Record"
3) Идем во вторую часть в том же "LexicalEnvironment", в котором была создана функция, где находится ссылка на внешний
"LexicalEnvironment" для "LexicalEnvironment", в котором была создана функция.
4) Повторяем шаг 3 до тех пор, пока не будет найдена переменная.*/
let y = 0;

function func06() {
    // let y = 1;

    return function () {
        console.log(y);
    };
};

let func07 = func06();

function func08() {
    let y = 2;

    func07(); // 0
};

func08();

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

let z = 0;

function func09() {
    // let z = 1;

    return function () {
        console.log(z);
    };
};

let func10 = func09();

function func11() {
    let z = 2;

    function func12() {
        let z = 3;
        func10(); // 0
    };

    func12();
};

func11();

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

let v = 0;

function func13() {
    let v = 1;

    return function () {
        // let v = 2;

        return function () {
            console.log(v);
        };
    };
};

let func14 = func13();
let func15 = func14();

function func16() {
    let v = 3;

    return function () {
        let v = 4;
        func15(); // 1
    };
};

let func17 = func16();

func17();