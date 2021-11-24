/*Промисы создаються при помощи конструктора "Promise". В эту
конструкцию помещается функция, которая называется "исполнитель".
Когда промис создается, эта функция автоматически запускается. У
этой функции должны быть два параметра - две callback-функции
"resolve" и "reject". Когда исполнитель получает результат, то
он должен вызвать одну их этих callback-функций: "resolve" - если
работа завершилась успешно с неким результатом "value", или
"reject" - если произошла некая ошибка "error" (объект). 

У объекта промиса есть внутренние свойства, к которым у нас нет прямого
доступа:
- "state" (состояние) - сначале "pending" (ожидание), потом меняется 
на "fulfilled" (выполнено успешно) при вызове "resolve" или на "rejected" 
(выполнено с ошибкой) при вызове "reject".
- "result" (результат) - сначала "undefined", далее равен "value" при 
вызове "resolve(value)" или равен "error" при вызове "reject(error)".
*/

let promiseOK = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve('OK');
    }, 1000);
});

console.log(promiseOK);

setTimeout(() => {
    console.log(promiseOK)
}, 2000);


let promiseNotOK = new Promise(function (resolve, reject) {
    setTimeout(() => {
        reject(new Error('Not OK'));
    }, 1000);
});

console.log(promiseNotOK);

setTimeout(() => {
    console.log(promiseNotOK)
}, 2000);

/*--------------------------------------------------------------------------------*/

/*Функции, которым нужен результат промиса, могут быть подписаны на него с помощью
методов "then()", "catch()", "finally()".*/

/*Метод "then()" принимает два параметра. Первый параметр это функция, которая выполнится,
если промис завершится успешно. Второй параметр это функция, которая выполнится, если промис 
завершится не успешно. Можно использовать только с первым параметром, если такое необходимо.
Метод "then()" можно вызывать сколько угодно раз у одного и того же промиса.*/

let promiseOkWithThen = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve('then OK')
    }, 1000);
});

promiseOkWithThen.then(
    result => console.log(result),
    error => console.log(error)
);


let promiseNotOKwithThen = new Promise(function (resolve, reject) {
    setTimeout(() => {
        reject(new Error('then Not OK'))
    }, 1000);
});

promiseNotOKwithThen.then(
    result => console.log(result),
    error => console.log(error)
);

/*--------------------------------------------------------------------------------*/

/*Если нужно только обработать ошибку, то можно использовать "null" в качестве первого 
параметра в методе "then()", или можно воспользоваться методом "catch()", который 
сделает то же самое.*/

let promiseNotOKWithCatch = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('catch Not OK'))
    }, 1000);
});

promiseNotOKWithCatch.catch(console.log);

/*--------------------------------------------------------------------------------*/

/*Метод "finally()" имитирует работу промиса, в котором исполнитель получил два 
одинаковых параметра, то есть одна и таже функция сработала и при успешном завершении
промиса и при не успешном. Но используя метод "finally()" мы не можем узнать как на самом
деле завершился промис, поэтому callback-функции в исполнителе не имеют параметров. При
этом метод "finally()" передает результат или ошибку дальше, к последующим методам. Метод
"finally()" удобен если нам нужно завершить или зачистить работку какого-то процесса и при
этом не важен результат этого процесса.*/

let promisOKWithFinally = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('finally OK');
    }, 2000);
})
    .finally(() => console.log('promisOKWithFinally done'))
    .then(result => console.log(result));


let promisNotOKWithFinally = new Promise((resolve, reject) => {
    throw new Error('finally Not OK');
})
    .finally(() => console.log('promisNotOKWithFinally done'))
    .catch(error => console.log(error));