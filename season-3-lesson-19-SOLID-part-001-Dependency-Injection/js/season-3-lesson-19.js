'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

/*Принципы SOLID:
1. S - SRP - Single Responsibility Principle (Принцип единственной ответственности).
2. O - OCP - Open Closed Principle (Принцип открытости-закрытости).
3. L - LSP - Liskov Substitution Principle (Принцип подстановки Барбары Лисков).
4. I - ISP - Interface Segregation Principle (Принцип разделения интерфейса).
5. D - DIP -  Dependency Inversion Principle (Принцип инверсии зависимостей).

Принципы SOLID можно считать более "низкоуровневыми", чем принципы ООП, так как они больше говорят о том как писать код, 
нежели как его структурироть. Также принципы SOLID могут иметь более рекомендательный характер, чем принципы ООП.*/

/*--------------------------------------------------------------------------------------------------------------------*/

/*Принцип единственной ответственности гласит, что для изменения класса никогда не должно быть более одной причины. 
Более простыми словами, SRP говорит о том, чтобы любая программная сущность должна иметь только одну ответственность.

Например, класс "Todolist_01" нарушает SRP, так как помимо ответственности по работе со списком задача, также имеет 
ответственность по работе с файловой системой. Разделение класса "Todolist_01" на два класса "Todolist_02" и 
"DatabaseManager_01" будет соответствовать SRP, так как две ответственности будут поделены между двумя классами.*/
class Todolist_01 {
    constructor() { this.items = [] };
    addItem(text) { this.items.push(text) };
    removeItem(index) { this.items.splice(index, 1) };
    toString() { return this.items.toString() };
    save(filename) { fs.writeFileSync(filename, this.toString()) };
    load(filename) { };
};

class Todolist_02 {
    constructor() { this.items = [] };
    addItem(text) { this.items.push(text) };
    removeItem(index) { this.items = items.splice(index, 1) };
    toString() { return this.items.toString() };
};

class DatabaseManager_01 {
    saveToFile(data, filename) { fs.writeFileSync(filename, data.toString()) };
    loadFromFile(filename) { };
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Принцип открытости-закрытости гласит, что программные сущности должны быть открыты для расширения, но закрыты для 
модификации. Более простыми словами, OCP говорит о том, что новая функциональность должна добавляться через новые 
классы, а не правкой старого кода.

Например, класс "CoderFilter" нарушает OCP, так как нам придется его модифицировать, если будет необходимо добавить 
больше фильтров. Создание более универсальной функции "filterByProp()" будет соответствовать OCP, так как у эта функция
не будет зависить от текущего класса "Coder".*/

class Coder {
    constructor(fullName, language, hobby, education, workplace, position) {
        this.fullName = fullName
        this.language = language
        this.hobby = hobby
        this.education = education
        this.workplace = workplace
        this.position = position
    };
};

class CoderFilter {
    filterByFullName(coders, fullName) { return coders.filter(coder => coder.fullName === fullName) };
    filterByLanguage(coders, language) { return coders.filter(coder => coder.language === language) };
    filterByHobby(coders, hobby) { return coders.filter(coder => coder.hobby === hobby) };
};

const filterByProp = (array, propName, value) => array.filter(element => element[propName] === value);

/*--------------------------------------------------------------------------------------------------------------------*/

/*Принцип подстановки Барбары Лисков гласит, что функции, использующие указатели или ссылки на базовые классы, должны 
иметь возможность использовать указатели или ссылки на производные классы, не зная об этом. Более простыми словами, LSP
говорит о том, что дочерние классы не должны нарушать интерфейсы или контракты методов родительского класса, чтобы 
родительские классы могли быть подменены их дочерними классами то есть:
1. Если метод родительского класса принимает какое-то количество параметров каких-то типов, то переопределенный метод в 
дочернем классе должен принимать минимум такое же количество параметров таких же типов. 
2. Если метод родительского класса возвращает какие-то данные какого-то типа, то переопределенный метод в дочернем 
классе должен возвращать какие-то данные такого же типа, либо более уточненного типа, например число -> число с 
запятой.

Например, класс "Dog" нарушает LSP, так как его метод "getSize()" возвращает число, а не строку как аналогичный метод
в родительском классе "Animal". Класс "Cat" соответствует LSP, так как его переопределенный метод "getSize()" не 
нарушает контракта родительского класса "Animal".*/

class Animal {
    constructor(size) { this.size = size };
    getSize() { return `My size is ${this.size}` };
};

class Dog extends Animal {
    constructor(size) { super(size) };
    getSize() { return this.size };
};

class Cat extends Animal {
    constructor(size) { super(size) };
    getSize() { return `My size is exactly ${this.size}` };
};

function isSizeString(creature) { console.log(typeof creature.getSize() === 'string') };
isSizeString(new Animal(10)); // true
isSizeString(new Dog(10)); // false
isSizeString(new Cat(10)); // true

/*--------------------------------------------------------------------------------------------------------------------*/

/*Принцип разделения интерфейса гласит, что клиенты не должны зависеть от методов интерфейса, которые они не используют. 
Более простыми словами, ISP говорит о том, что не нужно заставлять дочерние классы реализовывать методы, которые им не 
нужны, а лучше разбивать один большой интерфейс на несколько более узких и специализированных.

Например, абстрактный класс "AbstractPhone_01" нарушает ISP, так как дочерний класс "Nokia3310_01" не может полностью 
использовать интерфейс родительского класса "AbstractPhone_01", поскольку класс "Nokia3310_01" не имеет камеры и wi-fi 
из-за чего не может реализовать методы "takePhoto()" и "connectToWifi()". 

Чтобы ситуация соответствовала принципу ISP можно разделить интерфейс класса "AbstractPhone_01" на три отдельных класса:
"AbstractPhone_02", "AbstractNewPhone_01" и "AbstractOldPhone_01", причем последние два будут являться дочерними для
класса "AbstractPhone_02". Тогда класс "Nokia3310_02" можно уже будет наследовать от класса "AbstractOldPhone_01" не
беспокоясь о функциях новых телефонов из класса "AbstractNewPhone_01".*/
class AbstractPhone_01 {
    constructor() { if (this.constructor.name === 'AbstractPhone_01') throw new Error('This class is abstract') };
    call(number) { };
    takePhoto() { };
    connectToWifi() { };
};

class IPhone_01 extends AbstractPhone_01 {
    constructor(camera, wifi) {
        super();
        this.camera = camera;
        this.wifi = wifi;
    };

    takePhoto() { return this.camera };
    connectToWifi() { return this.wifi };
};

class Nokia3310_01 extends AbstractPhone_01 {
    constructor() { super() };
    /*Нельзя реализовать из-за отсутствия камеры.*/
    takePhoto() { };
    /*Нельзя реализовать из-за отсутствия wi-fi.*/
    connectToWifi() { };
};

class AbstractPhone_02 {
    constructor() { if (this.constructor.name === 'AbstractPhone_02') throw new Error('This class is abstract') };
    call(number) { };
};

class AbstractNewPhone_01 extends AbstractPhone_02 {
    constructor(camera, wifi) {
        if (this.constructor.name === 'AbstractNewPhone_01') throw new Error('This class is abstract');
        super();
        this.camera = camera;
        this.wifi = wifi;
    };

    takePhoto() { };
    connectToWifi() { };
};

class AbstractOldPhone_01 extends AbstractPhone_02 {
    constructor(phoneCase) {
        if (this.constructor.name === 'AbstractOldPhone_01') throw new Error('This class is abstract');
        super();
        this.phoneCase = phoneCase;
    };

    usePhoneCase() { };
};

class IPhone_02 extends AbstractNewPhone_01 {
    constructor(camera, wifi) { super(camera, wifi) };
    takePhoto() { return this.camera };
    connectToWifi() { return this.wifi };
};

class Nokia3310_02 extends AbstractOldPhone_01 {
    constructor(phoneCase) { super(phoneCase) };
    usePhoneCase() { return this.phoneCase }
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Принцип инверсии зависимостей гласит, что программные сущности должны опираться на абстракции, а не на конкретные 
реализации. Более простыми словами, DIP говорит о том, что:
1. Модули верхних уровней не должны зависеть от модулей нижних уровней.
2. Модули должны зависеть от абстракций.
3. Абстракции не должны зависеть от деталей. 
4. Детали должны зависеть от абстракций.

Например, класс "PersistanceManager_01" обозначает модуль верхнего уровня, классы "FileSystem_01", "ExternalDB_01" и 
"LocalPersistance_01" - модули нижнего уровня. В данном случае класс "PersistanceManager_01" нарушает DIP, так как 
зависит от реализации классов "FileSystem_01", "ExternalDB_01" и "LocalPersistance_01", поскольку если будет изменен
один из модулей нижнего уровня или добавлен новый, то придется менять и класс "PersistanceManager_01". 

Чтобы ситуация соответствовала DIP можно реализовать методы на нижнем и верхнем уровнях более абстрактным образом. 
Используя паттерн Dependency Injection (DI), можно передавать в экземпляры более высокоуровнего класса 
"PersistanceManager_02" экземпляры менее высокоуровневых классов "FileSystem_02", "ExternalDB_02" и 
"LocalPersistance_02". 

Часто DI делается через конструкторы, а не через параметры методов, как в случае класса "PersistanceManager_03".*/
class FileSystem_01 { writeToFile(data) { } };
class ExternalDB_01 { writeToDatabase(data) { } };
class LocalPersistance_01 { push(data) { } };

class PersistanceManager_01 {
    saveData(db, data) {
        if (db instanceof FileSystem_01) { db.writeToFile(data) };
        if (db instanceof ExternalDB_01) { db.writeToDatabase(data) };
        if (db instanceof LocalPersistance_01) { db.push(data) };
    };
};

class FileSystem_02 { save(data) { } };
class ExternalDB_02 { save(data) { } };
class LocalPersistance_02 { save(data) { } };
class PersistanceManager_02 { saveData(db, data) { db.save(data) } };

class PersistanceManager_03 {
    constructor(db) { this.db = db }
    saveData(data) { this.db.save(data) };
};