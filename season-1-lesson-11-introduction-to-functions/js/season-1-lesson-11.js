var magicClass = 'magic';

var magicElement = document.getElementsByClassName(magicClass);

magicElement[0].onclick = function () {
    debugger; /*Когда выполнение программы доходит до дебаггера, то приостанавливается работы программы.*/

    function logSomething(info) { /*Это функция. Код внутри будет выполнен только когда функция 
        будет где-то вызвана.*/
        console.log(info);
    };

    /*Вызываем функцию "logSomething()" 3 раза.*/
    logSomething('1');
    logSomething('2');
    logSomething('3');
};