'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

function func01(a, callback) {
    ++a;
    callback(a);
};

function func02() {
    let a = 0;
    function callback(result) { a = result };
    func01(a, callback);
    console.log(a); // 1
};

func02();