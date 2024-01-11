'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Function Declaration - Объявления Функции.*/
function funcExample01() {
    console.log('01');
};

/*Function Expression - Функциональное Выражение.*/
let funcExample02 = function asdasd() {
    console.log('02');
};

funcExample02(); // '02'
// asdasd(); // is not defined
/*Любая функция что-то возвращает, если не указано что, то вернется undefined.*/
console.log(funcExample02); // '02' => undefined
console.log(funcExample02()); // function asdasd(params)

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Function Declaration может быть вызвана раньше, чем она объявлена. Такое поведение называют "Hoisting".*/
funcExample06(); // '06'

function funcExample06(params) {
    console.log('06');
};

/*Function Expression создается, когда выполнение доходит до него, и затем уже может использоваться.*/
// funcExample07(); // can't access lexical declaration 'funcExample07' before initialization

let funcExample07 = function () {
    console.log('07');
};

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*В строгом режиме, когда Function Declaration находится в блоке {...}, функция доступна везде внутри блока. Но не 
снаружи него.*/

function funcExample08() {
    console.log('08');

    funcExample09();

    function funcExample09() {
        console.log('09');
    };

    funcExample09();
};

funcExample08(); // '08' => '09' => '09'
// funcExample09(); // funcExample09 is not defined

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

function funcExample10() {
    console.log('10');

    funcExample11();

    function funcExample11() {
        console.log('11');
    };

    funcExample11();
};

funcExample10(); // '10' => '11' => '11'
/*Если запустить без 'use strict', то получим funcExample11 is not a function. Так происходит потому, что создание 
идентификатора funcExample11 ниже в блоке if подтянется на самый вверх, но не произойдет его инициализация.*/
// funcExample11();
// console.log(funcExample11); // undefined

let a = 20;

if (a > 18) {
    function funcExample11() {
        console.log('> 18');
    };

    funcExample11();
} else {
    function funcExample11() {
        console.log('< 18');
    };

    funcExample11();
}

/*Данная функция с использованием 'use strict' не попадет в общую область видимости. А без использования 'use strict'
тогда произойдет вызов функции, поскольку она будет в общей области видимости, а внутри блока if получит значение.*/
// funcExample11(); // '> 18'