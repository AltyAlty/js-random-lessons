var firstClass = 'first';
var secondClass = 'second';
var magicClass = 'magic';

var magicElement = document.getElementsByClassName(magicClass);

magicElement[0].onclick = function () {
    function getValue(classOfElement) {
        var element = document.getElementsByClassName(classOfElement);
        return element[0].value; /*"return" позволяет функции что-то возвращать в качестве результата своей работы.*/
    };

    /*Получаем значения атрибута "value" HTML-элементов.*/
    var firstElementValue = getValue(firstClass);
    var secondElementValue = getValue(secondClass);

    /*Выводим в консоль значения атрибута "value" HTML-элементов.*/
    console.log(firstElementValue);
    console.log(secondElementValue);
};