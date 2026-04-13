'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

let obj001 = { a: 1 };
const WeakRefObj001 = new WeakRef(obj001);
console.log(WeakRefObj001.deref()?.a); // 1
obj001 = null;
console.log(WeakRefObj001.deref()?.a); // 1
test.onclick = () => console.log(WeakRefObj001.deref()?.a); // 1 => undefined