const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------*/

ctx.rect(10, 10, 100, 100);
ctx.strokeStyle = 'blue';
/*Метод "stroke()" обводит текущий или данный контур цветом "strokeStyle"*/
ctx.stroke();

ctx.beginPath();
ctx.fillStyle = 'green';
ctx.rect(150, 10, 100, 100);
/*Метод "fill()" заполняет текущий или заданный путь с текущим стилем заливки.*/
ctx.fill();

/*-------------------------------------------------------------------------------------------------------------*/

ctx.beginPath();
ctx.fillStyle = 'black';
ctx.font = '30px serif';

/*Свойство "fontKerning" указывает, как используется информация о кернинге шрифта.*/
ctx.fontKerning = 'auto'; // default
ctx.fillText(`AVA Ta We (default: ${ctx.fontKerning})`, 305, 30);

ctx.fontKerning = 'normal';
ctx.fillText(`AVA Ta We (${ctx.fontKerning})`, 305, 70);

ctx.fontKerning = 'none';
ctx.fillText(`AVA Ta We (${ctx.fontKerning})`, 305, 110);

/*-------------------------------------------------------------------------------------------------------------*/

// Create a conic gradient
// The start angle is 0
// The center position is 100, 300
/*Метод "createConicGradient()" создает градиент вокруг точки с заданными координатами под углом, под которым 
начинается градиент, в радианах. Этот угол начинается с линии, идущей горизонтально прямо из центра, и 
продолжается по часовой стрелке. Этот метод возвращает конический объект типа "CanvasGradient". Чтобы применить 
градиент к фигуре, его необходимо сначала присвоить свойствам "fillStyle" или "strokeStyle".*/
const gradient = ctx.createConicGradient(0, 100, 300);

/*Добавим 5 точек остановки цвета.*/
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.25, 'orange');
gradient.addColorStop(0.5, 'yellow');
gradient.addColorStop(0.75, 'green');
gradient.addColorStop(1, 'blue');

ctx.fillStyle = gradient;
ctx.fillRect(20, 220, 200, 200);