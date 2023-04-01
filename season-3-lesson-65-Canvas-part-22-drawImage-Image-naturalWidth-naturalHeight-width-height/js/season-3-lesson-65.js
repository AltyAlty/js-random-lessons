const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------*/

/*Создаем изображение размером 120х90 при помощи конструктора "Image()".*/
const image = new Image(120, 90);

/*Подгружаем изображение, изначальный размер которого 380x330.*/
image.src = './src/src.jpg';

function drawImageActualSize() {    
    /*Используем изначальный размер нашего изображения для установки размеров холста при помощи свойств
    "naturalWidth" и "naturalHeight".*/
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;
    
    /*Отрисовываем изображение размером 380x330, игнорируя заданный размер 120х90 в конструкторе "Image()".*/
    ctx.drawImage(this, 0, 0);
    

    /*Чтобы использовать заданный размер 120х90 в конструкторе "Image()", нам нужно указать параметры
    масштабирования, используя свойства "width" и "height", обозначающие ширину и высоту элемента.*/
    ctx.drawImage(this, 0, 0, this.width, this.height);
};

/*Отрисовываем изображение, когда оно полностью будет прогружено.*/
image.onload = drawImageActualSize;