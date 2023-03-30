const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------*/

/*Свойство "globalAlpha" определяет альфа-(прозрачность) значение, которое будет применено к фигурам и картинкам 
до того как они будут отрисованы на холсте.*/
ctx.globalAlpha = 0.5;

ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 100);

ctx.fillStyle = 'red';
ctx.fillRect(50, 50, 100, 100);

/*-------------------------------------------------------------------------------------------------------------*/

ctx.fillStyle = '#FD0';
ctx.fillRect(0, 200, 75, 75);
ctx.fillStyle = '#6C0';
ctx.fillRect(75, 200, 75, 75);
ctx.fillStyle = '#09F';
ctx.fillRect(0, 275, 75, 75);
ctx.fillStyle = '#F30';
ctx.fillRect(75, 275, 75, 75);
ctx.fillStyle = '#FFF';

ctx.globalAlpha = 0.2;

for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(75, 275, 10 + 10 * i, 0, Math.PI * 2, true);
    ctx.fill();
};

/*-------------------------------------------------------------------------------------------------------------*/

ctx.globalAlpha = 1;

let compostionValuesOne = [
    'source-over',
    'source-atop',
    'destination-over',
    'destination-out',
    'lighter',
    'xor',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'hard-light',
    'soft-light',
    'difference',
];

let xCoordinateOne = 200;
let yCoordinateOne = 220;

for (let i = 0; i < compostionValuesOne.length; i++) {
    /*Свойство "globalCompositeOperation" устанавливает тип операции компоновки, применяемой при рисовании новых 
    фигур.*/
    ctx.globalCompositeOperation = compostionValuesOne[i];

    ctx.fillStyle = 'blue';
    ctx.fillRect(xCoordinateOne, 10, 50, 50);

    ctx.fillStyle = 'red';
    ctx.fillRect(yCoordinateOne, 30, 50, 50);

    xCoordinateOne = xCoordinateOne + 80;
    yCoordinateOne = yCoordinateOne + 80;
};


let compostionValuesTwo = [
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity'
];

let xCoordinateTwo = 200;
let yCoordinateTwo = 220;

for (let i = 0; i < compostionValuesTwo.length; i++) {
    ctx.globalCompositeOperation = compostionValuesTwo[i];

    ctx.fillStyle = 'blue';
    ctx.fillRect(xCoordinateTwo, 100, 50, 50);

    ctx.fillStyle = 'red';
    ctx.fillRect(yCoordinateTwo, 120, 50, 50);

    xCoordinateTwo = xCoordinateTwo + 80;
    yCoordinateTwo = yCoordinateTwo + 80;
};


let compostionValuesThree = [
    // 'source-in',
    // 'source-out',
    // 'destination-in',
    // 'destination-atop',
    // 'copy'
];

let xCoordinateThree = 200;
let yCoordinateThree = 220;

for (let i = 0; i < compostionValuesThree.length; i++) {
    ctx.globalCompositeOperation = compostionValuesThree[i];

    ctx.fillStyle = 'blue';
    ctx.fillRect(xCoordinateThree, 190, 50, 50);

    ctx.fillStyle = 'red';
    ctx.fillRect(yCoordinateThree, 210, 50, 50);

    xCoordinateThree = xCoordinateThree + 80;
    yCoordinateThree = yCoordinateThree + 80;
};