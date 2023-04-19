const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------*/

/*Создаем изображение и отрисовываем его при загрузке на нашем холсте.*/
const img = new Image();

img.crossOrigin = 'anonymous';
img.src = './src/src.jpg';

img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
});

/*Получаем доступ к двум элементам "div", который будут отображать данные пикселя, на который будет указывать
курсор.*/
const hoveredColor = document.getElementsByClassName('hovered-color')[0];
const selectedColor = document.getElementsByClassName('selected-color')[0];

function pick(event, destination) {
    /*Ищем координаты курсора внутри холста.*/
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;

    /*Получаем данные о пикселе по полученным координатам.*/
    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;

    /*Форматируем полученные данные.*/
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;

    /*Указываем данные в элементах "div".*/
    destination.style.background = rgba;
    destination.textContent = rgba;

    return rgba;
};

canvas.addEventListener('mousemove', (event) => pick(event, hoveredColor));
canvas.addEventListener('click', (event) => pick(event, selectedColor));