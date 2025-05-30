'use strict';

/*Попробуем создать функциональный объект - объект у которого есть методы, а сам этот объект является функцией, то есть
у него есть собственное замыкание. Этот объект не является функтором или монадой, так как не имеет методов по типу
"map()", "appply()", "chain()" и так далее. Так же в отличии от функтор и манадов, при каждом вызове функционального
объекта не создается новый контейнер для данных, а возвращается ссылка на уже существующий контейнер. Такие способы
создания функторов при помощи функционального объекта работают быстрее, так как не используется "длинное" замыкание, то
есть после каждого вызова экземпляра функционального объекта или его методов просто обновляется текущая функция, а не
хранится постоянно вся история цепочки замыканий. Этому помогает то, что мы здесь используем функцию, в которой меняем
прототип на прототип какого-то конструктора, и в этом прототипе конструктора указываем какой-то метод, поэтому при
создании нескольких экземпляров таких функциональных объектов, когда мы будем вызывать у них этот метод, он будет у всех
общий из упомянутого прототипа конструктора. Также этому помогает то, что здесь во внутренней функции не используются
никакие данный внешней функции, и то, что некоторые поля мы назначаем при помощи метода "Object.assign()", не используя
замыкание.*/

/*Суть следующей программы сделать счетчик и проверять достиг ли он какого-то числа. Счетчик мы увеличиваем сами.*/
function Counter() { };

const counter = initial => {
    const f = value => { // Когда это функцию снизу всего "counter" будет вызвана, "value" здесь будет равно
        // "initial". Это "value" будет храниться в замыкании этой функции.
        f.count += value; // В свойство "count" приплюсовываем "value", то есть не затираем предыдущее значение.        

        /*Метод "Object.keys()" возвращает массив из собственных перечисляемых свойств переданного объекта, в том же
        порядке, в котором они бы обходились циклом "for...in" (разница между циклом и методом в том, что цикл
        перечисляет свойства и из цепочки прототипов). Метод "Object.keys()" возвращает массив строковых элементов,
        соответствующих именам перечисляемых свойств, найденных непосредственно в самом объекте. Порядок свойств такой
        же, как и при ручном перечислении свойств в объекте через цикл.*/
        Object.keys(f.events) // Вернется массив, например ['5'].
            .filter(n => n <= f.count) // Берем только те события, которые меньше счетчика. Вернется снова
            // массив, например ['5'].
            .forEach(n => {
                // console.log(n); // Это строка, например '5'.
                // console.log(f.events); // Это объект, например "{ 5: value => console.log('Counter > 5, value:', value) }"
                // console.log(f.events[n]); // Это свойство объекта, например f.events[5], что равно "value => console.log('Counter > 5, value:', value)"
                f.events[n].forEach(callback => callback(f.count)); /* Здесь в итоге мы вызываем функцию, например:
                "10 => console.log('Counter > 5, value:', 10)"*/

                delete f.events[n]; // Таким образом мы "отписываемся" навсегда от событий.
            });

        return f; // Возвращаем саму эту функцию, чтобы обеспечить чейнинг.
    };

    /*Метод "Object.setPrototypeOf()" устанавливает прототип (то есть, внутреннее свойство "[[Prototype]]") указанного
    объекта в другой объект или null.*/
    Object.setPrototypeOf(f, Counter.prototype); // Присвоили функции прототип конструктора "Counter".

    /*Метод "Object.assign()" используется для копирования значений всех собственных перечисляемых свойств из одного или
    более исходных объектов в целевой объект (указывается первым по счету). После копирования он возвращает целевой
    объект. Если происходит копирование объектов в качестве значений свойств, то они копируются по ссылке.*/
    return Object.assign(f, { count: 0, events: {} })(initial); /* Сначала добавили пару свойств, а потом
    полученную функцию вызвали, передав ей значение "initial".*/
};

/*Создаем метод, который реализовывает паттерн подписки на событие.*/
Counter.prototype.on = function (n, callback) {
    const event = this.events[n]; // Ищем событие.

    if (event) {
        event.push(callback); // Если событие найдено, то сохраняем в нем подписчика.
    }
    else {
        this.events[n] = [callback]; // Если события нет, то создаем его и добавляем подписчика, обвернутого в массив.
    };

    return this(0); /* В конце мы вызываем сам функциональный объект таким образом, так как контекст "this" будет на
    него указывать.*/
};


const c = counter(10);

c.on(5, value => console.log('Counter > 5, value:', value));
c.on(25, value => console.log('Counter > 25, value:', value));
c(5);
setTimeout(() => c(15), 100);