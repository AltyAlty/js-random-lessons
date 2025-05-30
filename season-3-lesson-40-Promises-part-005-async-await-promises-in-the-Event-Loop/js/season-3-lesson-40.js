let a = 0;

async function bigFor() {
    for (let index = 0; index < 3000; index++) {
        console.log(index); // 2
    };

    return 4;
};

function one() {
    console.log('one'); // 1
};

async function two() {
    /*Здесь ключевое слово "await" позволяет приостановить функцию и позволить работать коду дальше, а когда Call Stack
    будет пустой и промис внутри "bigFor()" зарезольвиться, то работа функции продолжится. Следующие две строчки
    приводят к одному и тому же результату.*/
    a = await bigFor();
    // await bigFor().then((value) => { a = value; });

    /*Если не использовать ключевое слово "await", то поскольку функция "bigFor()" является "async", то она вернет
    промис, но он не будет зарезольвен, поэтому в "a" будет лежать этот промис. Этот промис будет почти сразу
    зарезольвен, но в Call Stack попадет, только когда он освободится, то есть после работы функции "three()".*/
    // a = bigFor();
    // a.then((value) => { console.log(value); });

    console.log(a); // 5
};

function three() {
    console.log(a); // 3
    console.log('three'); // 4
};

one();
two();
three();