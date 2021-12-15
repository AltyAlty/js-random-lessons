/*Чтобы проанализоровать работу внутри функции в дебаггере, нужно
ставить точку остановки внутри этой функции.*/

/*--------------------------------------------------------------------------------*/

/*Свойство "target" у объекта события указывает на элемент, в котором
произошло событие, а свойство "currentTarget" указывает на элемент,
который подписан на это событие.*/

const tempDivElement = document.querySelector('.temp-div');

function inspectTargets(e) {
    console.log('e.target is');
    console.log(e.target);

    console.log('e.currentTarget is');
    console.log(e.currentTarget);

    e.currentTarget.className = 'temp-div-two';

    e.target.innerHTML += ' PUSH ME AGAIN!';
};

tempDivElement.addEventListener('click', inspectTargets);

/*--------------------------------------------------------------------------------*/

if (3) console.log('numbers are pseudo truth');

if (0) console.log('but zero is pseudo lie');

if (-0) console.log('and negative zero is pseudo lie too');

if ('text') console.log('not empty strings are pseudo truth');

if ('   ') console.log('not empty strings full of spaces are pseudo truth too');

if ('') console.log('but empty strings are pseudo lie');

if ([1, 2, 3]) console.log('not empty arrays are pseudo truth');

if ([]) console.log('empty arrays are pseudo truth too');

if ({ k: 3 }) console.log('not empty objects are pseudo truth');

if ({}) console.log('empty objects are pseudo truth too');

if (null) console.log('null is pseudo lie');

if (undefined) console.log('undefined is pseudo lie');

if (NaN) console.log('NaN is pseudo lie');

/*Функция-конструктор "Boolean" принимает значение и преобразовывает его
в булево значение.*/

if (Boolean(3)) console.log('Boolean(3) is true');

if (Boolean(null)) console.log('Boolean(null) is false');

if (new Boolean(null)) console.log('but new Boolean(null) is true because it is an object');

if (!!3) console.log('!!3 is true. !! works as Boolean()');

if (function () { }) console.log('functions are pseudo truth');

/*--------------------------------------------------------------------------------*/

/*При сравнении строк идет посимвольное сравнение по ASCII значению до тех пор,
пока не будет получено "true".*/
if ('132' > '123') console.log('1');
if ('132' > '12399999') console.log('2');
if ('13' > '123') console.log('3');
if ('123' > '013') console.log('4');
if ('123' > '12') console.log('5');
if ('back' > 'Back') console.log('6');
if ('back' > 'Backk') console.log('7');
if ('back' > 'Baak') console.log('8');
if ('back' > 'baak') console.log('9');
if ('cack' > 'back') console.log('10');
if ('cack' > 'backk') console.log('11');
if ('cack' > 'badck') console.log('12');
if ('backk' > 'back') console.log('13');
if ('back' > 'baack') console.log('14');
if ('back' > 'bac') console.log('15');
if ('c'> 'b') console.log('16');
if ('c'> 'bb') console.log('17');
if ('c' > 'bcccccc') console.log('18');