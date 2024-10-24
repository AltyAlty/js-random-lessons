'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Деструктурирующее присваивание – это специальный синтаксис, который позволяет нам "распаковать" массивы или объекты 
в несколько переменных, так как иногда они более удобны. "Деструктурирующее присваивание" не уничтожает массив. Оно 
вообще ничего не делает с правой частью присваивания, его задача – только скопировать нужные значения в переменные.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Деструктуризация массива.*/
let arr01 = [1, 2, 3];
/*Используем квадратные скобки, поскольку деструктуризируем именно массив. А внутри первая переменная получит первый
элеменент из массива в качестве значения, а вторая переменная - второй. Третий элемент в присваивании участвовать не
будет.*/
let [a, b] = arr01;
// let a = arr01[0];
// let b = arr01[1];
console.log(a); // 1
console.log(b); // 2

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Нежелательные элементы массива также могут быть отброшены с помощью дополнительной запятой.*/
let arr02 = [1, 2, 3];
let [c, , d] = arr02;
console.log(c); // 1 
console.log(d); // 3

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Можем использовать любой перебираемый объект, не только массивы.*/
let [e, f, g] = new Set([1, 2, 3]);
console.log(e); // 1
console.log(f); // 2
console.log(g); // 3

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Деструктурирующее присваивание можно использовать в циклах.*/
let obj01 = { a: 1, b: 2 };

for (const [key, value] of Object.entries(obj01)) { // [ [ "a", 1 ], [ "b", 2 ] ]
    console.log(key);
    console.log(value);
};

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Существует хорошо известный трюк для обмена значений двух переменных с использованием деструктурирующего 
присваивания. Здесь мы создаем временный массив из двух переменных и немедленно деструктурируем его в порядке замены. 
Таким образом, мы можем поменять местами даже более двух переменных.*/
let h = 1;
let i = 2;
[h, i] = [i, h];
// let tempH = h; // 1
// h = i; // 2
// i = tempH; // 1
console.log(h); // 2
console.log(i); // 1

console.log(' ');

let j = 1;
let k = 2;
let l = 3;
[j, k, l] = [k, l, j];
console.log(j); // 2
console.log(k); // 3
console.log(l); // 1

console.log(' ');

let obj02 = { a: 1 };
let obj03 = { b: 2 };
[obj02, obj03] = [obj03, obj02];
console.log(obj02); // { b: 2 }
console.log(obj03); // { a: 1 }

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если мы хотим не просто получить первые значения, но и собрать все остальные, то мы можем добавить еще один параметр, 
который получит остальные значения, используя оператор "остаточные параметры" - троеточие ("...").*/
let arr03 = [1, 2, 3, 4, 5];
let [m, n, ...rest] = arr03;
console.log(m); // 1
console.log(n); // 2
console.log(rest); // [3, 4, 5]

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если мы хотим, чтобы значение "по умолчанию" заменило отсутствующее в массиве, мы можем указать его с помощью "=".*/
let arr04 = [];
let [o = 1, p = 2] = arr04;
console.log(o); // 1
console.log(p); // 2

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Деструктуризация объекта.*/
let obj04 = { q: 1, r: 2, s: 3 };
/*Используем фигурные скобки, поскольку деструктуризируем именно объект. А внутри первая переменная получит значение
свойства "q" в объекте, а вторая переменная - значение свойства "r". Свойство "s" в присваивании участвовать не 
будет.*/
let { r, q } = obj04;
console.log(q); // 1
console.log(r); // 2

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если мы хотим присвоить свойство объекта переменной с другим названием, то мы можем использовать двоеточие.*/
let obj05 = { s: 1, t: 2, u: 3 };
let { s, t: tt } = obj05;
console.log(s); // 1
console.log(tt); // 2

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если мы хотим, чтобы значение "по умолчанию" заменило отсутствующее в объекте, мы можем указать его с помощью "=".*/
let obj06 = {};
let { t = 1, u = 2 } = obj06;
console.log(t);
console.log(u);

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Можно совмещать ":" и "=".*/
let obj07 = { v: 1 };
let { v: vv = 11, w: ww = 22 } = obj07;
console.log(vv); // 1
console.log(ww); // 22

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Если мы хотим не просто получить какие-то свойства объекта, но и собрать все остальные свойства, то мы можем добавить
еще один параметр, который получит остальные значения, используя оператор "остаточные параметры" - троеточие ("...").*/
let obj08 = { v: 1, w: 2, x: 3 };
let { v, ...rest2 } = obj08;
console.log(v); // 1
console.log(rest2); // { w: 2, x: 3 }

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*В примерах выше переменные были объявлены в присваивании через let. Но если бы мы не использовали let/const/var, то
код бы не работал.*/
let w, x;
let obj09 = { w: 1, x: 2 }
// { w, x } = obj09; //  Uncaught SyntaxError: expected expression, got '='

/*Проблема в том, что JavaScript обрабатывает {...} в основном потоке кода (не внутри другого выражения) как блок 
кода. В примере ниже два блока кода создали две локальные области видимости на одном уровне, поэтому во втором блоке
кода нет доступа к переменной "abc" из первого блока.*/

{
    let abc = 1;
};

{
    // console.log(abc); // Uncaught ReferenceError: abc is not defined
};

/*Чтобы показать JavaScript, что это не блок кода, мы можем заключить выражение в скобки (...).*/
({ w, x } = obj09);
console.log(w); // 1
console.log(x); // 2

/*С массивами указанной проблемы нет.*/
let yy, zz;
[yy, zz] = [111, 222];
console.log(yy); // 111
console.log(zz); // 222

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Вложенная деструктуризация.*/
let obj10 = {
    y: {
        aa: 1,
        bb: 2
    },
    z: [3, 4],
    cc: true
};

let {
    y,
    y: {
        aa,
        bb
    },
    z: [ee, ff],
    dd = false
} = obj10;

console.log(aa); // 1
console.log(bb); // 2
console.log(ee); // 3
console.log(ff); // 4
console.log(dd); // false
console.log(y); // { aa: 1, bb: 2 }

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Есть ситуации, когда функция имеет много параметров, большинство из которых не обязательны. При помощи 
деструктуризации можно вызвать такую функцию, когда большинство параметров передавать не надо, и значения по умолчанию 
вполне подходят.*/
function func01(gg = 'gg', hh = 'hh', ii = 'ii', jj = 'jj') {
    console.log(gg); // 'gg' -> 'g1'
    console.log(hh); // 'hh' -> 'hh'
    console.log(ii); // 'ii' -> 'ii'
    console.log(jj); // 'jj' -> 'j1'
};

/*Здесь при вызове все параметры возьмут значения по умолчанию, так как мы не передали ни одного параметра.*/
func01();
console.log(' ');

/*Пытаемся указать первый и последний параметр. Приходится использовать "undefined", чтобы заставить второй и третий
параметры взять значения по умолчанию. Выглядит неудобно.*/
func01('g1', undefined, undefined, 'j1');
console.log(' ');

/*Когда мы вызываем функцию с параметрами, происходит инициализация локальных переменных в виде этих параметров со
значениями, которые мы передали в момент запуска функции. То есть здесь при запуске функции запустится код ПОХОЖИЙ
на следующий: "let a = 1". То есть произойдет инициализация локальной переменной "a" со значением "1". А раз при
инициализации параметров происходит присваивание, значит мы можем использовать там деструктурирующее присваивание.*/
function func02(a) { console.log(a) };
func02(1);

/*Здесь при описании параметров указываем их в фигурных скобках, чтобы использовать деструктурирующее присваивание. А
это означает, что при вызове функции мы должны будем передать в качестве параметра объект, содержащий свойства с 
именами, соответствующими нужным нам параметрам для указания в функции. То есть при запуске функции чуть ниже запустится 
код ПОХОЖИЙ на следующий: "let { gg = 'gg', hh = 'hh', ii = 'ii', jj = 'jj' } = { gg: 'g1', jj: 'j1' }". Это код похож
на обычную деструктуризацию объекта, пример которой есть ниже.*/
function func03({ gg = 'gg', hh = 'hh', ii = 'ii', jj = 'jj' } = {}) {
    console.log(gg); // 'g1'
    console.log(hh); // 'hh'
    console.log(ii); // 'ii'
    console.log(jj); // 'j1'
};

/*Заготавливаем объект с нужными нам параметрами для функции. Этот объект будет деструктуризирован при запуске функции,
чтобы параметры "gg" и "jj" получили значения "g1" и "j1" соотвественно, а параметры "hh" и "ii" взяли значения "hh" и 
"ii" по умолчанию соответственно.*/
let options = {
    gg: 'g1',
    jj: 'j1'
};

/*Запускаем функцию с одним параметром в виде объекта, который будет деструктуризирован для иницализации параметров
функции.*/
func03(options);
console.log(' ');

/*Пример обычной деструктуризации объекта. Этот пример похож на то, как происходит инициализация параметров при запуске
функции "func03()" выше.*/
let {
    gg = 'gg',
    hh = 'hh',
    ii = 'ii',
    jj = 'jj'
} = { gg: 'g1', jj: 'j1' };

console.log(gg); // 'g1'
console.log(hh); // 'hh'
console.log(ii); // 'ii'
console.log(jj); // 'j1'
console.log(' ');

/*Здесь будет ошибка "Uncaught TypeError: (destructured parameter) is undefined" если в описании функции в конце 
параметров не укажем "= {}", так там запуститься код ПОХОЖИЙ на следующий: 
"let { gg = 'gg', hh = 'hh', ii = 'ii', jj = 'jj' } = undefined", что выдаст ошибку, поскольку не указано для 
оператора присваивания что надо присваивать с правой части.*/
func03();