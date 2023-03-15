let amIAlive = setTimeout(function () {
    console.log('fff1 my id is ' + amIAlive); // 2

    let a = 42;

    return setTimeout(function () {
        window.clearTimeout(amIAlive);

        /*Переменная "a" будет доступна из внешней функции.*/
        console.log(a); // 3, the first setTimeout is still alive
        
        console.log('fff2 my id is ' + amIAlive); // 4

        for (let i = 0; i < 8000; i++) {
            console.log(i); // 5
        };

        console.log('fff3 my id is ' + amIAlive); // 6
    }, 1000);
}, 1000);

console.log('fff4 my id is ' + amIAlive); // 1

setTimeout(function () {
    window.clearTimeout(amIAlive);
    console.log('fff5 my id is ' + amIAlive); // 7
}, 6000);

/*-------------------------------------------------------------------------------------------------------------*/

let amIAliveTwo = setTimeout(function () {
    console.log('fff6 my id is ' + amIAliveTwo); // 8
}, 8000);