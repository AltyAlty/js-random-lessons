'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Создадим функцию-декоратор, которая будет кэшировать результаты.*/
function func01(x) {
    return ++x;
};

function cachingDecorator01(func) {
    let cache = new Map();

    return function (x) {
        if (cache.has(x)) { // если кеш содержит такой x,
            return cache.get(x); // то читаем из него результат
        };

        let result = func(x); // иначе, вызываем функцию
        cache.set(x, result); // и кешируем результат
        return result;
    };
};

func01 = cachingDecorator01(func01);

console.log(func01(1)); // 2, расчитывываем результат с параметром 1 и кешируем этот результат
console.log(func01(1)); // 2, возвращаем из кеша ранее расчитанный результат
console.log(func01(2)); // 3, расчитывываем результат с параметром 2 и кешируем этот результат
console.log(func01(2)); // 3, возвращаем из кеша ранее расчитанный результат

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Существует специальный встроенный метод функции "call()", который позволяет вызывать функцию, явно устанавливая 
this. Первым параметром устанавливается контекст вызова this, а остальные параметры будут параметрами для вызываемой
функции.*/
let obj01 = {
    method01() { return 2 },
    method02(x) { return x * this.method01() }
};

function cachingDecorator02(func) {
    let cache = new Map();

    return function (x) {
        if (cache.has(x)) { // если кеш содержит такой x,
            return cache.get(x); // то читаем из него результат
        };

        let result = func.call(this, x); // иначе, вызываем функцию
        cache.set(x, result); // и кешируем результат
        return result;
    };
};

obj01.method02 = cachingDecorator02(obj01.method02); // теперь сделаем ее кеширующей

console.log(obj01.method02(3)); // 6, расчитывываем результат с параметром 3 и кешируем этот результат
console.log(obj01.method02(3)); // 6, возвращаем из кеша ранее расчитанный результат

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Напишем еще одну функцию декоратор, только в этот раз можно использовать больше одного параметра.*/
let obj02 = {
    method01(min, max) { return min + max }
};

function cachingDecorator03(func, hash) {
    let cache = new Map();

    return function () {
        let key = hash(arguments); // создаем ключ для кэша

        if (cache.has(key)) { // если кеш содержит такой ключ,
            return cache.get(key); // то читаем из него результат
        };

        /*Существует специальный встроенный метод функции "apply()", который позволяет вызывать функцию, явно 
        устанавливая this. Первым параметром устанавливается контекст вызова this, а вторым параметром будет 
        псевдомассив, содержащий параметры для вызываемой функции.
        
        Следующие две строки работают почти одинаково:
        1) Оператор расширения "..." позволяет передавать перебираемый объект "args" в виде списка в метод "call()".
        2) А метода "apply()" принимает только псевдомассив "args".

        Если у нас объект, который и то, и другое, например, реальный массив, то технически мы могли бы использовать 
        любой метод, но метод "apply", вероятно, будет быстрее, потому что большинство движков JavaScript внутренне 
        оптимизируют его лучше.
        
        Передача всех аргументов вместе с контекстом другой функции называется "перенаправлением вызова" (call 
        forwarding).*/
        let result = func.apply(this, arguments); // иначе, вызываем функцию
        // let result = func.call(this, ...arguments); // иначе, вызываем функцию
        cache.set(key, result); // и кешируем результат
        return result;
    };
};

/*Поскольку в этот раз параметров больше одного, то используем хеширующую функцию для создания ключей для
кеша.*/
function hashFunc01(args) { return args[0] + ',' + args[1] }; // '3,5'

obj02.method01 = cachingDecorator03(obj02.method01, hashFunc01);

console.log(obj02.method01(3, 5)); // 8, расчитывываем результат с параметрами 3 и 5, а затем кешируем этот результат
console.log(obj02.method01(3, 5)); // 8, возвращаем из кеша ранее расчитанный результат

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Напишем хеширующую функцию, которая работает с любым количеством параметров, используя "заимствование метода". Мы 
заимствуем метод "join()" из обычного массива "[]". И используем метод "[].join.call()", чтобы выполнить его в 
контексте "arguments".*/
function hashFunc02() {
    console.log(
        [].join.call(arguments)
    );
};

/*Внутренний алгоритм встроенного метода "arr.join(glue)" очень прост:
1) Пускай первым аргументом будет "glue" или, в случае отсутствия аргументов, им будет запятая ","
2) Пускай "result" будет пустой строкой "".
3) Добавить this[0] к "result".
4) Добавить "glue" и this[1].
5) Добавить "glue" и this[2].
6) …выполнять до тех пор, пока "this.length" элементов не будет склеено.
7) Вернуть "result".

Таким образом, технически этот метод принимает this и объединяет this[0], this[1]… и так далее вместе. Он намеренно 
написан так, что допускает любой псевдомассив this (не случайно, многие методы следуют этой практике). Вот почему он 
также работает с this равному arguments.*/