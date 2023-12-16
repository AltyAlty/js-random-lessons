const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

const img = new Image();
img.src = './src/src.jpg';

img.onload = () => {
    const w = img.width;
    const h = img.height;

    ctx.drawImage(img, 0, 24, w, h);

    /*Свойство "imageSmoothingEnabled" определяет, сглаживаются ли масштабированные изображения или нет.*/
    ctx.imageSmoothingEnabled = true;
    /*Свойство "imageSmoothingQuality" устанавливает качество сглаживания изображения. Может принимать значения "low",
    "medium" и "high".*/
    ctx.imageSmoothingQuality = 'low';
    ctx.drawImage(img, w, 24, w * 1.5, h * 1.5);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, w * 2.5, 24, w * 1.5, h * 1.5);
};