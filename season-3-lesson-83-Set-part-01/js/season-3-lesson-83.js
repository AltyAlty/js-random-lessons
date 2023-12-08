const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

let hashSet = new Set();

hashSet.add('Миша');
hashSet.add('Рома');
hashSet.add('Катя');
hashSet.add('Даша');
hashSet.add('Толя');

console.log(hashSet);

console.log(hashSet.has('Рома'));
console.log(hashSet.has('Света'));

hashSet.delete('Толя');
console.log(hashSet.has('Толя'));

let object = {};
object.Рома = 23;
object.Миша = 15;
object.Толя = 28;
object.Даша = 21;
object.Катя = 30;
let age = object.Толя

/*-------------------------------------------------------------------------------------------------------------------*/

hashSet.add({ x: 1, y: 2 });
hashSet.add({ x: 3, y: 4 });
hashSet.add({ x: 5, y: 6 });

/*Перебор элементов в set.*/

for (let value of hashSet) {
    if (value.x === 3 && value.y === 4) {
        console.log(true);
    } else {
        console.log(false);
    };
};

hashSet.forEach((value, valueAgain, hashSet) => {
    if (value.x === 3 && value.y === 4) {
        console.log(true);
    } else {
        console.log(false);
    };
});