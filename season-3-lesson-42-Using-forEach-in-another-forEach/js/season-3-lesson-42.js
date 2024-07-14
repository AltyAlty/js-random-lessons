let array = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
];

array.forEach(function (elem) {
    console.log('outer loop ' + elem);

    elem.forEach(function (elem) {
        console.log('inner loop ' + elem);
    });
});

/*-------------------------------------------------------------------------------------------------------------------*/