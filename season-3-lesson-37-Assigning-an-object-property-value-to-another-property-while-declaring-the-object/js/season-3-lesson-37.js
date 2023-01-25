/*-------------------------------------------------------------------------------------------------------------*/

/*Вы не можете ссылаться на объект до того, как он будет полностью инициализирован.*/

// can't access lexical declaration 'objOne' before initialization
// let objOne = {
//     a: [[1], [2], [3]],
//     b: objOne.a[0]
// };

let objOne = {
    a: [[1], [2], [3]],
    b: function () {
        return objOne.a[0]
    }
};

console.log(objOne.b()); // [1]