'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Регистрация обработчика "then()" до, вместе и после ключевого слова "await".*/

/*1 -> 2 -> 4 -> 3*/
async function func01() {
    console.log(1);

    const promise01 = new Promise((resolve) => {

        setTimeout(() => {
            resolve();
            console.log(2);
        }, 1000);

    });

    await promise01;

    promise01.then(() => console.log(3));

    console.log(4);
};

/*1 -> 2 -> 3 -> 4*/
async function func02() {
    console.log(1);

    const promise01 = new Promise((resolve) => {

        setTimeout(() => {
            resolve();
            console.log(2);
        }, 1000);

    });

    await promise01
        .then(() => console.log(3));

    console.log(4);
};

/*1 -> 2 -> 3 -> 4*/
async function func03() {
    console.log(1);

    const promise01 = new Promise((resolve) => {

        setTimeout(() => {
            resolve();
            console.log(2);
        }, 1000);

    });

    promise01.then(() => console.log(3));

    await promise01;

    console.log(4);
};

/*1 -> 2 -> 3 -> 4*/
async function func04() {
    console.log(1);

    const promise01 = new Promise((resolve) => {

        setTimeout(() => {
            resolve();
            console.log(2);
        }, 1000);

    })
        .then(() => console.log(3));

    await promise01;

    console.log(4);
};

func01();