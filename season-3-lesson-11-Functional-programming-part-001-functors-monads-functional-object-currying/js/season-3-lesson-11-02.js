'use strict';

/*Сделаем еще один функциональный объект. Слудующая программа получает значение, которое показывает, сколько свойств
может быть в объекте, а затем этот объект заполняется свойствами. При достижении максимального количества свойств в этом
объекте срабатывает callback.*/
function Collector() { };

const collect = expected => {
    const collector = (key, value) => {
        if (collector.finished) {
            return collector;
        };

        collector.count++;
        console.log(collector.count);

        if (collector.count > collector.expected) {
            collector.count--;
            console.log(collector.count);

            return collector;
        } else {
            if (collector.expected >= collector.count) {
                collector.data[key] = value;
            };

            if (value instanceof Error) {
                collector.callback(value, collector.data);

                return collector;
            };

            if (collector.expected === collector.count) {
                collector.callback(null, collector.data);
            };

            return collector;
        };
    };

    const fields = {
        count: 0,
        expected,
        data: {},
        callback: null,
        finished: false
    };

    Object.setPrototypeOf(collector, Collector.prototype);

    return Object.assign(collector, fields);
};

Collector.prototype.done = function (callback) {
    this.callback = callback;

    return this;
};


const dataCollectorFour = collect(4).done((err, data) => {
    console.log('Callback has been called');

    /*Метод "console.dir()" отображает список свойств указанного объекта. Вывод представлен в виде иерархического списка
    с возможностью просмотра содержимого дочерних объектов. Не стандартизировано!*/
    console.dir({ err, data });
});

dataCollectorFour('key1', 'value1'); // 1

setTimeout(() => {
    dataCollectorFour('key2', 'value2');
}, 200); // 5

setTimeout(() => {
    dataCollectorFour('key3', 'value3');
}, 100); // 4

dataCollectorFour('key4', 'value4'); // 2

dataCollectorFour('key5', 'value5'); // 3