'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

let obj1 = {
    a: 1,
    func: function () {
        console.log(this);
    }
};

setTimeout(obj1.func, 1000); // Window

setTimeout(() => {
    obj1.func()
}, 1200); // { a: 1 ...}

setTimeout(function () {
    obj1.func()
}, 1400); // { a: 1 ...}

function doSmth() {
    let func = () => {
        obj1.func()
    };

    func();
};

setTimeout(doSmth, 1600);  // { a: 1 ...}