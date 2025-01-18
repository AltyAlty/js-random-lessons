'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Ключевое слово "await" ставит на паузу код только в той в функции, в которой он находится. После того, как
срабатывает ключевое слово "await" начинает работать код за пределами текущей функции. Видим 5-6 -> 1-2 -> 3-4.*/
async function func01() {
    async function func02() {

        return new Promise((resolve) => {
            setTimeout(
                () => {
                    resolve();
                    console.log(1);
                }, 1000);
        });

    };

    function func03() { console.log(2) };

    async function func04() {

        return new Promise((resolve) => {
            setTimeout(
                () => {
                    resolve();
                    console.log(3);
                }, 1000);
        });

    };

    await func02(); // #3

    func03(); // #4

    await func04(); // #5

    console.log(4); // #6
};

function func05() { console.log(5) };

func01();

func05(); // #1

console.log(6); // #2