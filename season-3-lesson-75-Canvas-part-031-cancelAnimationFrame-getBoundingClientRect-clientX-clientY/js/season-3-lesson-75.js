const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

let raf;

let raf3;
let running = false;

const ball1 = {
    x: 100,
    y: 100,
    xVelocity: 5,
    yVelocity: 2,
    radius: 25,
    color: 'blue',

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    },
};

const ball2 = {
    x: 100,
    y: 100,
    xVelocity: 5,
    yVelocity: 2,
    radius: 25,
    color: 'red',

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    },
};

const ball3 = {
    x: 100,
    y: 100,
    xVelocity: 5,
    yVelocity: 1,
    radius: 25,
    color: 'green',

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    },
};

function draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /*----------------------------------------------------------------------------------------------------------------*/

    ball1.draw();

    ball1.x += ball1.xVelocity;
    ball1.y += ball1.yVelocity;

    if (ball1.y + ball1.yVelocity > canvas.height || ball1.y + ball1.yVelocity < 0) {
        ball1.yVelocity = -ball1.yVelocity;
    };

    if (ball1.x + ball1.xVelocity > canvas.width || ball1.x + ball1.xVelocity < 0) {
        ball1.xVelocity = -ball1.xVelocity;
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    ball2.draw();

    ball2.x += ball2.xVelocity;
    ball2.y += ball2.yVelocity;

    ball2.yVelocity *= 0.99;
    ball2.yVelocity += 0.25;

    if (ball2.y + ball2.yVelocity > canvas.height || ball2.y + ball2.yVelocity < 0) {
        ball2.yVelocity = -ball2.yVelocity;
    };

    if (ball2.x + ball2.xVelocity > canvas.width || ball2.x + ball2.xVelocity < 0) {
        ball2.xVelocity = -ball2.xVelocity;
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    raf = window.requestAnimationFrame(draw);

    ball3.draw();
};

function draw3() {
    ball3.draw();

    ball3.x += ball3.xVelocity;
    ball3.y += ball3.yVelocity;

    if (ball3.y + ball3.yVelocity > canvas.height || ball3.y + ball3.yVelocity < 0) {
        ball3.yVelocity = -ball3.yVelocity;
    };

    if (ball3.x + ball3.xVelocity > canvas.width || ball3.x + ball3.xVelocity < 0) {
        ball3.xVelocity = -ball3.xVelocity;
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    raf3 = window.requestAnimationFrame(draw3);
};

canvas.addEventListener('mouseover', (e) => {
    raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener('mouseout', (e) => {
    /*Метод "cancelAnimationFrame()" останавливает анимацию, запланированную с помощью метода
    "requestAnimationFrame()".*/
    window.cancelAnimationFrame(raf);

    window.cancelAnimationFrame(raf3);
    running = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (!running) {
        /*Метод "getBoundingClientRect()" возвращает размер элемента и его позицию относительно viewport (части
        страницы, показанной на экране, и которую мы видим). Данный метод возвращает объект, который является
        объединением прямоугольников, возвращаемых методом "getClientRects()" для данного элемента, то есть для
        "CSS border-boxes" (css-коробок в рамках), связанных с этим элементом. Результатом является самый маленький
        прямоугольник, в котором содержится весь элемент с read-only свойствами "left", "top", "right", "bottom", "x",
        "y", "width" и "height", описывающими его в пикселях. Все свойства, кроме "width" и "height", являются
        относительными к верхнему левому углу viewport-а.*/
        let bounding = canvas.getBoundingClientRect();

        /*Свойства "clientX" и "clientY" - это доступный только для чтения свойство, которые являются горизонтальной и
        вертикальной координатами в пределах клиентской области приложения, на которой произошло событие (в отличие от
        координат внутри страницы). Для примера, нажатие в верхнем левом углу клиентской области будет всегда приводить
        к событию со значением 0 для этих свойств, независимо от того, прокручена страницы по горизонтали или нет.

        Поскольку свойства "clientX" и "clientY" предоставляются относительно "клиентской области", то есть части
        страницы, которую вы просматриваете в данный момент, то вам нужно внесить коррективы, чтобы учесть положение
        элемента холста относительно клиентской области. Для этого есть метод "getBoundingClientRect()", который
        предоставляет расположение и размеры элемента в координатах клиентской области.
        
        Таким образом, используя свойства "clientX" и "clientY" и метод "getBoundingClientRect()", можно найти
        координаты курсора внутри элементов.*/
        ball3.x = e.clientX - bounding.left;
        ball3.y = e.clientY - bounding.top;

        ball3.draw();
    };
});

canvas.addEventListener('click', (e) => {
    if (!running) {
        raf3 = window.requestAnimationFrame(draw3);

        running = true;
    };
});

ball1.draw();
ball2.draw();
ball3.draw();