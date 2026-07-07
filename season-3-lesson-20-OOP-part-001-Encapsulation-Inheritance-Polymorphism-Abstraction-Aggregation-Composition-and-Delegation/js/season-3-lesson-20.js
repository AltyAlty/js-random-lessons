'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

/*Принципы ООП:
1. Инкапсуляция (Encapsulation).
2. Наследование (Inheritance).
3. Полиморфизм (Polymorphism).
4. Абстракция (Abstraction).*/

/*--------------------------------------------------------------------------------------------------------------------*/

/*Инкапсуляция - это связывание свойств и методов, работающих с этими свойствами, в единый объект. То есть буквально
использование классов со свойствами и методами для описания сущностей является инкапсуляцией. Побочным результатом
инкапсуляции является сокрытие данных, то есть осуществление прямого доступа к свойствам только через методы. 

Запрет прямого доступа к свойствам может быть осуществлен инструментами синтаксиса языка или соглашениями. 

Методы, имеющие доступ к свойствам, называются сеттерами и геттерами. Сеттеры используются для операций записи, а 
геттеры для операций чтения. Геттеры и сеттеры могут быть осуществленны инструментами синтаксиса языка или отдельно
написанными методами. Геттеры и сеттеры позволяют реализовать внутри себя дополнительные проверки.*/
class Car_01 {
    /*Можно читать геттером "price" и менять сеттером "price".*/
    #_price;

    constructor(model, year, price) {
        /*Нельзя менять по соглашению, но можно читать методом "getModel()".*/
        this._model = model;
        /*Можно читать методом "getYear()" и менять методом "setYear()".*/
        if (year <= 2026) { this._year = year } else { this._year = 2026 };
        this.#_price = price;
    };

    getModel() { return this._model };
    getYear() { return this._year };
    setYear(year) { if (year <= 2026) { this._year = year } else { this._year = 2026 } };
    get price() { return this.#_price };
    set price(price) { this.#_price = price };
};

const car_01 = new Car_01('Mazda', 2015, 300000);
console.log(car_01.getModel()); // "Mazda"
console.log(car_01.getYear()); // 2015
console.log(car_01.price); // 300000
car_01.setYear(2030);
console.log(car_01.getYear()); // 2026
car_01.price = 500000;
console.log(car_01.price); // 500000

console.log('----------------------------------------');

/*--------------------------------------------------------------------------------------------------------------------*/

/*Наследование - это базирование сущности на основе другой сущности. Обычно осуществляется путем наследования классов. 
Наследование является отличным механизмом для повторного использования кода. Наследование позволяет строить отношения 
классов как четко определенную иерархию.*/
class Animal_01 {
    constructor(species, numOfLegs, sound) {
        this.species = species;
        this.numOfLegs = numOfLegs;
        this.sound = sound;
    };

    getInfo() { return { species: this.species, numOfLegs: this.numOfLegs } }
    speak() { console.log(this.sound) };
};

class Dog_01 extends Animal_01 {
    constructor(species, numOfLegs, sound, canRetrieve) {
        super(species, numOfLegs, sound);
        this._canRetrieve = canRetrieve;
    };

    get canRetrieve() { return this._canRetrieve }
};

class Cat_01 extends Animal_01 {
    constructor(species, numOfLegs, sound, canClimbTrees) {
        super(species, numOfLegs, sound);
        this._canClimbTrees = canClimbTrees;
    };

    get canClimbTrees() { return this._canClimbTrees }
};

const dog_01 = new Dog_01('Dog', 4, 'Bark', true);
const cat_01 = new Cat_01('Cat', 4, 'Meow', true);
dog_01.speak(); // Bark
console.log(dog_01.canRetrieve); // true
console.log(dog_01.canClimbTrees); // undefined
cat_01.speak(); // Meow
console.log(cat_01.canClimbTrees); // true
console.log(cat_01.canRetrieve); // undefined

console.log('----------------------------------------');

/*--------------------------------------------------------------------------------------------------------------------*/

/*Полиморфизм - это реализация какого0то функционала, который выдает разный результат в зависимости от сущности. Обычно 
осуществляется при помощи методов с одинаковым интерфейсом.*/

/*Полиморфизм через переопределением метода родительского класса.*/
class Animal_02 { speak() { console.log('some sound') } };
class Dog_02 extends Animal_02 { speak() { console.log('woof') } };
class Cat_02 extends Animal_02 { speak() { console.log('meow') } };
const dog_02 = new Dog_02();
dog_02.speak(); // "woof"
const cat_02 = new Cat_02();
cat_02.speak(); // "meow"

/*Полиморфизм через разное состояние.*/
class Animal_03 { speak() { console.log(this.sound) } };

class Dog_03 extends Animal_03 {
    constructor() {
        super();
        this.sound = 'woof';
    }
};

class Cat_03 extends Animal_03 {
    constructor() {
        super();
        this.sound = 'meow';
    }
};

const dog_03 = new Dog_03();
dog_03.speak(); // "woof"
const cat_03 = new Cat_03();
cat_03.speak(); // "meow"

/*Полиморфизм через утинную типизацию.*/
class Animal_04 { speak() { console.log('some sound') } };
class Dog_04 { speak() { console.log('woof') } };
class Cat_04 { speak() { console.log('meow') } };
function speak(creature) { creature.speak() };
const animal_04 = new Animal_04();
const dog_04 = new Dog_04();
const cat_04 = new Cat_04();
speak(animal_04); // "some sound"
speak(dog_04); // "woof"
speak(cat_04); // "meow"

console.log('----------------------------------------');

/*--------------------------------------------------------------------------------------------------------------------*/

/*Абстракция - это отделение концепции от ее реализации. Обычно осуществляется при помощи интерфейсов и абстрактных 
классов (или их эмуляций).

Интерфейсы в ООП:
1. Не позволяют создавать экземпляры.
2. Не содержат поля.
3. Не содержат конструктор.
4. Содержат сигнатуры методов, то есть методы, без реализации, но требующие реализацию в дочерних классах.

Абстрактные классы в ООП:
1. Не позволяют создавать экземпляры.
2. Могут содержать поля.
3. Могут содержать конструктор.
4. Могут содержать методы с реализацией, которые могут быть переопределены дочерними классами.
5. Содержат абстрактные, то есть методы, без реализации, но требующие реализацию в дочерних классах.

Интерфейсы и абстрактные классы в ООП позволяют дочерним классам определять свои поля и методы.*/
class InterfacePerson {
    constructor() {
        if (this.constructor === InterfacePerson) { throw new Error('Interfaces cannot be instantiated') };
    };

    breathe() { throw new Error(`Method "breathe()" must be implemented`) };
    walk() { throw new Error(`Method "walk()" must be implemented`) };
    jump() { throw new Error(`Method "jump()" must be implemented`) };
};

class Man_01 extends InterfacePerson {
    constructor(name) {
        super();
        this.name = name;
    };

    breathe() { console.log('breathing') };
    walk() { console.log('walking') };
    jump() { console.log('jumping') };
    sayHi() { console.log(`Hi, my name is ${this.name}`) };
};

class Man_02 extends InterfacePerson {
    constructor(name) {
        super();
        this.name = name;
    };

    walk() { console.log('walking') };
    jump() { console.log('jumping') };
    sayHi() { console.log(`Hi, my name is ${this.name}`) };
};

// const person_01 = new InterfacePerson('Dude_00'); // Error: Interfaces cannot be instantiated
const man_01 = new Man_01('Dude_01');
man_01.breathe(); // "breathing"
man_01.walk(); // "walking"
man_01.jump(); // "jumping"
man_01.sayHi(); // "Hi, my name is Dude_01"
const man_02 = new Man_02('Dude_02');
// man_02.breathe(); // Error: Method "breathe()" must be implemented
man_02.walk(); // "walking"
man_02.jump(); // "jumping"
man_02.sayHi(); // "Hi, my name is Dude_02"

class AbstractClassPerson {
    constructor(name) {
        if (this.constructor === AbstractClassPerson) { throw new Error('Abstract classes cannot be instantiated') };
        this.name = name;
    };

    breathe() { throw new Error(`Method "breathe()" must be implemented`) };
    walk() { throw new Error(`Method "walk()" must be implemented`) };
    jump() { throw new Error(`Method "jump()" must be implemented`) };
    sayBye() { console.log('Bye') };
};

class Man_03 extends AbstractClassPerson {
    constructor(name, age) {
        super(name);
        this.age = age;
    };

    breathe() { console.log('breathing') };
    walk() { console.log('walking') };
    jump() { console.log('jumping') };
    sayHi() { console.log(`Hi, my name is ${this.name}`) };
};

// const person_02 = new AbstractClassPerson('Dude_00'); // Error: Abstract classes cannot be instantiated
const man_03 = new Man_03('Dude_03', 50);
man_03.breathe(); // "breathing"
man_03.walk(); // "walking"
man_03.jump(); // "jumping"
man_03.sayHi(); // "Hi, my name is Dude_03"
man_03.sayBye(); // "Bye"

console.log('----------------------------------------');

/*--------------------------------------------------------------------------------------------------------------------*/

/*Агрегация (Aggregation) и Композиция (Composition) - это способы взаимодействия между классами.

Класс "Car_02" внутри себя использует классы "Engine" и "Wheel", вызывая их напрямую, а не через параметры, так как
двигатель и колеса считаются неотъемлемой частью машины. То есть объект-целое не может существовать без объектов-частей.
Это называется композицией.

Освежитель не является неотъемлемой частью машины, но может в ней использоваться опциаонально. Так же как и в квартире.
Поэтому оба класса "Car_02" и "Flat" получают ожидают экземпляры класса "Freshener" через параметры. То есть 
объекты-целое могут существовать без объектов-частей. Это называется агрегацией.

Делегирование (Delegation) - это передача выполнения задачи, то есть вызова метода, другому внутреннему объекту.*/
class Engine { work() { console.log('Engine is working') } };
class Wheel { work(number) { console.log(`Wheel #${number} is working`) } };
class Freshener { work() { console.log('Freshener is working') } };

class Car_02 {
    engine;
    wheels = [];
    freshener;

    constructor(freshener) {
        /*Агрегация.*/
        this.freshener = freshener;
        /*Композиция.*/
        this.engine = new Engine();
        this.wheels.push(new Wheel());
        this.wheels.push(new Wheel());
        this.wheels.push(new Wheel());
        this.wheels.push(new Wheel());
    };

    /*Делегирование.*/
    work() {
        this.engine.work();
        for (let i = 0; i < this.wheels.length; i++) { this.wheels[i].work(i + 1) };
    };
};

class Flat {
    freshener;
    /*Агрегация.*/
    constructor(freshener) { this.freshener = freshener };
};

const freshener_01 = new Freshener();
const car_02 = new Car_02(freshener_01);
const flat_01 = new Flat(freshener_01);
car_02.work(); // "Engine is working" -> "Wheel #1-4 is working"
car_02.freshener.work(); // "Freshener is working"
flat_01.freshener.work(); // "Freshener is working"