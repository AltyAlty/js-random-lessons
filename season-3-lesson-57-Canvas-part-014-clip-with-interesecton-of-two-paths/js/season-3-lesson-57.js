const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

// Создаем два пути
let circlePath = new Path2D();
circlePath.arc(150, 75, 75, 0, 2 * Math.PI);
let squarePath = new Path2D();
squarePath.rect(85, 10, 130, 130);

// Превращаем круг в область отсечения
ctx.clip(circlePath);
// Делаем так, чтобы областью отсечения стало пересечение первого и второго путей.
ctx.clip(squarePath);

// Draw stuff that gets clipped
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, canvas.width, canvas.height);