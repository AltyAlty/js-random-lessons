(function () {
    var garage = document.getElementById('garage'); /*Находим элемент с идентификатором 
    "garage" в HTML-разметке.*/

    /*Создаем 4 машины.*/
    for (var i = 0; i < 4; i++) {
        var div = document.createElement('div'); /*Для каждой машины создаем элемент "div".*/

        carID = 'car' + i; /*Для каждой машины создаем идентификатор.*/

        div.id = carID; /*Вписываем этот идентификатор в созданный нами элемент "div".*/

        garage.appendChild(div); /*При помощи функции "appendChild()" добавляем наш элемент "div" 
        в конец списка дочерних элементов элемента с идентификатором "garage".*/

        initializeCar(carID); /*Добавляем разметку по самой машине и даем ей поведение.*/

        function startAllCars() {
            alert('Lets go!');
        };

        var startAllCarsElement = document.getElementById('start-all-cars');
        startAllCarsElement.addEventListener('click', startAllCars);
    };
})(); /*Это самовызывающаяся функция. Она сработает сама при запуске программы.*/