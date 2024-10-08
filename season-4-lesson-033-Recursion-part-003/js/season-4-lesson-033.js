'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*В процессе выполнения задачи в теле функции могут быть вызваны другие функции для выполнения подзадач. Частный случай
подвызова это когда функция вызывает сама себя. Это называется рекурсией.*/

/*Напишем функцию, которая возводит число в степень, не используя рекурсию.*/
function powWithoutRecursion(x, n) {
    let result = x; // 2

    for (let i = 1; i < n; i++) {
        result = result * x; // 2 * 2 = 4 -> 4 * 2 = 8 -> 8 * 2 -> 16
    };

    return result;
};

console.log(powWithoutRecursion(2, 4)); // 16

/*Напишем функцию, которая возводит число в степень, используя рекурсию.*/
function powWithRecursion(x, n) {
    if (n === 1) { // Это базовый случай рекурсии или база рекурсии.
        return x;
    } else { // Это рекурсивный случай рекурсии или шаг рекурсии.
        return x * powWithRecursion(x, n - 1);
    };
};

console.log(powWithRecursion(2, 4)); // 16

/*Разберем работу функции с рекурсией:

Базовый случай в рекурсивной функции - это часть функции, в которой описывается условие прекращения работы функции в 
целях предотвращения бесконечного зацикливания. То есть при создании рекурсии всегда должен быть базовый случай 
рекурсии, иначе рекурсия будет бесконечной.

Рекурсивный случай в рекурсивной функции - это часть функции, в которой функция вызывает саму себя в целях выполнения 
какой-либо задачи. Обычно с каждым новым таким вызовом функции задача упрощается. 

1. Вызывается функция "powWithRecursion()" первый раз с параметрами 2 и 4.
2. Внутри этого первого вызова первый блок "if" пропускается и происходит второй вызов функции с параметрами 2 и 3.
3. Во втором вызове функции опять первый блок "if" пропускается и происходит третий вызов функции с параметрами 2 и 2.
4. В третьем вызове функции опять первый блок "if" пропускается и происходит четвертый вызов функции с параметрами 2 и 1.
5. В четвертом вызове функции первый блок "if" уже не пропускается и четвертый вызов функции возращает третьему вызову 
функции значение 2, после чего четвертый вызов функции завершает свою работу.

6. Третий вызов функции получает это значение 2, умножает его на "x", (то есть на 2), получает 4, а далее возвращает 
второму вызову функции значение 4, после чего третий вызов функции завершает свою работу.
7. Второй вызов функции получает это значение 4, умножает его на "x", (то есть на 2), получает 8, а далее возвращает 
первому вызову функции значение 8, после чего второй вызов функции завершает свою работу.
8. Первый вызов функции получает это значение 8, умножает его на "x", (то есть на 2), получает 16, а далее возвращает 
"наружу" значение 16, после чего первый вызов функции завершает свою работу.

Порядок вызовов функции "powWithRecursion()" кратко можно записать так:
1) pow(2, 4) = 2 * pow(2, 3)
2) pow(2, 3) = 2 * pow(2, 2)
3) pow(2, 2) = 2 * pow(2, 1)
4) pow(2, 1) = 2

Как мы видим каждый шаг рекурсии наша задача упрощается: каждый раз степень становится на 1 меньше.

Общее количество вложенных вызовов (включая первый) называют глубиной рекурсии. В нашем случае она будет равна "n".*/

/*Максимальная глубина рекурсии ограничена движком JavaScript. Точно можно рассчитывать на 10000 вложенных вызовов, 
некоторые интерпретаторы допускают и больше, но для большинства из них 100000 вызовов – за пределами возможностей. 
Существуют автоматические оптимизации, помогающие избежать переполнения стека вызовов ("оптимизация хвостовой 
рекурсии"), но они еще не поддерживаются везде и работают только для простых случаев.*/

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Функции с рекурсией сверху можно записать короче, используя тернарное выражение.*/
function powWithRecursion2(x, n) {
    return (n === 1) ? x : (x * powWithRecursion2(x, n - 1));
};

// let powWithRecursion2 = (x, n) -> (n === 1) ? x : (x * powWithRecursion2(x, n - 1));

console.log(powWithRecursion2(2, 4)); // 16

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Информация о процессе выполнения запущенной функции хранится в ее контексте выполнения (execution context). Контекст 
выполнения – специальная внутренняя структура данных, которая содержит информацию о вызове функции. Она включает в 
себя конкретное место в коде, на котором находится интерпретатор, локальные переменные функции, значение this и прочую 
служебную информацию.*/

/*Один вызов функции имеет ровно один контекст выполнения, связанный с ним. Когда функция производит вложенный вызов, 
происходит следующее:
1) Выполнение текущей функции приостанавливается.
2) Контекст выполнения, связанный с ней, запоминается в специальной структуре данных – стеке контекстов выполнения.
3) Выполняются вложенные вызовы, для каждого из которых создается свой отдельный контекст выполнения.
4) После их завершения старый контекст достается из стека, и выполнение внешней функции возобновляется с того места, 
где она была остановлена.*/

/*Глубина рекурсии равна максимальному числу контекстов, одновременно хранимых в стеке.*/

/*Любая рекурсия может быть переделана в цикл. Как правило, вариант с циклом будет эффективнее.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Попробуем при помощи рекурсивного обхода сделать обсчет зарплат. Для подсчета суммы зарплат, есть два возможных 
случая:
1) Либо это простой отдел с массивом – тогда мы сможем суммировать зарплаты в простом цикле.
2) Или это объект с N подотделами – тогда мы можем сделать N рекурсивных вызовов, чтобы получить сумму для каждого из 
подотделов, и объединить результаты.

Случай (1), когда мы получили массив, является базой рекурсии. Случай (2), при получении объекта, является шагом 
рекурсии. Сложная задача разделяется на подзадачи для подотделов. Они могут, в свою очередь, снова разделиться на 
подотделы, но рано или поздно это разделение закончится, и решение сведется к случаю (1).*/
let company = {
    sales: [{ name: 'John', salary: 1000 }, { name: 'Alice', salary: 600 }],

    development: {
        sites: [{ name: 'Peter', salary: 2000 }, { name: 'Alex', salary: 1800 }],

        internals: [{ name: 'Jack', salary: 1300 }]
    }
};

function sumSalaries(department) {
    if (Array.isArray(department)) { // Базовый случай.
        return department.reduce((prev, current) => prev + current.salary, 0);
    } else { // Рекурсивный случай.
        let sum = 0;

        for (let subdep of Object.values(department)) {
            sum += sumSalaries(subdep); // рекурсивно вызывается для подотделов, суммируя результаты
        };

        return sum;
    };
};

console.log(sumSalaries(company)); // 6700

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Рекурсивная (рекурсивно определяемая) структура данных – это структура, которая повторяет саму себя в своих частях.*/

/*У массивов есть недостатки. Операции "удалить элемент" и "вставить элемент" являются дорогостоящими. Например, 
метод "unshift()" должна переиндексировать все элементы, чтобы освободить место для нового элемента, и, если массив 
большой, на это потребуется время. То же самое с методом "shift()". Если нам действительно нужны быстрые 
вставка/удаление, мы можем выбрать другую структуру данных, называемую связанный список, которая является рекурсивной
структурой данных.*/

/*Элемент связанного списка определяется рекурсивно как объект:
1) со значением "value",
2) со свойством "next" – свойство, ссылающееся на следующий элемент связанного списка или null, если это последний 
элемент.*/

/*Пример связанного списка.*/
let listOne = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

console.log(listOne);

/*Альтернативный пример связанного списка.*/
let listTwo = { value: 1 };
listTwo.next = { value: 2 };
listTwo.next.next = { value: 3 };
listTwo.next.next.next = { value: 4 };
listTwo.next.next.next.next = null;

console.log(listTwo);

/*Список можно легко разделить на несколько частей и впоследствии объединить обратно.*/
let listThree = listTwo.next.next;
listTwo.next.next = null;

console.log(listTwo); // 1 -> 2 -> null
console.log(listThree); // 3 -> 4 -> null

listTwo.next.next = listThree;

console.log(listTwo); // 1 -> 2 -> 3 -> 4 -> null
console.log(listThree); // 3 -> 4 -> null

/*Для добавления нового элемента нам нужно обновить первый элемент списка.*/

listTwo = { value: 'new item', next: listTwo };
console.log(listTwo); // 'new item' -> 1 -> 2 -> 3 -> 4 -> null

/*Чтобы удалить элемент из середины списка, нужно изменить значение next предыдущего элемента.*/

listTwo.next = listTwo.next.next;
console.log(listTwo); // 'new item' -> 2 -> 3 -> 4 -> null

/*В отличие от массивов, нет перенумерации, элементы легко переставляются. Главным недостатком связанного списка 
является то, что мы не можем легко получить доступ к элементу по его индексу.*/

/*Нам может быть нужна очередь или даже двухсторонняя очередь – это упорядоченная структура, которая позволяет очень 
быстро добавлять/удалять элементы с обоих концов, но там не нужен доступ в середину.*/

/*Списки могут быть улучшены:
1) Можно добавить свойство "prev" в дополнение к "next" для ссылки на предыдущий элемент, чтобы легко двигаться по 
списку назад.
2) Можно также добавить переменную "tail", которая будет ссылаться на последний элемент списка (и обновлять ее при 
добавлении/удалении элементов с конца).*/