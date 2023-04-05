const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------*/

let sun = new Image();
let moon = new Image();
let earth = new Image();

function draw() {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 350, 350);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
    ctx.save();
    ctx.translate(150, 150);

    // Земля
    /*При помощи конструктора "Date()" можно создать специальный объект, содержащий число миллисекунд 
    прошедших с 1 января 1970 г. UTC.*/
    let time = new Date();
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 50, 24); // Тень Земли
    ctx.drawImage(earth, -12, -12);

    // Луна
    ctx.save();
    ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Орбита Земли
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, 300, 300);

    window.requestAnimationFrame(draw);
};

function init() {
    sun.src = './src/Canvas_sun.png';
    moon.src = './src/Canvas_moon.png';
    earth.src = './src/Canvas_earth.png';

    /*Метод "requestAnimationFrame()" указывает браузеру на то, что вы хотите произвести анимацию, и просит его 
    запланировать перерисовку на следующем кадре анимации. В качестве параметра метод получает функцию, которая 
    будет вызвана перед перерисовкой.*/
    window.requestAnimationFrame(draw);
};

init();