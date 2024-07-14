let array = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
];

for (let i = 0; i < array.length; i++) {
    console.log('outer loop ' + array[i]);

    for (let j = 0; j < array[i].length; j++) {
        console.log('inner loop ' + array[i][j]);
    };
};

/*-------------------------------------------------------------------------------------------------------------------*/