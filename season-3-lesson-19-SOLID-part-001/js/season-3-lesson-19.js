/*
Принципы SOLID из ООП:

S - Single responsibility principle / Принцип единственной ответственности
O - Open closed principle / Принцип открытости-закрытости
L - Liskov substitution principle / Принцип подстановки Барбары Лисков
I - Interface segregation principle / Принцип разделения интерфейса
D - Dependency Inversion principle / Принцип инверсии зависимостей
*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Принцип единственной ответственности.*/

/*У нас есть класс, который обозначает todo-лист.*/
class TodoList {
    constructor() {
        this.items = [];
    };

    addItem(text) {
        this.items.push(text);
    };

    removeItem(index) {
        this.items = items.splice(index, 1);
    };

    toString() {
        return this.items.toString();
    };

    save(filename) {
        fs.writeFileSync(filename, this.toString());
    };

    load(filename) {
        // Какая-то реализация
    };
};

/*Этот класс не соответствует принципу единственной ответственности, так как у него больше, чем одна ответственность:
помимо работы по формированию списка задач, этот класс также имеет ответственность по работе с файловой системой.
Поэтому в данном случае лучше создать два класса вместо одного.*/

class OnlyTodoList {
    constructor() {
        this.items = [];
    };

    addItem(text) {
        this.items.push(text);
    };

    removeItem(index) {
        this.items = items.splice(index, 1);
    };

    toString() {
        return this.items.toString();
    };
};

class DatabaseManager {
    saveToFile(data, filename) {
        fs.writeFileSync(filename, data.toString());
    };

    loadFromFile(filename) {
        // Какая-то реализация
    };
};

/*-------------------------------------------------------------------------------------------------------------------*/

/*Принцип открытости-закрытости.*/

/*У нас есть класс "Coder" для создания кодеров и класс "CoderFilter" для фильтрация кодеров по разным параметрам. Класс
"CoderFilter" нарушает принцип открытости-закрытости. Этот принцип гласит, что программные сущности (классы, модули,
функции) должны быть открыты для расширения, но не для модификации. Но класс "CoderFilter" не будет открыт для
модификации, если нам нужно будет добавить больше фильтров.*/

class Coder {
    constructor(fullName, language, hobby, education, workplace, position) {
        this.fullName = fullName
        this.language = language
        this.hobby = hobby
        this.education = education
        this.workplace = workplace
        this.position = position
    };
}
;
class CoderFilter {
    filterByName(coders, fullName) {
        return coders.filter(coder => coder.fullName === fullName);
    };

    filterBySize(coders, language) {
        return coders.filter(coder => coder.language === language);
    };

    filterByHobby(coders, hobby) {
        return coders.filter(coder => coder.hobby === hobby);
    };
};

/*Чтобы решить указанную проблему нужно создать более универсальный способ для фильтрации кодеров.*/

const filterByProp = (array, propName, value) =>
    array.filter(element => element[propName] === value);

/*-------------------------------------------------------------------------------------------------------------------*/

/*Принцип подстановки Барбары Лисков.*/

/*Этот принцип гласит, что если у вас есть функция, которая работает для базового типа, она должна работать и для
производного типа. Другими словами необходимо, чтобы подклассы могли бы служить заменой для своих суперклассов. У нас
есть класс "Rectangle" для создания прямоугольников. Этот класс имеет геттеры и сеттеры для ширины и длины
прямоугольника, а также метод для получения площади. На основе этого класса мы создали дочерний класс "Square" для
создания квадратов. Проблема этого класса в том, что родительский метод для поиска площади не будет работать для этого
класса правильно. В нашем примере мы создали квадрат на основе класса "Square" со стороной 2, а затем изменили ему
ширину на 3. Ожидается, что теперь у нас будет квадрат со стороной 3, но на самом деле у нас прямоугольник 3 на 2. В
итоге при подсчете площади мы получим 6, а не 9.*/

class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    };

    /*Геттер вызывается, когда мы хотим получить какое-то свойство.*/
    get width() {
        console.log('get width()');
        return this._width;
    };

    get height() {
        console.log('get height()');
        return this._height;
    };

    /*Сеттер вызывается, когда мы хотим изменить какое-то свойство.*/
    set width(value) {
        console.log('set width()');
        this._width = value;
    };

    set height(value) {
        console.log('set height()');
        this._height = value;
    };

    getArea() {
        return this._width * this._height;
    };
};

class Square extends Rectangle {
    constructor(size) {
        super(size, size);
    };
};

const square = new Square(2);
square.width = 3;
console.log(square.getArea());

/*Для решения этой проблемы мы переопределили сеттеры родительского класса в дочернем классе. Теперь при изменении
ширины или высоты квадрата также соотвественно изменятся высота или ширина квадрата. Тем самым родительский метод по
поиску площади будет адекватно работать и для дочернего класса по созданию квадратов.*/

class RightSquare extends Rectangle {
    constructor(size) {
        super(size, size);
    };

    set width(value) {
        this._width = this._height = value;
    };

    set height(value) {
        this._width = this._height = value;
    };
};

const rightSquare = new RightSquare(2);
rightSquare.width = 3;
console.log(rightSquare.getArea());

/*-------------------------------------------------------------------------------------------------------------------*/

/*Принцип разделения интерфейса.*/

/*У нас есть абстрактный класс "Phone", который нужен как интерфейс для создания дочерних более конкретезированных
классов, обозначающих уже конкретные модели телефонов. Наш родительский класс нарушает принцип разделения интерфейса,
так как клиенты зависят от интерфейсов, которые они не используют. Дело в том, что дочерний класс "Nokia3310",
обозначающий телефон "Nokia3310", не может полностью использовать интерфейс родительского класса "Phone", так как
"Nokia3310" не имеет камеры и wi-fi, соотвественно не может реализовать методы "takePhoto()" и "connectToWifi()". Чтобы
решить эту проблему можно, например, убрать из родительского класса эти методы, или создать два родительских класса
обозначающих категории телефонов имеющих камеры и wi-fi и не имеющих этого.*/

class Phone {
    constructor() {
        if (this.constructor.name === 'Phone')
            throw new Error('Phone class is absctract');
    };

    call(number) { };

    takePhoto() { };

    connectToWifi() { };
};

class IPhone extends Phone {
    call(number) {
        // Какая-то реализация
    };

    takePhoto() {
        // Какая-то реализация
    };

    connectToWifi() {
        // Какая-то реализация
    };
};

class Nokia3310 extends Phone {
    call(number) {
        // Какая-то реализация
    };

    takePhoto() {
        // Нельзя реализовать из-за отсутствия камеры
    };

    connectToWifi() {
        // Нельзя реализовать из-за отсутствия wi-fi
    };
};

// let a = new Phone(); // Это выдаст ошибку

/*-------------------------------------------------------------------------------------------------------------------*/

/*Принцип инверсии зависимостей.*/

/*Этот принцип гласит, что модули верхних уровней не должны зависеть от модулей нижних уровней. Оба типа модулей должны
зависеть от абстракций. Абстракции не должны зависеть от деталей. Детали должны зависеть от абстракций. У нас есть три
класса "FileSystem", "ExternalDB" и "LocalPersistance", обозначающие модули нижнего уровня. Также у нас есть класс
"PersistanceManager", обозначающий модуль верхнего уровня. Здесь проблема в том, что этот класс зависит от реализации
классов нижнего уровня. Если мы изменим какой-либо из классов нижнего уровня, то придется изменить и класс верхнего
уровня. Или если мы решим добавить еще один класс на нижний уровень, то нам опять придется менять класс на верхнем
уровне.*/

class FileSystem {
    writeToFile(data) {
        // Какая-то реализация
    };
};

class ExternalDB {
    writeToDatabase(data) {
        // Какая-то реализация
    };
};

class LocalPersistance {
    push(data) {
        // Какая-то реализация
    };
};

class PersistanceManager {
    saveData(db, data) {
        if (db instanceof FileSystem) {
            db.writeToFile(data);
        };

        if (db instanceof ExternalDB) {
            db.writeToDatabase(data);
        };

        if (db instanceof LocalPersistance) {
            db.push(data);
        };
    };
};

/*Чтобы избежать указанной проблемы можно реализовать методы на нижнем и верхнем уровне более абстрактным образом.*/

class FileSystemTwo {
    save(data) {
        // Какая-то реализация
    };
};

class ExternalDBTwo {
    save(data) {
        // Какая-то реализация
    };
};

class LocalPersistanceTwo {
    save(data) {
        // Какая-то реализация
    };
};

class PersistanceManagerTwo {
    saveData(db, data) {
        db.save(data)
    };
};