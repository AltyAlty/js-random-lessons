function drawALine(n) {
    console.log(n + '------------------------------------------------------------------------------------------------');
};

/*-------------------------------------------------------------------------------------------------------------------*/

/*
Прототип, если кратко, то это объект. Когда мы создаем новый объект при помощи функции-конструктора, то внутри этой
функции-конструктора как бы неявно создается новый объект ("this" будет являться ссылкой на этот объект), и возвращается
этот объект.
*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Анонимную самовызывающуюся функцию можно использовать для объявления каких-нибудь переменных, которые не будут
засорять глобальную область видимости. То есть все, что находится в этой функции, после того как она отработает
умирает.*/

(function () {
    var a = 0;
})();

// console.log(a); // Uncaught ReferenceError: a is not defined - если убрать "let a = 1;" далее.

let a = 1;
console.log(a); // 1

/*В данном случае самовызывающаяся анонимная функция вернет другую функцию, которой нужен будет для работы контекст этой
самовызывающейся функции (там будет искаться "a"). Поэтому все, что находится внутри этой самовызывающейся функции
уничтожено не будет, когда эта функция будет отработана, то есть когда переменная "someFuncZero" сохранит в себе
возвращеную функцию.*/
let someFuncZero = (function () {
    let a = 2;

    return function () {
        console.log(a);
    };
})();

someFuncZero(); // 2
console.log('1-----------------------------------------------------------------------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Небольшой пример на использование метода "bind()" для перепривязки контекста "this".*/
let someObjA = {
    a: 0,
    showA: function () {
        console.log(this.a);
    }
};

let someObjB = {
    a: 1
};

someObjB.showA = someObjA.showA;
someObjB.showA(); // 1, вызываем в контексте объекта "someObjB".

someObjA.showA(); // 0, вызываем в контексте объекта "someObjА".

let someMethodC = someObjA.showA.bind(someObjA); // Закрепили контекст "this" как объект "someObjA".
someMethodC(); // 0, вызываем в контексте объекта "someObjA".

window.setTimeout(someObjA.showA, 1000); // undefined, так как ищем "a" в глобальной области видимости.
window.setTimeout(someObjA.showA.bind(someObjB), 2000); // 1, так как ищем "a" в объекте "someObjB".

function drawALineWithTwo() {
    drawALine(2);
};
setTimeout(drawALineWithTwo, 2100);

/*-------------------------------------------------------------------------------------------------------------------*/

/*Этот код не особо читабелен и его можно переписать с использование промисов.*/
setTimeout(() => {
    console.log('111');
    setTimeout(() => {
        console.log('222');
        setTimeout(() => {
            console.log('333');
        }, 1000)
    }, 1000)
}, 3000);


/*Версия без async/await.*/
// function setTimeoutWithPromise(ms) {
//     let promise = new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, ms);
//     });

//     return promise;
// };

// setTimeoutWithPromise(3000)
//     .then(() => console.log('111'))
//     .then(() => setTimeoutWithPromise(1000))
//     .then(() => console.log('222'))
//     .then(() => setTimeoutWithPromise(1000))
//     .then(() => console.log('333'));


/*Версия c async/await.*/
// async function setTimeoutWithPromiseAsync(ms) {
//     await new Promise((resolve) => {
//         setTimeout(() => resolve(), ms)
//     });
// };

// setTimeoutWithPromiseAsync(3000)
//     .then(() => console.log('111'))
//     .then(() => setTimeoutWithPromiseAsync(1000))
//     .then(() => console.log('222'))
//     .then(() => setTimeoutWithPromiseAsync(1000))
//     .then(() => console.log('333'));

// setTimeoutWithPromiseAsync(3000)
//     .then(() => console.log('111'));
// setTimeoutWithPromiseAsync(4000)
//     .then(() => console.log('222'));
// setTimeoutWithPromiseAsync(5000)
//     .then(() => console.log('333'));
