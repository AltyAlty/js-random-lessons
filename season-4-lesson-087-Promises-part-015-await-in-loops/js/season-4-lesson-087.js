'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

const array01 = ['a', 'b', 'c'];

/*Ключевое слово "await" не ставит на паузу создание новых циклов при использовании в методе "forEach()".*/
async function func01() {
    /*Здесь при использовании ключевого слова "await" в методе "forEach()" не блокируется создание новых циклов. Метод
    "forEach()" быстро переберет все циклы, каждый из которых в свою очередь создаст свой промис. Для каждого из этих
    промисов будет создан таймер и все эти таймеры будут работать параллельно. В итоге все таймеры закончат свою работу
    почти в одно и тоже время, что приведет к тому, что все промисы зарезольвятся почти в одно и тоже время. 
    Callback-функция в параметрах метода "forEach()" является асинхронной, но промис который будет возвращаться этой
    функцией на каждом цикле никак не обрабатывается.
    
    При этом ключевое слово "await" все еще ставит на паузу код в рамках каждой callback-функции, запускаемых в каждом
    цикле, поскольку мы всегда сначала видим то, что выводит "console.log('element: ' + element)", а затем уже видим то,
    что выводит "console.log('loop: ' + index)".*/
    array01.forEach(async (element, index) => {
        /*Здесь сначала создается промис, а затем запускается ключевое слово "await". Промис создается сразу с 
        регистрацией обработчика "then". Поэтому когда промис резольвится, то выполняется обработчик "then", а
        затем ключевое слово "await" возобновляет дальнейшее выполнение функции. Поэтому мы сначала видим "element",
        а затем "loop".*/
        await new Promise(
            (resolve) => {
                setTimeout(() => { resolve(element) }, 1000);
            }
        )
            .then(
                (element) => { console.log('element: ' + element) }
            );

        console.log('loop: ' + index);

        /*Это код аналогичный тому, что выше, только тут будет выводиться сначала "loop", а потом "element". Так
        происходит потому, что регистрация обработчика "then" происходит уже после того, как ключевое слово "await"
        возобновляет дальнейшее выполнение функции.*/
        // const promise01 = new Promise(
        //     (resolve) => {
        //         setTimeout(() => { resolve(element) }, 1000);
        //     }
        // );

        // await promise01;

        // promise01
        //     .then(
        //         (element) => { console.log('element: ' + element) }
        //     );

        // console.log('loop: ' + index);
    });


    /*Но, например, ключевое слово "await" ставит на паузу создание новых циклов при использовании в циклах "for",
    "for..of" и "for..in".*/
    // for (let index = 0; index < array01.length; index++) {
    //     await new Promise(
    //         (resolve) => {
    //             setTimeout(() => { resolve(array01[index]) }, 1000);
    //         }
    //     )
    //         .then(
    //             (element) => { console.log('element: ' + element) }
    //         );

    //         console.log('loop: ' + index);
    // };


    // for (const [index, element] of array01.entries()) {
    //     await new Promise(
    //         (resolve) => {
    //             setTimeout(() => { resolve(element) }, 1000);
    //         }
    //     )
    //         .then(
    //             (element) => { console.log('element: ' + element) }
    //         );

    //         console.log('loop: ' + index);
    // };


    // for (const index in array01) {
    //     await new Promise(
    //         (resolve) => {
    //             setTimeout(() => { resolve(array01[index]) }, 1000);
    //         }
    //     )
    //         .then(
    //             (element) => { console.log('element: ' + element) }
    //         );

    //     console.log('loop: ' + index);
    // };


    // let index = 0;

    // while (index < array01.length) {
    //     index++;

    //     await new Promise(
    //         (resolve) => {
    //             setTimeout(() => { resolve(array01[index]) }, 1000);
    //         }
    //     )
    //         .then(
    //             (element) => { console.log('element: ' + element) }
    //         );

    //     console.log('loop: ' + index);
    // };

    /*Так происходит поскольку "asynс/await" при запуске кода трансформируется в одну функцию-генератор, а 
    использование метода "forEach()" будет означать, что каждый цикл будет иметь индивидуальную функцию-генератор, 
    которые не имеют отношения друг к другу, поэтому они будут выполнены независимо друг от друга и не будут знать 
    контекста функции "next()" у друг друга. А использование циклов "for", "for..of" и "for..in" создает одну 
    функцию-генератор, которая обработывает все циклы.*/
};

func01();