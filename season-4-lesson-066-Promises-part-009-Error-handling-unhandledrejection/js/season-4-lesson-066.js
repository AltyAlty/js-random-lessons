'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "catch()" не обязательно должен быть сразу после ошибки, он может быть далее, после одного или даже нескольких
методов "then()".*/
new Promise((resolve, reject) => {
    throw new Error('it is an error 01');
    // reject(new Error('it is an error'));
    // resolve(1);
})
    .then(
        (result) => {
            console.log(result);
            return result * 2;
        },
        // (error) => {
        //     console.log('I first found something: ' + error);
        // }
    )
    .then(
        (result) => {
            /*Если мы бросим ошибку из обработчика "then()", то промис будет считаться отклоненным, и управление перейдёт 
            к ближайшему обработчику ошибок.*/
            throw new Error('it is an error 02');
            console.log(result);
            return result * 2;
        }
    )
    .then(
        (result) => {
            console.log(result);
        }
    )
    .catch(
        (error) => {
            console.log('I found something: ' + error);
            return 3;
        }
    )
    /*Метод "catch()", как и метод "then()", возвращает новый промис.*/
    .then(
        (result) => {
            console.log(result); // 3
            console.log('--------------------------------------');
        }
    );

/*-------------------------------------------------------------------------------------------------------------------*/

new Promise((resolve, reject) => {
    throw new Error('it is an error 03');
})
    /*Если мы пробросим ошибку внутри блока "catch()", то управление перейдет к следующему ближайшему обработчику 
    ошибок.*/
    .catch(
        (error) => {
            throw error;
        }
    )
    .then( // Будет проигнорирован
        (result) => {
            console.log(result);
        }
    )
    .catch(
        (error) => {
            console.log(error);
            console.log('--------------------------------------');
        }
    );

/*-------------------------------------------------------------------------------------------------------------------*/

/*Когда ошибка в промисе не перехвачена, то скрипт умирает с сообщением в консоли. JavaScript-движок отслеживает такие
ситуации и генерирует в этом случае глобальную ошибку. В браузере мы можем поймать такие ошибки, используя событие 
"unhandledrejection".*/
window.addEventListener('unhandledrejection', function (event) {
    console.log(event.promise); // [object Promise] - промис, который сгенерировал ошибку
    console.log(event.reason); // Error: Ошибка! - объект ошибки, которая не была обработана
});

// new Promise(function () {
//     throw new Error('it is an error 04');
// });