const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

ctx.rect(10, 10, 100, 100);
ctx.stroke();

/*Метод "isPointInStroke()" сообщает, находится ли указанная точка внутри области, содержащейся при обводке контура.*/
console.log(ctx.isPointInStroke(50, 10)); // true

/*-------------------------------------------------------------------------------------------------------------------*/

ctx.beginPath();

// Создаем эллипс
const ellipse = new Path2D();
ellipse.ellipse(150, 200, 40, 60, Math.PI * 0.25, 0, 2 * Math.PI);
ctx.lineWidth = 25;
ctx.strokeStyle = 'red';
ctx.fill(ellipse);
ctx.stroke(ellipse);

// Подписываемся на событие движения мышки
canvas.addEventListener('mousemove', (event) => {
    // Проверяем находится ли курсор в данный момент внутри нашего эллипса
    const isPointInStroke = ctx.isPointInStroke(
        ellipse,
        event.offsetX,
        event.offsetY
    );

    ctx.strokeStyle = isPointInStroke ? 'green' : 'red';

    // Перерисовываем эллипс
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fill(ellipse);
    ctx.stroke(ellipse);
});