/*
Принципы ООП:

Инкапсуляция / Encapsulation
Наследование / Inheritance
Полиморфизм / Polymorphism
Абстракция / Abstraction
*/

/*-------------------------------------------------------------------------------------------------------------*/

/*Инкапсуляция.*/

/*Инкапсуляция это механизм языка, позволяющий связывать свойства и методы, работающие с этими свойствами, 
в единый объект. Как следствие инкапсуляция позволяет заключить свойства внутри методов так, чтобы к ним не 
было прямого доступа извне. Это называется сокрытием данных. Для управления данными должны создаваться 
интерфейсы, при этом сама реализация этих интерфейсов должна быть скрыта от внешнего мира. Это упрощает 
разработку. Например, в нашем примере есть класс "Car", которые имеет 3 метода. Первый метод связан со 
свойствами "this.model" и "this.year" и он предназначен, чтобы устанавливать указанные свойства. Методы, которые
устанавливают какие-то свойства называют сеттерами. Следующие два метода предназначены для чтения упомянутых 
свойств. Методы, которые считывают какие-то свойства называют геттерами.То есть все эти три метода являются 
интерфейсами для работы с указанными свойствами, и не предпологается в данном случае прямого доступа к этим 
свойствам. И для внешнего мира реализация этих свойств скрыта. Все, что знает тот, кто пользуется этими методами, 
это какие параметры нужно указывать. Внешний мир не отвлекается на то как эти интерфейсы работают внутри. 
Внешний мир просто берет и пользуется ими. Такое сокрытие позволяет нам в целях безопасности, например, 
добавлять какие-то внутренние проверки в эти интерфейсы. Такая проверка у нас есть в первом методе "setAttr()", 
где мы проверяем, что указанный год не является меньшим, чем 1960.*/

class Car {
    setAttr(model, year) {
        this._model = model;

        if (year >= 1960) {
            this._year = year;
        } else {
            this._year = 1960;
        };
    };

    getModel() {
        if (!this._model) {
            console.log('Model has not been specified');
        } else {
            console.log(this._model);
        };
    };

    getYear() {
        if (!this._year) {
            console.log('Year has not been specified');
        } else {
            console.log(this._year);
        };
    };
};

const c1 = new Car();
c1.getModel();
c1.getYear();
c1.setAttr('Mazda', 2015);
c1.getModel();
c1.getYear();

const c2 = new Car();
c2.setAttr('Mazda', 1950);
c2.getModel();
c2.getYear(); // 1960

console.log('----------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Наследование.*/

/*Наследование - это способность объекта или класса базироваться на другом объекте или классе. Это главный 
механизм для повторного использования кода. Наследственное отношение классов четко определяет их иерархию.*/

class Animal {
    constructor(species, numOfLegs, sound) {
        this.species = species;
        this.numOfLegs = numOfLegs;
        this.sound = sound;
    };

    speak() {
        console.log(this.sound);
    };
};

class Dog extends Animal {
    constructor(species, numOfLegs, sound, canRetrieve) {
        super(species, numOfLegs, sound);

        this.canRetrieve = canRetrieve;
    };
};

class Cat extends Animal {
    constructor(species, numOfLegs, sound, canClimbTrees) {
        super(species, numOfLegs, sound);

        this.canClimbTrees = canClimbTrees;
    };
};

const charlie = new Dog('Dog', 4, 'Bark', true);
const kitty = new Cat('Cat', 4, 'Meow', true);

charlie.speak(); // Bark
console.log(charlie.canRetrieve); // true
console.log(charlie.canClimbTrees); // undefined

kitty.speak(); // Meow
console.log(kitty.canClimbTrees); // true
console.log(kitty.canRetrieve); // undefined

console.log('----------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Полиморфизм.*/

/*Полиморфизм - это реализация задач одной и той же идеи разными способами. Полиморфизм в нативном JS
строится на наследовании и переопределении методов. Переопределение методов это когда в дочернем классе
переопределяется реализация какого-нибудь метода из родительского класса.*/

class AnimalTwo {
    speak() {
        console.log('Some sound');
    };
};

class DogTwo extends AnimalTwo {
    speak() {
        console.log('Woof Woof');
    };
};

class CatTwo extends AnimalTwo {
    speak() {
        console.log('Meow Meow');
    };
};

const myDog = new DogTwo();
myDog.speak(); // Woof Woof

const myCat = new CatTwo();
myCat.speak(); // Meow Meow

console.log('----------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Абстрацкция.*/

/*Абстракиция это отделение концепции от ее реализации. Абстракция представляет из себя идею, что внешний мир 
должен быть обеспечен только необходимыми данными об объекте, внешний мир не должен быть обеспечен информацией 
о реализации деталей объекта. Для осущестлвения абстракции нужны абстрактные классы. Такие классы особенные -
на их основе нельзя создать объекты. Если вам нужно использовать абстрактный класс, то вам нужно сделать на его
основе дочерний класс. Только абстрактные классы могут иметь абстрактные методы. Абстрактные методы - это
объявленные методы без какой-либо конкретной реализации. Их конкретная реализация должна быть указана в дочерних
классах абстрактного класса. Но в нативном JS абстрактных классов нет, но их можно симитировать.*/

/*Этот класс имитирует абстрактный класс. Если вы попытаетесь создать на его основе объект, то получите
ошибку. Если вы забудете реализовать один из методов этого класса в каком-то дочернем классе, то тоже получите
ошибку.*/
class PersonTwo {
    constructor(name) {
        if (this.constructor === PersonTwo) {
            throw new Error('Abstract classes can\'t be instantiated');
        };
    };

    sayHi() {
        throw new Error('Method \'sayHi()\' must be implemented');
    };
};

class Man extends PersonTwo {
    constructor(name) {
        super(name);

        this.name = name;
    };

    sayHi() {
        console.log (`Hi, my name is ${this.name}`);
    };
};

/*В этом дочернем классе мы забыли указать реализацию абстрактного метода.*/
class Woman extends PersonTwo {
    constructor(name) {
        super(name);

        this.name = name;
    };
};


const saed = new Man('Saed');
saed.sayHi(); // Hi, my name is Saed

const julii = new Woman('Julii');
// julii.sayHi() // Method 'sayHi()' must be implemented

// const tom = new PersonTwo('Tom'); // Abstract classes can't be instantiated

console.log('----------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Агрегация (Aggregation) и Композиция (Composition) - это способы взаимодействия между классами.

Рассмотрим сначала композицию. Представим, что у нас есть класс "Автомобиль". Этот класс использует объект
"Двигатель" на основе другого класса и массив из 4-х объектов "Колесо" на основе еще одного другого класса. В
данном примере объект "Автомобиль" содержит внутри себя другие объекты, которые использует, и что важно для
данного примера объекты "Двигатель" и "Колеса" не могут существовать без "Автомобиля", так как они являются
составными частями "Автомобиля" и создаются как бы внутри него. То есть можно сказать, что композиция это 
включение объектом-контейнером объекта-содержимого и управление его поведением; последний не может существовать 
вне первого.

Теперь рассмотрим агрегацию. Представим такой же "Автомобиль" c "Двигателем" и "Колесами". Но также представим
класс "Елочка", но эта "Елочка" передается в класс "Автомобиль" откуда-то извне. То есть эта "Елочка" может
существовать и в какой-нибудь "Квартире". То есть "Елочка" не зависит от класса "Автомобиль" и передается в
него откуда-то извне через параметры конструктора. То есть можно сказать, что fгрегация это включение 
объектом-контейнером ссылки на объект-содержимое; при уничтожении первого последний продолжает существование.*/

class Engine {
    drive() {
        console.log('Двигатель работает');
    };
};

class Wheel {
    drive() {
        console.log('Колеса едут');
    };
};

class Freshener {
    do() {
        console.log('Елочка освежает');
    }
};

class Flat {
    freshener;

    constructor(freshener) {
        // Агрегация
        this.freshener = freshener;
    };
};

class CarTwo {
    engine;
    wheels = [];
    freshener;

    constructor(freshener) {
        // Агрегация
        this.freshener = freshener;

        // Композиция
        this.engine = new Engine();
        this.wheels.push(new Wheel());
        this.wheels.push(new Wheel());
        this.wheels.push(new Wheel());
        this.wheels.push(new Wheel());
    };

    // Делегирование (Delegation) - это перепоручение задачи от внешнего объекта внутреннему.
    drive() {
        this.engine.drive();

        for (let i = 0; i < this.wheels.length; i++) {
            this.wheels[i].drive();
        };
    };
};

const freshener = new Freshener();

const carTwo = new CarTwo(freshener);
carTwo.drive();
carTwo.freshener.do();