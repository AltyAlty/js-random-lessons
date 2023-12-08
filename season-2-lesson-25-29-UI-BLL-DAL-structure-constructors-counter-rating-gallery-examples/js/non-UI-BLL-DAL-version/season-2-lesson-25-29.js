/*Аргумент - это принятый функцией параметр.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Создаем три разных объекта.*/
let obj1 = { a: 1 };
let obj2 = { a: 1, name: 'joj' };
let obj3 = { name: 'joj' };

/*Создаем функцию, которая проверяет наличие каких-то свойств в объектах.*/
function isPerson(object) {
    return Object.prototype.hasOwnProperty.call(object, 'name')
        && Object.prototype.hasOwnProperty.call(object, 'a');
};

console.log(isPerson(obj1)); // true
console.log(isPerson(obj2)); // false
console.log(isPerson(obj3)); // true