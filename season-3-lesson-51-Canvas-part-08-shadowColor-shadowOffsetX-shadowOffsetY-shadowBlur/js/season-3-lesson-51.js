const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Свойство "shadowColor" определяет цвет теней. На отображаемую непрозрачность тени будет влиять непрозрачность цвета в
свойстве "fillStyle" при заливке и цвета в свойстве "strokeStyle" при обводке.

Тени рисуются только в том случае, если для свойства "shadowColor" задано непрозрачное значение. Одно из свойств
"shadowBlur", "shadowOffsetX" или "shadowOffsetY" также должно быть ненулевым.*/
ctx.shadowColor = 'red';

/*Свойство "shadowOffsetX" определяет расстояние, на которое тени будут смещены по горизонтали.*/
ctx.shadowOffsetX = 10;

/*Свойство "shadowOffsetY" определяет расстояние, на которое тени будут смещены по вертикали.*/
ctx.shadowOffsetY = 10;

ctx.fillRect(20, 20, 100, 100);

ctx.lineWidth = 6;
ctx.strokeRect(170, 20, 100, 100);

/*-------------------------------------------------------------------------------------------------------------------*/

ctx.shadowColor = 'red';

/*Свойство "shadowBlur" определяет степень размытия, применяемого к теням. По умолчанию имеет значение 0 (без
размытия).*/
ctx.shadowBlur = 15;

ctx.fillStyle = 'blue';
ctx.fillRect(300, 20, 150, 100);

/*-------------------------------------------------------------------------------------------------------------------*/

ctx.shadowColor = 'red';
ctx.shadowOffsetX = 25;
ctx.shadowOffsetY = 0;
ctx.shadowBlur = 10;

ctx.fillStyle = 'blue';
ctx.fillRect(500, 20, 150, 100);

/*-------------------------------------------------------------------------------------------------------------------*/

ctx.shadowColor = 'red';
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 25;
ctx.shadowBlur = 10;

ctx.fillStyle = 'blue';
ctx.fillRect(720, 20, 150, 80);