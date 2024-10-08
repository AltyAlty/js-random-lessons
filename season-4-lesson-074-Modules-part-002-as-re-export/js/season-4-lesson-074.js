'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Можно импортировать сразу все эскпорты из какого-то модуля в виде одного объекта.*/
import * as module01 from './module01.js'
console.log(module01); // Object { a: 1, b: 2, Symbol(Symbol.toStringTag): "Module" }

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Можно использовать "as", чтобы импортировать под другими именами.*/
import { c as cFromModule02 } from './module02.js';
console.log(cFromModule02); // 3

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

import { dFromModule02 } from './module02.js';
console.log(dFromModule02); // 4

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

import eFromModule03 from './module03.js';
console.log(eFromModule03); // 5

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

import func01FromModule04 from './module04.js';
func01FromModule04(); // 6

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Можно в одном месте сделать импорт по умолчанию и именновый импорт.*/
import { default as fFromModule05, g } from './module05.js';
console.log(fFromModule05); // 7
console.log(g); // 8

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*При импорте всего модуля, импорт по умолчанию сохранится под свойство "default".*/
import * as module06 from './module06.js';
console.log(module06); // Object { default: 9, i: 10, Symbol(Symbol.toStringTag): "Module" }

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

import { jFromModule07FromModule08, kFromModule07FromModule08 } from './module08.js';
console.log(jFromModule07FromModule08); // 11
console.log(kFromModule07FromModule08); // 12

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

import { l, m } from './module10.js';
console.log(l); // 13
console.log(m); // 14

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

import * as module12 from './module12.js';
console.log(module12); // Object { o: 16, Symbol(Symbol.toStringTag): "Module" }

// import oFromModule11FromModule12 from './module12.js';
// console.log(oFromModule11FromModule12); // 15

/*-------------------------------------------------------------------------------------------------------------------*/

/*Мы можем ставить "import"/"export" в начало или в конец скрипта, это не имеет значения.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Инструкции "import"/"export" не работают внутри не верхнего уровня видимости.*/

if (true) {
    // import {default as n} from './module11.js'; // Uncaught SyntaxError: import declarations may only appear at top level of a module
};