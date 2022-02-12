function createPromise() {
    console.log('creating promise 1');

    let promise = new Promise((resolve, reject) => {
        resolve('111');
    });

    return promise;
};

const promiseOne = createPromise();

promiseOne
    .then((text) => {
        console.log(text);
        return '222';
    })
    .then((text) => console.log(text));

/*Этот цикл "for" создаст задержку перед там как начнут резольвиться промисы.*/
for (let i = 0; i < 60000000; i++) {
    let a = Math.random(11111);
};

/*-------------------------------------------------------------------------------------------------------------*/

/*Методы "then()" и "catch()" возвращают новые промисы.*/

const promiseTwo = createPromise(); // Это промис будет создан одновременно с "promiseOne", но не с "promiseThree" ниже.

let tempPromiseOne = promiseOne.then(() => console.log('aaa'));
let tempPromiseTwo = tempPromiseOne.then(() => console.log('bbb'));
let tempPromiseThree = tempPromiseTwo.then(() => console.log(tempPromiseOne === tempPromiseTwo));

/*-------------------------------------------------------------------------------------------------------------*/

function createPromiseTwo() {
    console.log('creating promise 2');

    let promise = new Promise((resolve, reject) => {
        reject('333');
    });

    return promise;
};

const promiseThree = createPromiseTwo();

promiseThree
    .then((text) => {
        console.log('1 ' + text); // не будет выведено потому, что созданный промис не резольвиться.
        return '444';
    })
    .catch((text) => {
        console.log('2 ' + text); // будет выведено потому, что созданный промис реджектиться.
        return '555';
    })
    .then((text) => console.log(text));

/*-------------------------------------------------------------------------------------------------------------*/

/*В библиотеке "axios" запросы возвращают промисы.*/