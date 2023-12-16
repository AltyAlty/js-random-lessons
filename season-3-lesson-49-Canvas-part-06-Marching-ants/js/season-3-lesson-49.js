const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

let offset = 0;

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([4, 2]);
    ctx.lineDashOffset = -offset;
    ctx.strokeRect(10, 10, 100, 100);
};

const march = () => {
    offset++;

    if (offset > 16) {
        offset = 0;
    };

    draw();

    setTimeout(march, 20);
};

march();