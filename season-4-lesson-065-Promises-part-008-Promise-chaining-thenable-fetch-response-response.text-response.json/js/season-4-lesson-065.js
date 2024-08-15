'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Цепочка промисов реализуется путем вызова нескольких обработчиков друг за другом. Методы "then()" всегда возвращают
новый промис.*/
let promise01 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
});

promise01
    /*Первый метод "then()" запустится когда промис "promise01" зарезольвится.*/
    .then(function (result) {
        console.log(promise01); // Promise { <state>: "fulfilled", <value>: 1 }
        console.log(result); // 1
        /*Первый метод "then()" вернет новый промис, у которого скрытое свойство "result" будет 2.*/
        return result * 2;
    })
    /*Второй метод "then()" запустится когда промис, возвращенный первым методом "then" зарезольвится.*/
    .then(function (result) {
        console.log(promise01); // Promise { <state>: "fulfilled", <value>: 1 }
        console.log(result); // 2
        /*Второй метод "then()" вернет новый промис, у которого скрытое свойство "result" будет 4.*/
        return result * 2;
    })
    /*Третий метод "then()" запустится когда промис, возвращенный вторым методом "then" зарезольвится.*/
    .then(function (result) {
        console.log(promise01); // Promise { <state>: "fulfilled", <value>: 1 }
        console.log(result); // 4
        console.log('--------------------------------------');
        /*Третий метод "then()" вернет новый промис, у которого скрытое свойство "result" будет 8.*/
        return result * 2;
    });

/*-------------------------------------------------------------------------------------------------------------------*/

/*Также в методах "then()" можно напрямую указывать какой промис им возвращать. Это полезно в некоторых ситуациях, так
как автоматически созданные промисы методами "then()" сразу резольвятся, что не всегда то, что нам нужно.*/
new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 2000);
})
    .then(function (result) {
        console.log(result); // 1

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(result * 2), 1000);
        });
    })
    .then(function (result) {
        console.log(result); // 2

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(result * 2), 1000);
        });
    })
    .then(function (result) {
        console.log(result); // 4
        console.log('--------------------------------------');
    });

/*-------------------------------------------------------------------------------------------------------------------*/

/*Перепишем пример из предыдушего урока на промисах с использованием цепочки промисов.*/
function loadScript01(src) {
    return new Promise(

        function (resolve, reject) {
            setTimeout(() => {
                let script = document.createElement('script');
                script.src = src;

                script.onload = () => resolve(script);
                script.onerror = () => reject(new Error(`${src} is not ready`));

                document.head.append(script);
            }, 5000)
        }

    );
};

loadScript01('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js')
    /*Первый метод "then()" вернет новый промис, у которого скрытое свойство "result" будет undefined.*/
    .then(
        script => {
            console.log(`${script.src} is ready`);
        },

        error => console.log(error.message)
    )
    /*Второй метод "then()" вернет новый промис, у которого скрытое свойство "result" будет объект HTML-элемента "script".*/
    .then(
        (result) => {
            console.log(result); // undefined            
            return loadScript01('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js')
        }
    )
    /*Третий метод "then()" вернет новый промис, у которого скрытое свойство "result" будет 5.*/
    .then((script) => {
        console.log(`${script.src} is ready`);
        return 5;
    })
    .then((result) => {
        console.log(result); // 5
        console.log(_);
        console.log('--------------------------------------');
    })

/*-------------------------------------------------------------------------------------------------------------------*/

/*Обработчик может возвращать не именно промис, а любой объект, содержащий метод "then()", такие объекты называют 
"thenable", и этот объект будет обработан как промис. Смысл в том, что сторонние библиотеки могут создавать свои 
собственные совместимые с промисами объекты. Они могут иметь свои наборы методов и при этом быть совместимыми со 
встроенными промисами, так как реализуют метод "then()".*/

/*Создаем класс для создания промисоподобных объектов.*/
class Thenable {
    constructor(num) {
        this.num = num;
    };

    then(resolve, reject) {
        setTimeout(
            () => {
                console.log(resolve.toString()); // function() { native code }
                resolve(this.num * 2);
                console.log('--------------------------------------');
            }, 11000);
    }
};

new Promise(resolve => resolve(6))
    .then(result => {
        return new Thenable(result); // { num: 6 }, у этого объект черех прототипное наследование будет доступен метод "then()"
    })
    .then(console.log); // 12

/*-------------------------------------------------------------------------------------------------------------------*/

/*Чтобы делать запросы по сети можно использовать метод "fetch()". Этот метод имеет много опциональных параметров, но 
самое главное это указать в нем url удаленного ресурса. 

Метод "fetch()" запрашивает по сети указанный url и возвращает новый промис. После того, как удаленный ресурс 
присылает заголовки ответа, но до того, как весь ответ сервера полностью загружен, этот промис резольвится и в своем 
скрытом свойстве "result" имеет объект "response".

Чтобы прочитать полный ответ, надо вызвать метод "response.text()", тоже возвращающий новый промис, который 
резольвится, когда данные полностью загружены с удаленного сервера, и имеет эти данные в своем скрытом свойстве 
"result".

Есть также метод "response.json()", который читает данные в формате JSON.*/
fetch(`https://api.github.com/users/AltyAlty`)
    .then(response => {
        console.log(response);
        // return response.text();
        return response.json();
    })
    .then(text => {
        console.log(text);
    })