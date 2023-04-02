const canvases = document.querySelectorAll('canvas');
const ctx1 = canvases[0].getContext('2d');
const ctx2 = canvases[1].getContext('2d');

/*-------------------------------------------------------------------------------------------------------------*/

ctx1.setTransform(1, 0.2, 0.8, 1, 0, 0);
ctx1.fillRect(25, 25, 50, 50);

/*Метод "getTransform()" извлекает текущую матрицу преобразования, применяемую к контексту.*/
let storedTransform = ctx1.getTransform();
console.log(storedTransform);

ctx2.setTransform(storedTransform);
ctx2.beginPath();
ctx2.arc(50, 50, 50, 0, 2 * Math.PI);
ctx2.fill();
