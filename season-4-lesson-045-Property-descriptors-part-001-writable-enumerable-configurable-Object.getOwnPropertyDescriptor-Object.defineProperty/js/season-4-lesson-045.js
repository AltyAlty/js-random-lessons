'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Помимо значения "value", свойства объекта имеют три специальных атрибута (флаги):
1) "writable" – если true, свойство можно изменить, иначе оно только для чтения.
2) "enumerable" – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
3) "configurable" – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.

Когда мы создаем свойство, по стандарту все они имеют значение true.*/

/*Есть метод "Object.getOwnPropertyDescriptor()", который позволяет получить полную информацию о свойстве. Первым 
параметром принимается объект, а вторым свойство.*/
let obj01 = { a: 1 };
let descriptor01Obj01 = Object.getOwnPropertyDescriptor(obj01, 'a');
console.log(descriptor01Obj01); // Object { value: 1, writable: true, enumerable: true, configurable: true }

/*Чтобы изменить флаги, мы можем использовать метод "Object.defineProperty()". Первым параметром принимается объект, 
вторым свойство, третьим дескриптор. Если свойство существует, то этот метод обновит его флаги. В противном случае метод 
создаст новое свойство с указанным значением и флагами. И если какой-либо флаг не указан явно, ему присваивается 
значение false.*/
Object.defineProperty(obj01, 'b', {
    value: 2,
    enumerable: true
});

let descriptor02Obj01 = Object.getOwnPropertyDescriptor(obj01, 'b');
console.log(descriptor02Obj01); // Object { value: 2, writable: false, enumerable: true, configurable: false }

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Сделаем какое-нибудь свойство нечитабельным.*/
let obj02 = { a: 1, b: '123' };

Object.defineProperty(obj02, 'a', {
    writable: false
});

Object.defineProperty(obj02, 'b', {
    writable: false
});

// obj02.a = 3; // Uncaught TypeError: "a" is read-only
// obj02.a++ // Uncaught TypeError: "a" is read-only
// obj02.b = '456'; // Uncaught TypeError: "b" is read-only
console.log(obj02); // Object { a: 1, b: "123" }

/*Без "use strict", мы не увидим никаких ошибок при записи в свойства "только для чтения" и т.п. Но эти операции все 
равно не будут выполнены успешно. Действия, нарушающие ограничения флагов, в нестрогом режиме просто молча 
игнорируются.*/

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Встроенный метод "toString()" в объектах – неперечислимый, его не видно в цикле "for..in". Но если мы напишем свой 
собственный метод "toString()", то цикл "for..in" будет выводить его по умолчанию. Если мы этого не хотим, то можно 
установить для этого свойства флаг "enumerable" как false. Тогда оно перестанет появляться в цикле "for..in" 
аналогично встроенному методу "toString()".*/
let obj03 = {
    a: 1,
    toString: function () {
        return 'OK';
    }
};

for (const key in obj03) {
    console.log(key); // 'a' -> 'toString'
};

Object.defineProperty(obj03, 'toString', {
    enumerable: false
});

for (const key in obj03) {
    console.log(key); // 'a'
};

/*Неперечислимые свойства также не возвращаются в методе "Object.keys()".*/
console.log(Object.keys(obj03)); // Array [ "a" ]

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Неконфигурируемое свойство не может быть удалено, его атрибуты не могут быть изменены.*/

/*Существуют некоторые свойства, которые изначально неконфигурируемые. Например, свойство "Math.PI" – только для 
чтения, неперечислимое и неконфигурируемое. Определение свойства как неконфигурируемого – это дорога в один конец. Мы 
не можем изменить его обратно с помощью метода "defineProperty()".*/
let descriptorPI = Object.getOwnPropertyDescriptor(Math, 'PI');
console.log(descriptorPI); // Object { value: 3.141592653589793, writable: false, enumerable: false, configurable: false }

// Object.defineProperty(Math, 'PI', {
//     configurable: true
// }); // Uncaught TypeError: can't redefine non-configurable property "PI"

// Object.defineProperty(Math, 'PI', {
//     writable: true,
//     enumerable: true
// }); // Uncaught TypeError: can't redefine non-configurable property "PI"

// Math.PI = 3; // Uncaught TypeError: "PI" is read-only

// delete Math.PI; // Uncaught TypeError: property "PI" is non-configurable and can't be deleted

console.log(Math.PI); // 3.141592653589793

/*Ошибки отображаются только в строгом режиме. В нестрогом режиме мы не увидим никаких ошибок при записи в свойства 
"только для чтения" и т.п. Эти операции все равно не будут выполнены успешно. Действия, нарушающие ограничения флагов, в 
нестрогом режиме просто молча игнорируются.*/

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Существует метод "Object.defineProperties()", который позволяет определять множество свойств сразу.*/
let obj04 = { a: 1, b: 2 };

Object.defineProperties(obj04, {
    'a': { value: 3, enumerable: false },
    'b': { writable: false }
});

console.log(obj04.a); // 3
// obj04.b++; // Uncaught TypeError: "b" is read-only

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Чтобы получить все дескрипторы свойств сразу, можно воспользоваться методом "Object.getOwnPropertyDescriptors()".
Вместе с методом "Object.defineProperties" этот метод можно использовать для клонирования объекта вместе с его 
флагами.*/
let obj05 = { a: 1, b: 2 };

Object.defineProperties(obj05, {
    'a': { value: 3, enumerable: false },
    'b': { writable: false }
});

let obj06 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj05));

console.log(obj06.a); // 3
// obj06.b++; // Uncaught TypeError: "b" is read-only

/*Обычно при клонировании объекта мы используем присваивание, чтобы скопировать его свойства, но это не копирует 
флаги.*/
let obj07 = {};
for (let key in obj05) { obj07[key] = obj05[key] };
obj07.b++; // 3

/*Цикл "for..in" игнорирует символьные и неперечислимые свойства, а метод "Object.getOwnPropertyDescriptors()"
возвращает дескрипторы всех свойств.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Дескрипторы свойств работают на уровне конкретных свойств. Но еще есть методы, которые ограничивают доступ ко 
всему объекту: 

1) "Object.preventExtensions(obj)": Запрещает добавлять новые свойства в объект.
2) "Object.seal(obj)": Запрещает добавлять/удалять свойства. Устанавливает configurable: false для всех существующих 
свойств.
3) "Object.freeze(obj)": Запрещает добавлять/удалять/изменять свойства. Устанавливает configurable: false, writable: false 
для всех существующих свойств.
4) "Object.isExtensible(obj)": Возвращает false, если добавление свойств запрещено, иначе true.
5) "Object.isSealed(obj)": Возвращает true, если добавление/удаление свойств запрещено и для всех существующих свойств 
установлено configurable: false.
6) "Object.isFrozen(obj)": Возвращает true, если добавление/удаление/изменение свойств запрещено, и для всех текущих 
свойств установлено configurable: false, writable: false.*/