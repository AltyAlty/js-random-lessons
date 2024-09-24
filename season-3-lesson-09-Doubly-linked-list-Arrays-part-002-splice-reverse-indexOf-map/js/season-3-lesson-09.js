/*Класс описывающий узел двусвязного списка.*/
class Node {
    constructor(data = null, prev = null, next = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    };
};

/*Класс описывающий двусвязный список.*/
class KindaLinkedList {
    constructor() {
        this.length = 0; // Длина списка.
        this.head = null; // Головной узел списка.
        this.tail = null; // Хвостовой узел списка.
        this.nodes = []; // Массив для хранения узлов списка.
    };

    /*Метод, который позволяет добавлять узлы в конец списка.*/
    appendNode(data) {
        const tempNode = new Node(data, null, null); // Создаем новый узел.
        this.nodes.push(tempNode); // Добавляем созданный узел в массив для таких узлов.

        if (this.length === 0) {
            this.head = tempNode;
        }; // Если список был пуст, то задаем головной узел.

        this.tail = tempNode; // Задаем хвостовой узел.
        this.length++; // Увеличиваем длину списка на 1.

        return this; // Возвращаем сам список, чтобы была возможность применять методы по цепочке.
    };

    /*Метод, который возвращает данные, которые находятся в головном узле списка.*/
    showHead() {
        return this.head.data;
    };

    /*Метод, который возвращает данные, которые находятся в хвостовом узле списка.*/
    showTail() {
        return this.tail.data;
    };

    /*Метод, который позволяет находить данные, которые находятся в каком-то узле указанного индекса.*/
    showDataAt(index) {
        return this.nodes[index].data;
    };

    /*Метод, который позволяет добавлять узлы под указанным индексом, смещяя остальные узлы.*/
    insertNodeAt(index, data) {
        const tempNode = new Node(data, null, null); // Создаем новый узел.
        /*Метод "splice()" применяется к массивам и имеет три параметра:
        1. Под каким индексом произвести операцию.
        2. Сколько элементов нужно удалять после этого индекса, включая элемент под самим этим индексом.
        3. Какой элемент нужно вставить под этим индексом. Если удаления элементов не было, то они сместятся вправо.*/
        this.nodes.splice(index, 0, tempNode);
        this.length++; // Увеличиваем длину списка на 1.

        /*Если был указан индекс головного узла, то обновляем этот узел. Аналогично делаем с хвостовым узлом.*/
        if (index === 0) {
            this.head = tempNode;
        } else if (index === this.nodes.length - 1) {
            this.tail = tempNode;
        };

        return this; // Возвращаем сам список, чтобы была возможность применять методы по цепочке.
    };

    /*Метод, который позволяет проверить пустой ли список.*/
    isEmpty() {
        return this.length === 0;
    };

    /*Метод, который позволяет очистить весь список.*/
    clearList() {
        this.length = 0;
        this.head.data = null;
        this.tail.data = null;
        this.nodes = [];

        return this; // Возвращаем сам список, чтобы была возможность применять методы по цепочке.
    };

    deleteNodeAt(index) {
        this.nodes.splice(index, 1); // Удаляем узел под указанным индексом.

        if (this.length > 0) { // Уменьшаем длину списка.
            this.length--;
        };

        /*Если был указан индекс головного узла, то обновляем этот узел. Аналогично делаем с хвостовым узлом.*/
        if (index === 0) {

            if (this.nodes[0]) {
                this.head = this.nodes[0];
            } else {
                const tempNode = new Node(null, null, null);
                this.head = tempNode;
                this.tail = tempNode;
            }

        } else if (index === this.nodes.length) {
            this.tail = this.nodes[this.nodes.length - 1];
        };

        return this; // Возвращаем сам список, чтобы была возможность применять методы по цепочке.
    };

    /*Метод, который позволяет перевернуть узлы списка.*/
    reverseList() {
        let tempHead = this.head;
        this.head = this.tail;
        this.tail = tempHead;
        this.nodes.reverse(); // Метод "reverse()" переворачивает элементы массива.

        return this; // Возвращаем сам список, чтобы была возможность применять методы по цепочке.
    };

    /*Метод, который позволяет узнать индекс узла, в котором находятся какие-то указанные данные.*/
    indexOfData(data) {
        // for (let i = 0; i < this.nodes.length; i++) {
        //     if (this.nodes[i].data === data) {
        //         return i;
        //     };
        // };

        // return -1;

        return this.nodes.map(function (e) { return e.data; }).indexOf(data);
    };
};

/*-------------------------------------------------------------------------------------------------------------------*/

const list = new KindaLinkedList();
console.log(list); // { head: null, tail: null, nodes: [] }
console.log('1------------------------------------------------------');

list.appendNode(111);
console.log(list.head); // { data: 111, prev: null, next: null }
console.log(list.tail); // { data: 111, prev: null, next: null }
console.log('2------------------------------------------------------');

list.appendNode(222);
console.log(list.showHead()); // 111
console.log(list.showTail()); // 222
console.log('3------------------------------------------------------');

list.appendNode(333);
console.log(list.showDataAt(0)); // 111
console.log(list.showDataAt(1)); // 222
console.log(list.showDataAt(2)); // 333
console.log('4------------------------------------------------------');

function showDataFromMyList(l) {
    for (let i = 0; i < l.nodes.length; i++) {
        console.log(l.nodes[i].data);
    };
};

showDataFromMyList(list); // 111 -> 222 -> 333
console.log(list.head); // { data: 111, prev: null, next: null }
console.log(list.tail); // { data: 333, prev: null, next: null }

list.insertNodeAt(1, 444);
showDataFromMyList(list); // 111 -> 444 -> 222 -> 333
console.log(list.head); // { data: 111, prev: null, next: null }
console.log(list.tail); // { data: 333, prev: null, next: null }

list.insertNodeAt(0, 'AAA');
showDataFromMyList(list); // "AAA" -> 111 -> 444 -> 222 -> 333
console.log(list.head); // { data: "AAA", prev: null, next: null }
console.log(list.tail); // { data: 333, prev: null, next: null }

list.insertNodeAt(5, 555);
showDataFromMyList(list); // "AAA" -> 111 -> 444 -> 222 -> 333 -> 555
console.log(list.head); // { data: "AAA", prev: null, next: null }
console.log(list.tail); // { data: 555, prev: null, next: null }
console.log('5------------------------------------------------------');

list.clearList();
console.log(list); // Object { length: 0, head: {…}, tail: {…}, nodes: [] }
console.log(list.head); // { data: null, prev: null, next: null }
console.log(list.tail); // { data: null, prev: null, next: null }
console.log('6------------------------------------------------------');

list.appendNode(111);
list.appendNode(222);
list.appendNode(333);
list.appendNode(444);
showDataFromMyList(list); // 111 -> 222 -> 333 -> 444
console.log(list.head); // { data: 111, prev: null, next: null }
console.log(list.tail); // { data: 444, prev: null, next: null }

list.deleteNodeAt(1);
showDataFromMyList(list); // 111 -> 333 -> 444
console.log(list.head); // { data: 111, prev: null, next: null }
console.log(list.tail); // { data: 444, prev: null, next: null }

list.deleteNodeAt(0);
showDataFromMyList(list); // 333 -> 444
console.log(list.head); // { data: 333, prev: null, next: null }
console.log(list.tail); // { data: 444, prev: null, next: null }

list.deleteNodeAt(1);
showDataFromMyList(list); // 333
console.log(list.head); // { data: 333, prev: null, next: null }
console.log(list.tail); // { data: 333, prev: null, next: null }
console.log('7------------------------------------------------------');

list.clearList();
list.appendNode(111);
list.appendNode(222);
list.appendNode(333);
list.reverseList();
showDataFromMyList(list); // 333 -> 222 -> 111
console.log('8------------------------------------------------------');

console.log(list.indexOfData(111)); // 2
console.log(list.indexOfData(222)); // 1
console.log(list.indexOfData(333)); // 0
console.log(list.indexOfData(444)); // -1
console.log('9------------------------------------------------------');

list.clearList().appendNode(333).appendNode(111).reverseList().appendNode(222).deleteNodeAt(1).appendNode(444).insertNodeAt(2, 333);
showDataFromMyList(list); // 111 -> 222 -> 333 -> 444
console.log('10-----------------------------------------------------');

list.clearList();
list.appendNode(444).reverseList().deleteNodeAt(0).clearList().insertNodeAt(0, 333);
showDataFromMyList(list); // 333
console.log('11-----------------------------------------------------');

list.clearList().appendNode(444);
showDataFromMyList(list); // 444
console.log(list.head); // { data: 444, prev: null, next: null }
console.log(list.tail); // { data: 444, prev: null, next: null }

list.deleteNodeAt(0);
showDataFromMyList(list); // nothing
console.log(list.head); // { data: null, prev: null, next: null }
console.log(list.tail); // { data: null, prev: null, next: null }
console.log('12-----------------------------------------------------');