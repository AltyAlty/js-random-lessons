const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------*/

let ourScaling = 12;

const drawAxes = (scale) => {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.setTransform(1, 0, 0, -1, canvas.width / 2, canvas.height / 2);

    ctx.beginPath();

    ctx.moveTo(0, -1 * canvas.height / 2);
    ctx.lineTo(0, canvas.height / 2);
    ctx.moveTo(-1 * canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, 0);

    ctx.stroke();

    ctx.scale(scale, scale);
};

drawAxes(ourScaling);

/*-------------------------------------------------------------------------------------------------------------*/

const drawChart = (arrOfXPoints, func, clr, isRotating) => {
    let arrOfYPoints = [];

    for (let i = 0; i < arrOfXPoints.length; i++) {
        arrOfYPoints[i] = func(arrOfXPoints[i]);
    };

    ctx.beginPath();
    ctx.lineWidth = 0.2;
    ctx.font = '1.3px serif';
    ctx.strokeStyle = clr;

    for (let i = 0; i < arrOfXPoints.length; i++) {
        ctx.lineTo(arrOfXPoints[i], arrOfYPoints[i]);
        ctx.stroke();

        /*Метод "save()" cохраняет все состояния холста и добавляет текущее состояние в стек. Состояние чертежа, 
        которое сохраняется в стеке, состоит из:
        1) Текущая матрица преобразования.
        2) Текущая область отсечения.
        3) Текущий список штриховки.
        4) Текущие значения следующих атрибутов: "strokeStyle", "fillStyle", "globalAlpha", "lineWidth", "lineCap",
        "lineJoin", "miterLimit", "lineDashOffset", "shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor", 
        "globalCompositeOperation", "font", "textAlign", "textBaseline", "direction", "imageSmoothingEnabled".*/
        ctx.save();
        ctx.setTransform(ourScaling, 0, 0, ourScaling, canvas.width / 2, (canvas.height / 2) - ourScaling * arrOfYPoints[i] * 2);
        if (isRotating) {
            ctx.rotate(-1 * degree * Math.PI / 180);
        };
        ctx.fillText('(' + arrOfXPoints[i] + ':' + arrOfYPoints[i] + ')', arrOfXPoints[i], arrOfYPoints[i]);
        /*Метод "restore()" восстанавливает предварительно сохраненное состояние холста из стека. Если состояние 
        ранее не сохранялось, то метод ничего не делает.*/
        ctx.restore();
    };
};

let xPoints = {
    arrOfXPoints01: [5, 10, 0, -5, -10],
    arrOfXPoints02: [6, 10, 0, -6, -10],
    arrOfXPoints03: [1, 2, 0, -1, -2],
    arrOfXPoints04: [2, 4, 0, -2, -4],
    arrOfXPoints05: [2, 4, 6, 8, 10, 12, 0, -2, -4, -6, -8, -10, -12],
    arrOfXPoints06: [-1, 0, 1, 2, 3, 4, 5],
    arrOfXPoints07: [-2, -1, 0, 1, 2]
};

let functions = {
    someMathFunction01: (x) => { return 1 - 1.5 * x; },
    someMathFunction02: (x) => { return 2 - 2 * x * x; },
    someMathFunction03: (x) => { return 2 * x * x - 2; },
    someMathFunction04: (x) => { return 1.5 * x - 1; },
    someMathFunction05: (x) => { return x * x - 4 * x; },
    someMathFunction06: (x) => { return x * x * x; }
};

const drawSpecificCharts = (isRotating) => {
    drawChart(xPoints.arrOfXPoints04, functions.someMathFunction01, 'blue', isRotating);
    drawChart(xPoints.arrOfXPoints04, functions.someMathFunction02, 'green', isRotating);
    drawChart(xPoints.arrOfXPoints04, functions.someMathFunction03, 'red', isRotating);
    drawChart(xPoints.arrOfXPoints05, functions.someMathFunction04, 'yellow', isRotating);
    drawChart(xPoints.arrOfXPoints06, functions.someMathFunction05, 'violet', isRotating);
    drawChart(xPoints.arrOfXPoints07, functions.someMathFunction06, 'pink', isRotating);
};

drawSpecificCharts(false);

/*-------------------------------------------------------------------------------------------------------------*/

let degree = 0;

let rotateItTimeout;

const rotateIt = (direction) => {
    ctx.clearRect(-1 * canvas.width, -1 * canvas.height, canvas.width * 2, canvas.height * 2);

    drawAxes(ourScaling);

    ctx.rotate(degree * Math.PI / 180);

    drawSpecificCharts(true);

    if (direction === 'left') {
        degree--;
    } else if (direction === 'right') {
        degree++
    };

    rotateItTimeout = setTimeout(() => {
        rotateIt(direction);
    }, 25);
};

const slowRotateIt = () => {
    window.clearTimeout(rotateItTimeout);
};

const reset = () => {
    degree = 0;

    ctx.clearRect(-1 * canvas.width, -1 * canvas.height, canvas.width * 2, canvas.height * 2);

    drawAxes(ourScaling);

    drawSpecificCharts(false);
};