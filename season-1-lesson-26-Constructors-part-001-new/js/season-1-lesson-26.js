var obj1 = { /*Это объект.*/
    kek: 1,
    dodo: function () {
        kek = 2;
    }
};

obj1.dodo();
console.log(obj1.kek); /*1, старое свойство объекта.*/
console.log(kek); /*2, новая глобальная переменная.*/

obj1.kok = 3;
console.log(obj1.kok); /*3, новое свойство объекта.*/
/* console.log(kok); */ /*"undefined", новой глобальной переменной не создано.*/

/*-------------------------------------------------------------------------------------------------------------------*/

function Obj2() { /*Это функция.*/
    this.lol = 4;
    this.makemake = function () {
        console.log('I did');
    };
    pop = 5; /*При создании объектов при помощи конструктора, полученные объекты не будут содержать это свойство, так
    как оно без "this".*/
    var lel = 6; /*При создании объектов при помощи конструктора, полученные объекты не будут содержать это
    свойство, так как оно без "this".*/
};

var newObj2 = new Obj2(); /*При использовании оператора "new" создается новый контекст вызова "this", типо в виде
объекта "this = {}". Потом этот объект заполняется внутренностями, которые были помечены контекстом вызова "this" в
указанной функции. А далее возвращается этот объект. Получается, что функция "Obj2" является конструктором для создания
объектов определенного однотипного содержания. Функция-конструктор работает как класс, на основе которого можно
создавать экземпляры класса.*/

console.log(newObj2); /*Объект типа "Obj2":
                                {
                                    lol: 4,
                                    makemake: function () {
                                        console.log('I did');
                                    }
                                }
                                */