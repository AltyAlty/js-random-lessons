const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Функция для переопределения размеров холста, если мы меняем размер окна браузера.*/
function setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
};

/*Подписываеся на событие изменения размера окна браузера, чтобы своевременно менять размер холста.*/
addEventListener('resize', () => setSize());

/*Создаем объект для хранения текущий координат нашего курсора. Изначально центр окна.*/
const cursor = {
    /*Свойства "innerHeight" и "innerWidth" содержать высоту и ширину области просмотра страницы, включая полосы
    прокрутки.*/
    x: innerWidth / 2,
    y: innerHeight / 2,
};

/*Подписываемся на событие движения мышкой, чтобы получать актуальные координаты курсора.*/
addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
});

/*Подписываемся на событие движения касанием по экрану, чтобы получать актуальные координаты касания по экрану.*/
addEventListener(
    'touchmove',
    (e) => {
        e.preventDefault();
        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
    },
    { passive: false }
);

/*Задаем прозрачность холста.*/
ctx.globalAlpha = 0.5;

/*Функция-конструктор для создания частиц.*/
function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
    this.x = x;
    this.y = y;
    this.particleTrailWidth = particleTrailWidth;
    this.strokeColor = strokeColor;
    this.theta = Math.random() * Math.PI * 2;
    this.rotateSpeed = rotateSpeed;
    this.t = Math.random() * 150;

    this.rotate = () => {
        const ls = {
            x: this.x,
            y: this.y,
        };
        
        this.theta += this.rotateSpeed;

        this.x = cursor.x + Math.cos(this.theta) * this.t;
        this.y = cursor.y + Math.sin(this.theta) * this.t;

        ctx.beginPath();

        ctx.lineWidth = this.particleTrailWidth;
        ctx.strokeStyle = this.strokeColor;
        
        ctx.moveTo(ls.x, ls.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    };
};

/*Функция для генерации случайного цвета.*/
function generateColor() {
    let hexSet = '0123456789ABCDEF';
    let finalHexString = '#';

    for (let i = 0; i < 6; i++) {
        finalHexString += hexSet[Math.ceil(Math.random() * 15)];
    };

    return finalHexString;
};

/*Массив для хранения объектов, описывающих наши частицы.*/
let particlesArray = [];

/*Функция для генерации указанного количества частиц.*/
function generateParticles(amount) {
    for (let i = 0; i < amount; i++) {
        particlesArray[i] = new Particle(
            innerWidth / 2,
            innerHeight / 2,
            4,
            generateColor(),
            0.02
        );
    };
};

/*Функция для запуска анимации частиц.*/
function anim() {
    requestAnimationFrame(anim);

    /*Если не использовать прозрачность, то не будет оставаться следа. С прозрачностью остается след, который со
    временем исчезает. Так происходит так, как каждая новая отрисовака закрашивает весь канвас цветом с определенной
    прозрачностью. Из-за этого поверх ранее отрисованных кадров накладывается эта прозрачность, причем чем "старше"
    кадр, тем больше слоев прозрачности на него накладывается, что в итоге приводит к тому, что этот кадр полностью
    затирается. Получается, что каждая точка рисует линию, состоящую из точек, отрисованных более ранними кадрами, при
    этом каждая такая точка имеет на 1 больше наложенных слоев с прозрачностью, чем следующая, то есть каждая точка
    более плохо видна, чем следующая, что создает эффект затухающего следа.*/
    // ctx.fillStyle = 'black';    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach((particle) => particle.rotate());
};

generateParticles(10);
setSize();
anim();