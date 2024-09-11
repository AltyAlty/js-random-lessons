'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

console.log(' ');
console.log('--- we are in module02.js ---');

/*Код из импортированного модуля не отработает, так как уже отработал при импорте в файле "season-4-lesson-073.js".*/
import { func01FromModule01 } from './module01.js';
func01FromModule01(); // "module01 a"

import { obj01FromModule01 } from './module01.js';
console.log(obj01FromModule01.a); // 2

/*-------------------------------------------------------------------------------------------------------------------*/

/*В модуле "this" не определен.*/
console.log(this); // undefined