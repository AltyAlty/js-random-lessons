'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Для создания своих объектов ошибок удобно наследовать встроенную функцию-конструктор "Error".*/
class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    };
};

class JSONValidationError extends MyError {
    constructor(cause) {
        super();
        this.message = 'Your JSON is invalid';
        this.cause = cause;
    };
};

class JSONMissedPropertiesError extends MyError {
    constructor(missedProperties) {
        super();
        this.message = 'Your JSON have missed properties: ' + missedProperties;
        this.missedProperties = missedProperties;
    };
};

function func01() {
    // let obj01 = JSON.parse('{ "b": 2 }');
    // let obj01 = JSON.parse('{ "a": 1 }');
    let obj01 = JSON.parse('{ }');

    if (!obj01.a && !obj01.b) { throw new JSONValidationError(new JSONMissedPropertiesError('a and b')) };
    if (!obj01.a && obj01.b) { throw new JSONValidationError(new JSONMissedPropertiesError('a')) };
    if (obj01.a && !obj01.b) { throw new JSONValidationError(new JSONMissedPropertiesError('b')) };
};

try {
    func01();
} catch (error) {
    if (error instanceof JSONValidationError) {
        console.log(error.message);
        console.log(error.cause.message);
        console.log(error.stack);
    } else {
        throw error;
    };
};