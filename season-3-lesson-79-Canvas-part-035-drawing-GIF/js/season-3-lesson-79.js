const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

const imagePlayerRunning = new Image(32, 64);
imagePlayerRunning.src = './src/character-run-001-frames.png';

let timeoutFunction; // Будет хранить ID timeOut-функции, для ее подчистки.
let tickRate = 1000 / 15; // Скорость отрисовки GIF-изображения.
let xImageCoordinate = 0; /*Координата сдвига по Х оригинального изображения, чтобы двигать его внутри области
изображения на холсте, с целью имитации анимации.*/

function drawGIF() {
    /*Закрашываем экран перед отрисовкой кадра.*/
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /*Отрисовываем кадр анимации.*/
    ctx.drawImage(imagePlayerRunning,
        xImageCoordinate, 0, 32, 64,
        0, 0, 32, 64);

    /*Если мы отрисовали последний кадр из раскадровки анимации, то возвращаемся на позицию X так, чтобы следующий кадр
    оказался самым первым из раскадровки. Иначе, двигаем по раскадровке дальше.*/
    if (xImageCoordinate >= 160) {
        xImageCoordinate = 0;
    } else {
        xImageCoordinate += 32;
    };
};

function tick() {
    window.clearTimeout(timeoutFunction);
    drawGIF();
    timeoutFunction = window.setTimeout('tick()', tickRate);
};

tick();