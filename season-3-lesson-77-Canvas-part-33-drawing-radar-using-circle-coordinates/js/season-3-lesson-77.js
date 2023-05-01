const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------*/

let radius = 200;
let i = 0;
let steps = 10;
let xOne;
let yOne;
let xTwo;
let yTwo;

function helicopter() {
    ctx.fillStyle = 'rgba(22, 55, 40, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /*centerX or centerY of the circle + radius of the circle * Math.cos(2 * Math.PI * i / steps)*/
    xOne = (canvas.width / 2 + radius * Math.cos(2 * Math.PI * i / steps));
    yOne = (canvas.height / 2 + radius * Math.sin(2 * Math.PI * i / steps));

    xTwo = (canvas.width / 2 - radius * Math.cos(2 * Math.PI * i / steps));
    yTwo = (canvas.height / 2 - radius * Math.sin(2 * Math.PI * i / steps));

    i = i + 0.05;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    // ctx.moveTo(xOne, yOne);
    ctx.lineTo(xTwo, yTwo);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 5;
    ctx.stroke();
};

setInterval(() => {
    helicopter();
}, 10);