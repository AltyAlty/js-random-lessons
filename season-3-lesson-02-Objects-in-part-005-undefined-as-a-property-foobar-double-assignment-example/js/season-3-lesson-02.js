/*При обращении к несуществующему свойству объекта, мы получим "undefined". Но если мы пытаемся обратиться к
несуществующему свойству другого несуществующего свойства, который в свою очередь является свойством какого-то объекта,
то будет ошибка, так как произойдет попытка получить свойство у "undefined", то есть в месте, которого не существует.*/
let objOne = {
    age: 10,
    pockets: {
        money: 20
    },
    hair: undefined
};

/*undefined. Объект "objOne" существует, но свойство "ears" у него не существует.*/
console.log(objOne.ears);

/*error. Объект "objOne" существует, но свойство "head" у него не существует, соотвественно при попытке получить
свойство "brain" у несуществующего свойства "head", то есть в несуществующем месте, будет ошибка.*/
// console.log(objOne.head.brain);

/*-------------------------------------------------------------------------------------------------------------------*/

/*При установлении несуществующего свойства у объекта, это свойство будет создано.*/
console.log(objOne.liver = null);
console.log(objOne.pockets.keys = 2);
console.log(objOne);

/*error. Но если аналогично мы пытаемся установить несуществующее свойство у другого несуществующего свойства, который в
свою очередь является свойством какого-то объекта, то опять будет ошибка, так ка произойдет попытка установить свойство
у "undefined", то есть в месте, которого не существует.*/
// console.log(objOne.ears.volume = 15);

/*-------------------------------------------------------------------------------------------------------------------*/

let foo = { n: 1 };
let bar = foo;
// let car = foo;
foo.x = foo = { n: 2 };

/*Третью строчку можно написать еще двумя следующими способами.*/
// y = { n: 2 };
// bar.x = y;
// foo = y;

// y = { n: 2 };
// foo = bar.x = y;

/*
1. Пытаемся создать свойство "x" у "foo", то есть создать его в объекте "{ n: 1 }"

2. Затем чтобы создать это свойство нужно следующим шагом вычислить что стоит с правой стороны, то есть "foo = { n: 2 }"

3. В этой правой части сообщается, что теперь "foo" ссылается на новый объект "{ n: 2 }". Стоит отметить, что в левой
части в этот момент "foo" все еще ссылается на первый объект "{ n: 1 }"

4. Далее разобравшись в левой части, что она равна новому объекту "{ n: 2 }", свойство "x" будет иметь значение
"{ n: 2 }", и в итоге объект "{ n: 1 }" модернизируется в объект "{ n: 1, x: {n: 2} }". И в этот момент, поскольку "bar"
хранит ту же ссылку, что и "foo", то "bar" будет ссылаться на этот объект "{ n: 1, x: {n: 2} }".

5. К этому моменту в памяти находятся два объекта:
    a. "{ n: 1, x: {n: 2} }" - модернизированный объект "{ n: 1 }"
    б. "{ n: 2 }" - объект, созданный в левой части третьей строчки кода

6. Осталось только разобраться на какие из этих двух объектов теперь ссылаются наши "foo" и "bar". "bar" как указано в
шаге 4 ссылается на объект "{ n: 1, x: {n: 2} }". А вот "foo" ссылается уже на новый объект "{ n: 2 }", так как левая
часть "foo = { n: 2 }" третьей строчки сработает после того, как измениться "foo" в правой части, то есть первый объект
"{ n: 1 }". В итоге третья строчка приведет к тому, что "foo" и "bar" больше не будут ссылаться на один и тот же объект
в памяти.
*/

console.log(foo.x); // undefined 
console.log(foo); // { n: 2 }
console.log(bar); // { n: 1, x: {n: 2} }
console.log(foo === bar.x); // true
// console.log(car);
// console.log(foo === car.x);

/*-------------------------------------------------------------------------------------------------------------------*/

let itsMeNow = { body: 'weak' };
let myPersonalArchivarius = itsMeNow;
itsMeNow.myLatestCondition = itsMeNow = { body: 'strong' };

console.log(itsMeNow.myLatestCondition);
console.log(itsMeNow);
console.log(myPersonalArchivarius);
console.log(itsMeNow === myPersonalArchivarius.myLatestCondition);