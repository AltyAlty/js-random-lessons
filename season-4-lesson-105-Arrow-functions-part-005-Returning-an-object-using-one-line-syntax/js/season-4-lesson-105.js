'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

// const func01 = () => { a: 1 }; // Uncaught SyntaxError: missing ) after argument list
const func01 = () => ({ a: 1 });
console.log(func01());