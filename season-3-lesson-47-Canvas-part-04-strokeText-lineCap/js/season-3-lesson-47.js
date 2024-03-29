const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

ctx.font = '48px serif';

/*Метод "strokeText()" выполняет обводку заданного текста первым параметром в заданной позиции (x, y), заданной вторым и
третьим параметрами. Если указан необязательный четвертый параметр, текст будет масштабироваться в соответствие с
указанной максимальной шириной.*/
ctx.strokeText('Hello world', 50, 100);

/*-------------------------------------------------------------------------------------------------------------------*/

ctx.beginPath();

ctx.moveTo(350, 20);

ctx.lineWidth = 15;

/*Свойство "lineCap" определяет, как будут выглядеть концы нарисованных линий. Может быть равен одному из следующих
значений: "butt" - концы линий прямые, "round" - концы линий скругленные, "square" - концы линий прямые, но к ней с
обоих концов добавляется поле с шириной равной толщине линии и высотой равной половине от толщины линии.*/
ctx.lineCap = 'round';

ctx.lineTo(430, 100);
ctx.stroke();

/*-------------------------------------------------------------------------------------------------------------------*/

const lineCap = ['butt', 'round', 'square'];

ctx.lineWidth = 1;

ctx.strokeStyle = '#09f';

ctx.beginPath();
ctx.moveTo(10, 310);
ctx.lineTo(140, 310);
ctx.moveTo(10, 440);
ctx.lineTo(140, 440);
ctx.stroke();

/*Левая линия будет использовать значение "lineCap" "butt". Она не будет выходить за направляющие. Средняя линия будет
нарисована со значением "round". За направляющие будут выходить полукруги с диаметром равным толщине линии. Правая линия
будет использовать значение "square". Она будет выходить за направляющие на поля с шириной равной толщине линии и
высотой равной половине толщины.*/
ctx.strokeStyle = 'black';

for (let i = 0; i < lineCap.length; i++) {
    ctx.lineWidth = 15;
    ctx.lineCap = lineCap[i];
    ctx.beginPath();
    ctx.moveTo(25 + i * 50, 310);
    ctx.lineTo(25 + i * 50, 440);
    ctx.stroke();
};