'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Примесь – это класс, методы которого предназначены для использования в других классах, причем без наследования от 
самой примеси.*/

/*Простейший способ реализовать примесь в JavaScript – это создать объект с полезными методами, которые затем могут 
быть легко добавлены в прототип любого класса.*/
let obj01 = {
    method01() { console.log(1) }
};

let obj02 = {
    __proto__: obj01,
    method02() { super.method01() }
};

class Class01 { };
Object.assign(Class01.prototype, obj02);

let obj03 = new Class01();
obj03.method02(); // 1

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Реализуем паттерн "Слушатель (Listener)" при помощи примесей.*/
let eventListening = {
    startListening(eventName, listener) {
        if (!this._eventListeners) this._eventListeners = {};
        if (!this._eventListeners[eventName]) { this._eventListeners[eventName] = [] };
        this._eventListeners[eventName].push(listener);
    },

    stopListening(eventName, listener) {
        let listeners = this._eventListeners?.[eventName];
        if (!listeners) return;

        for (let i = 0; i < listeners.length; i++) {
            if (listeners[i] === listener) { listeners.splice(i--, 1) };
        };
    },

    notify(eventName, ...args) {
        if (!this._eventListeners?.[eventName]) { return };
        this._eventListeners[eventName].forEach(listener => listener.apply(this, args));
    }
};

class Class02 {
    triggerEvent(eventName, value) {
        this.notify(eventName, value);
    };
};

Object.assign(Class02.prototype, eventListening);
let obj04 = new Class02();

obj04.startListening('event01', value => console.log(value));

console.log(obj04);
// {
//     _eventListeners: {
//         'event01': [value => console.log(value)]
//     }
// }

obj04.triggerEvent('event01', 'abc'); // abc