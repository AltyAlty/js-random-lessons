const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

const baselinesAboveAlphabetic = [
    'fontBoundingBoxAscent',
    'actualBoundingBoxAscent',
    'emHeightAscent',
    'hangingBaseline',
];

const baselinesBelowAlphabetic = [
    'ideographicBaseline',
    'emHeightDescent',
    'actualBoundingBoxDescent',
    'fontBoundingBoxDescent',
];

const baselines = [...baselinesAboveAlphabetic, ...baselinesBelowAlphabetic];
console.log(baselines);

/*Свойство "font" определяет текущие стили рисуемого текста. Нужно использовать синтаксис CSS font.*/
ctx.font = '25px serif';

ctx.strokeStyle = 'red';

baselines.forEach((baseline, index) => {
    const text = `Abcdefghijklmnop (${baseline})`;

    /*Метод "measureText()" возвращает объект типа "TextMetrics", содержащий информацию об измеренном тексте.*/
    const textMetrics = ctx.measureText(text);
    console.log(textMetrics);

    const y = 50 + index * 50;

    /*Метод 'beginPath()' начинает путь или сбрасывает текущий путь, то есть он как-будто позволяет нам симитировать
    момент когда мы держим, например, карандаш в руке и прикладываем его к бумаге, чтобы начать рисовать, и момент когда
    мы убираем карандаш от бумаги, чтобы взять, например, другой карандаш и начать рисовать что-то другое. Важно
    понимать, что при каждом таком сбросе, место откуда мы будем начинать рисовать это координаты (0;0).*/
    ctx.beginPath();
    
    ctx.fillStyle = 'blue';

    /*Метод "fillText" рисует (заливает) заданный текст первым параметром в заданной позиции (x, y), заданой вторым и
    третьим параметрами. Если указан необязательный четвертый параметр, то текст будет масштабироваться в соответствии с
    указанной максимальной шириной.*/
    ctx.fillText(text, 0, y);
    
    let lineY = y - Math.abs(textMetrics[baseline]);
    
    if (baselinesBelowAlphabetic.includes(baseline)) {
        lineY = y + Math.abs(textMetrics[baseline]);
    };
    
    /*Метод "moveTo()" позволяет переместить указатель в начальную позицию для рисования линии в координаты (x, y).*/
    ctx.moveTo(0, lineY);

    /*Метод "lineTo()" позволяет указать конечную позицию для рисования линии и провести эту линию от начальной позиции.
    Сам метод ничего не рисует, он лишь добавляет подпуть к текущему пути, предоставляя его таким методам, как "fill()"
    и "stroke()", отрисовывающим сам путь.*/
    ctx.lineTo(550, lineY);

    ctx.stroke();
});

/*-------------------------------------------------------------------------------------------------------------------*/

/*Каждый вызов метода "lineTo()" автоматически добавляет текущий подпуть, что означает, что все линии будут обведены и
закрашены вместе.*/
ctx.moveTo(790, 130);
ctx.lineTo(795, 25);
ctx.lineTo(850, 80);
ctx.lineTo(905, 25);
ctx.lineTo(910, 130);

/*Свойство "lineWidth" задает толщину линий в пикселях.*/
ctx.lineWidth = 15;

ctx.stroke();