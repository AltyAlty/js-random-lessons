'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

/*Пример шифрования через XOR.*/
const numberToEncode = 3231;
const secretKey = 2216;
const encodedNumber = numberToEncode ^ secretKey;
const decodedNumber = encodedNumber ^ secretKey;
console.log(encodedNumber); // 1087
console.log(decodedNumber); // 3231