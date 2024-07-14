const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');

document.addEventListener('focus', redraw, true); // Срабатывает при погружении.
document.addEventListener('blur', redraw, true); // Срабатывает при погружении.
canvas.addEventListener('click', handleClick, false); // Срабатывает при всплытии.

redraw(); /*Вроде как лишнее так, как после загрузки страницы срабатывает событие "focus" на document, что вызывает
функцию "redraw()".*/

function redraw(event) {
    if (event) {
        console.log(event.type + ' event happened on document');
    } else {
        console.log('no event.type');
    };

    console.log('we are inside "redraw()"');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(`being inside "redraw()" let's try to draw button1 using "drawButton()"`);
    drawButton(button1, 20, 20);
    console.log(`being inside "redraw()" let's try to draw button2 using "drawButton()"`);
    drawButton(button2, 20, 80);
};

function handleClick(event) {
    console.log('we are inside "handleClick()"');

    // Вычисляем координаты куда кликнули

    /*Свойство "MouseEvent.clientX" доступно только для чтения и является горизонтальной координатой в пределах
    клиентской области приложения, на которой произошло событие (в отличие от координат внутри страницы). Для примера,
    нажатие в верхнем левом углу клиентской области будет всегда приводить к событию со значением свойства "clientX"
    равным 0, независимо от того, прокручена страницы по горизонтали или нет.*/

    /*Свойство "MouseEvent.clientY" свойство доступно только для чтения и является вертикальной координатой в пределах
    клиентской области приложения, на которой произошло событие (в отличие от координат внутри страницы). Для примера,
    нажатие в верхнем левом углу клиентской области будет всегда приводить к событию со значением свойства "clientY"
    равным 0, независимо от того, прокручена страницы по вертикали или нет.*/

    /*Свойство "HTMLElement.offsetLeft" доступно только для чтения и содержит расстояние от левого верхнего угла
    элемента до левой стороны ближайшего родительского элемента.*/

    /*Свойство "HTMLElement.offsetTop" доступно только для чтения и возвращает расстояние от верхней внешней границы
    элемента до верхней внутренней границы ближайшего родительского элемента.*/
    // console.log('clientX is ' + event.clientX);
    // console.log('clientY is ' + event.clientY);
    // console.log('canvas.offsetLeft is ' + canvas.offsetLeft);
    // console.log('canvas.offsetTop is ' + canvas.offsetTop);
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;

    // Делаем фокус на первой кнопке, если необходимо.
    console.log(`being inside "handleClick()" let's try to draw button1 using "drawButton()"`);
    drawButton(button1, 20, 20);
    /*Метод "isPointInPath()" сообщает, содержится ли указанная точка в текущем пути. Первым параметром можно конкретно
    указать какой путь использовать для проверки. Последним параметром можно указать алгоритм, по которому будет
    определяться находится ли точка внутри или снаружи пути.*/
    console.log('we are about to check if we have clicked on the area where the button1 is: ' + ctx.isPointInPath(x, y));
    if (ctx.isPointInPath(x, y)) {
        /*Метод "focus()" устанавливает фокус на указанный элемент, если он может быть сфокусирован.*/
        console.log('we are about to focus button1 inside "handleClick()"');
        button1.focus();
    };

    /*Если в первом "if" было "true", то после срабатывания события "focus" на кнопке (и на document из-за погружения),
    то управления программы здесь приостановится и запустится функция "redraw()" из-за срабатывания события "focus" на
    document. После работы функции "redraw()" программа продолжит работать с этого места, где была остановка.*/

    // Делаем фокус на второй кнопке, если необходимо.

    console.log('we went back to "handleClick()" or we are still here');
    console.log(`being inside "handleClick()" let's try to draw button2 using "drawButton()"`);
    drawButton(button2, 20, 80);
    console.log('we are about to check if we have clicked on the area where the button2 is: ' + ctx.isPointInPath(x, y));
    if (ctx.isPointInPath(x, y)) {
        console.log('we are about to focus button2 inside "handleClick()"');
        button2.focus();
    };
};

function drawButton(el, x, y) {
    /*Свойство "document.activeElement" указывает на текущий сфокусированный элемент. Только для чтения.*/
    const active = document.activeElement === el;
    // console.log(document.activeElement);
    console.log('is the button at x = ' + x + ' & y = ' + y + " active? " + active);
    const width = 150;
    const height = 40;

    // Фон кнопки
    ctx.fillStyle = active ? 'pink' : 'lightgray';
    console.log('the color of the button is ' + ctx.fillStyle);
    ctx.fillRect(x, y, width, height);

    // Текст кнопки
    ctx.font = '15px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = active ? 'blue' : 'black';
    /*Свойство "textContent" позволяет задавать или получать текстовое содержимое элемента и его потомков.*/
    ctx.fillText(el.textContent, x + width / 2, y + height / 2);

    // Определяем кликабельную область.
    ctx.beginPath();
    ctx.rect(x, y, width, height);

    // Рисуем кольцо фокуса, если необходимо.
    /*Метод "drawFocusIfNeeded()" рисует фокус вокруг текущего или заданного пути, если указанный элемент находится в
    фокусе.*/
    ctx.drawFocusIfNeeded(el);
};