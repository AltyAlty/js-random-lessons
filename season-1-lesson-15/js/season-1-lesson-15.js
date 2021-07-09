var calcButtonClass = 'calc-button';
var calcButtonElements = document.getElementsByClassName(calcButtonClass);

var resultClass = 'result';
var resultElement = document.getElementsByClassName(resultClass);

var inputOneClass = 'input-one';
var inputTwoClass = 'input-two';
var inputOneElement = document.getElementsByClassName(inputOneClass);
var inputTwoElement = document.getElementsByClassName(inputTwoClass);

for (var i = 0; i < calcButtonElements.length; i++) { /*Подписываем наши HTML-элементы "button" на событие.*/
    calcButtonElements[i].addEventListener('click', generalListener);
};

function generalListener(event) { /*Когда срабатывает какое-то событие, в вызываемую функцию 
    отправляется объект "event", содержащий информацию об этом событии. Свойство "currentTarget" 
    этого объекта означает элемент, с которым произошло какое-то событие. То есть здесь, когда
    мы будем кликать на какую-то кнопку, то будем получать "innerHTML" этой кнопки, что будет
    содержать "+", "-", "*" или ":". Это мы можем использовать для указания математической 
    операции.*/
    var elementInEvent = event.currentTarget;
    var operation = elementInEvent.innerHTML;
    calculateSomething(operation);
};

function calculateSomething(operation) {
    if (Number.isInteger(parseInt(inputOneElement[0].value)) && Number.isInteger(parseInt(inputTwoElement[0].value))) { /*"Number.isInteger()"
    проверяет является ли что-то числом.*/
        switch (operation) {
            case '+':
                resultElement[0].innerText = Number(inputOneElement[0].value) + Number(inputTwoElement[0].value); /*"Number()", 
                как и "parseInt()", приводит строку к числу, но для проверки выше "Number()" не подойдет.*/
                break;
            case '-':
                resultElement[0].innerText = Number(inputOneElement[0].value) - Number(inputTwoElement[0].value);
                break;
            case '*':
                resultElement[0].innerText = Number(inputOneElement[0].value) * Number(inputTwoElement[0].value);
                break;
            case ':':
                resultElement[0].innerText = Number(inputOneElement[0].value) / Number(inputTwoElement[0].value);
                break;
            default:
                break;
        };
    } else {
        resultElement[0].innerText = 'Only numbers!';
    };
};