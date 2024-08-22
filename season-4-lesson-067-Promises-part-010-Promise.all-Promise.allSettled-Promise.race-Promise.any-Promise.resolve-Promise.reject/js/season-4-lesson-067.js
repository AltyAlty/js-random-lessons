'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "Promise.all()" принимает массив промисов (или любой перебираемый объект) и возвращает новый промис. Этот 
новый промис завершится, когда завершится весь переданный список промисов, и его свойство "result" будет массив их 
результатов. Порядок элементов массива в точности соответствует порядку исходных промисов.*/
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 1500)),
    new Promise(resolve => setTimeout(() => resolve(2), 1000)),
    new Promise(resolve => setTimeout(() => resolve(3), 500))
])
    .then(console.log); // Array(3) [ 1, 2, 3 ]

/*-------------------------------------------------------------------------------------------------------------------*/

/*Сделаем пример с использованием метода "Promise.all()".*/
let urls01 = [
    'https://api.github.com/users/AltyAlty',
    'https://api.github.com/users/Wisp80'
];

/*Здесь получим массив с результатами вызовов указанной callback-функции, то есть с двумя промисами, в которых когда
они зарезольвятся в свойстве "result" будут заголовки ответа и методы для получения самих полезных данных.*/
let promises01 = urls01.map(
    (url) => {
        return fetch(url);
    }
);

console.log(promises01); // Array [ Promise { "pending" }, Promise { "pending" } ]

/*Здесь метод "Promise.all()" будет ждать, когда все промисы внутри массива "promises01" зарезольвятся. После этого
этот метод "Promise.all()" создаст новый промис, у которого в свойстве "result" будет массив со свойствами "result" у 
зарезольвенных промисов из массива "promises01". После этого этот новый промис зарезольвится, и мы сможем перехватить
его, например, методом "then()".*/
Promise.all(promises01) // это похоже на "new Promise( result: [ promises01[0].result, promises01[1].result ] )"

    /*Здесь при помощи метода "then()" перехватываем зарезольвенный промис, созданный методом "Promise.all()".

    В переменной "responses" будет лежать свойство "result" перехваченного зарезольвенного промиса, созданного 
    методом "Promise.all()" выше.*/
    .then((responses) => { // Переменная "responses" похожа на [ promises01[0].result, promises01[1].result ]
        console.log(responses); // Array [ Response, Response ]

        /*Просматриваем данные из свойств "result" зарезольванных промисов, которые были созданы методом "fetch()"*/
        for (let response of responses) {
            console.log(`${response.url}: ${response.status}`); // покажет 200 для каждой ссылки
        };

        /*Здесь обработчик метода "then()" вернет новый промис, у которого свойство "result" будет содержать 
        "responses", то есть массив "[ promises01[0].result, promises01[1].result ]". Этот промис сразу 
        зарезольвится, так что мы сможем перехватить его, например, методом "then()".*/
        return responses; // это похоже на new Promise( result: [ promises01[0].result, promises01[1].result ] )
    })

    /*Здесь при помощи метода "then()" перехватываем зарезольвенный промис, который вернется предыдущим методом 
    "then()".*/
    .then(
        /*В переменной "responses" будет лежать свойство "result" перехваченного зарезольвенного промиса, который 
        вернется предыдущим методом "then()".*/
        (responses) => { // Переменная "responses" похожа на [ promises01[0].result, promises01[1].result ]
            console.log(responses); // Array [ Response, Response ]

            return Promise.all(
                /*Здесь метод "json()" просит браузер сделать еще два запроса на сервер уже с целью получения самих
                полезных данных по пользователям. Но он вернет не сразу данные, а промисы. Эти промисы зарезольвятся,
                когда полностью загрузятся данные по пользователям. Когда эти промисы зарезольвятся, у них в свойстве
                "result" будут лежать объекты формата JSON с полезными данными по пользователям.

                То есть метод "map" сделает следующее:
                1) promises01[0].result.json() => получим первый промис.
                2) promises01[1].result.json() => получим второй промис.
                3) Вернет массив с этими двумя промисами наружу.*/

                /*Далее метод "Promise.all()" будет ждать, когда все промисы внутри этого массива зарезольвятся. После 
                этого этот метод "Promise.all()" создаст новый промис, у которого в свойстве "result" будет массив со 
                свойствами "result" у этих зарезольвенных промисов из массива, сформированного методом "map()". После 
                этого этот новый промис зарезольвится, и мы сможем перехватить его, например, методом "then()".*/
                responses.map(
                    (response) => {
                        return response.json();
                    }
                )
            ) // это похоже на new Promise ( result: [ responses[0].result.json(), responses[1].result.json() ] )
        }
    )

    /*Здесь при помощи метода "then()" перехватываем зарезольвенный промис, который вернется предыдущим методом 
    "then()".*/
    .then(
        /*В переменной "users" будет лежать свойство "result" перехваченного зарезольвенного промиса, который вернется 
        предыдущим методом "then()".*/
        (users) => { // Переменная "users" похожа на [ responses[0].result.json().result, responses[1].result.json().result ]
            console.log(users); // Array [ {…}, {…} ]

            users.forEach(
                (user) => {
                    console.log(user.login)
                }
            );

            console.log('--------------------------------------');
        }
    );

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если любой из промисов завершится с ошибкой, то промис, возвращенный методом "Promise.all()", немедленно 
завершается с этой ошибкой.*/
let promise01 = new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000));
let promise02 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('ERROR')), 2500));
let promise03 = new Promise((resolve, reject) => setTimeout(() => resolve(3), 5000));

Promise.all([
    promise01,
    promise02,
    promise03
]).catch(console.log); // Ошибка появится через 2,5 секунд, но последний промис все равно позднее зарезольвится

promise03.then(console.log); // Через 5 секунд этот промис зарезольвится

/*Если один промис завершается с ошибкой, то весь метод "Promise.all()" завершается с ней, полностью забывая про 
остальные промисы в списке. Их результаты игнорируются. Например, если сделано несколько вызовов метода "fetch()", и 
один не прошел, то остальные будут все еще выполняться, но метод "Promise.all()" за ними уже не смотрит. Они так или 
иначе завершатся, но их результаты будут проигнорированы. Метод "Promise.all()" ничего не делает для их отмены, так 
как в промисах вообще нет концепции "отмены".*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Обычно, метод "Promise.all()" принимает перебираемый объект промисов. Но если любой из этих объектов не является 
промисом, он передается в итоговый массив как есть.*/
Promise.all([
    new Promise((resolve, reject) => { setTimeout(() => resolve(1), 5500) }),
    'b',
    'c'
]).then(console.log); // Array(3) [ 1, "b", "c" ]

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "Promise.allSettled()" всегда ждет завершения всех промисов. В массиве результатов будет
1) {status:"fulfilled", value:результат} для успешных завершений.
2) {status:"rejected", reason:ошибка} для ошибок.*/
let promise04 = new Promise((resolve, reject) => setTimeout(() => resolve(1), 6000));
let promise05 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('ERROR')), 6500));
let promise06 = new Promise((resolve, reject) => setTimeout(() => resolve(3), 9000));

Promise.allSettled([
    promise04,
    promise05,
    promise06
]).then(console.log); // Array(3) [ { status: "fulfilled", value: 1 }, { status: "rejected", reason: Error }, { status: "fulfilled", value: 3 } ]

/*Если браузер не поддерживает метод "Promise.allSettled()", для него можно сделать полифил.*/
if (!Promise.allSettled) {
    Promise.allSettled = function (promises) {
        return Promise.all(
            promises.map(
                (promise) => {
                    return Promise.resolve(promise)
                        .then(
                            (value) => {
                                return {
                                    status: 'fulfilled',
                                    value: value
                                }
                            },

                            (error) => {
                                return {
                                    status: 'rejected',
                                    reason: error
                                }
                            }
                        )
                }
            )
        );
    };
};

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "Promise.race()" очень похож на метод "Promise.all()", но ждет только первый выполненный промис, из которого
берет результат или ошибку.*/
let promise07 = new Promise((resolve, reject) => setTimeout(() => resolve(1), 9500));
let promise08 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('ERROR')), 10000));
let promise09 = new Promise((resolve, reject) => setTimeout(() => resolve(3), 12500));

Promise.race([
    promise07,
    promise08,
    promise09
]).then(console.log); // 1

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "Promise.any()" очень похож на метод "Promise.race()", но ждет только первый успешно выполненный промис, из 
которого берет результат. Если ни один из переданных промисов не завершится успешно, тогда возвращенный объект Promise
будет отклонен с помощью "AggregateError" - специального объекта ошибок, который хранит все ошибки промисов в своем 
свойстве "errors".*/
let promise10 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('ERROR')), 13000));
let promise11 = new Promise((resolve, reject) => setTimeout(() => resolve(2), 14000));

Promise.any([
    promise10,
    promise11
]).then(console.log); // 2

let promise12 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('ERROR')), 14500));
let promise13 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('ERROR')), 15000));

Promise.any([
    promise12,
    promise13
]).catch(console.log); // AggregateError: No Promise in Promise.any was resolved

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "Promise.resolve(value)" создает успешно выполненный промис с результатом "value". Этот метод используют для 
совместимости: когда ожидается, что функция возвратит именно промис.*/
let cache = new Map();

/*Эта функция в любом случае возвращает промис.*/
function loadCached(url) {
    if (cache.has(url)) {
        return Promise.resolve(cache.get(url));
    };

    return fetch(url)
        .then(response => response.text())
        .then(text => {
            cache.set(url, text);
            return text;
        });
};

/*Метод "Promise.reject(error)" создает промис, завершенный с ошибкой "error".*/
setTimeout(() => {
    Promise.reject(new Error('it is an error'))
        .catch(console.log); // Error: it is an error
}, 15500);