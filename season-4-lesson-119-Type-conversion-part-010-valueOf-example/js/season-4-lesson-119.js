'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

var a = {
    _value: 0,
    valueOf() {
        this._value++;
        return this._value;
    }
};

console.log(a == 1);
console.log(a == 2);
console.log(a == 3);