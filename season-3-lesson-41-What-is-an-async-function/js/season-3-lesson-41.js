/*Любая async функция возвращает промис, в который заворачивается возвращаемое значение внутри самой функции. В данном
случае при вызове функции "getAdress()" будет возвращен промис, внутри имеющий значение "555". Чтобы получить это
значение нужно зарезольвить этот промис.*/
async function getAdress() {
    console.log(`I'm async`);

    return 555;
};

getAdress().then((value) => { console.log(value); })