'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Когда мы просим браузер что-то сделать, например, создать таймер или загрузить какой-то HTML-элемент на страницу, то
он выполняет это своем асинхронном мире, который не зависит от Call Stack'а в JS.*/

/*В JS есть много вещей, которые работают асинхронно, например, загрузка HTML-элементов на страницу. В этом примере мы
пытаемся получить доступ к функции библиотеки "lodash.js", до того как она будет нам полностью доступна.*/
function loadScript01(src) {
    let script = document.createElement('script'); // Создает пустой HTML-элемент "script" в памяти
    script.src = src; // Указываем этому HTML-элементу атрибут "src"
    document.head.append(script); // Загружаем наш HTML-элемент на страницу
};

// loadScript01('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js');
// console.log(_); // Uncaught ReferenceError: _ is not defined

/*В этом же примере, при помощи события "onload" мы дожидаемся когда вся библиотека "lodash.js" будет нам полностью 
доступна и только после этого используем функции из нее.*/
function loadScript02(src, callback) {
    let script = document.createElement('script'); // Создает пустой HTML-элемент "script" в памяти
    script.src = src; // Указываем этому HTML-элементу атрибут "src"
    script.onload = () => callback(script); // Когда наш HTML-элемент полностью прогрузиться, вызовется callback-функция
    document.head.append(script); // Загружаем наш HTML-элемент на страницу
};

loadScript02('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    console.log(`${script.src} is ready`);
    console.log(_);
});

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*При помощи события "onerror" можно отслеживать ошибки.*/
function loadScript03(src, callback) {
    let script = document.createElement('script'); // Создает пустой HTML-элемент "script" в памяти
    script.src = src; // Указываем этому HTML-элементу атрибут "src"

    script.onload = () => callback(script); // Когда наш HTML-элемент полностью прогрузиться, вызовется callback-функция
    script.onerror = () => callback(null, new Error(`${src} is not ready`));

    document.head.append(script); // Загружаем наш HTML-элемент на страницу
};

loadScript03('123', (script, error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`${script.src} is ready`);
        console.log(_);
    };
});