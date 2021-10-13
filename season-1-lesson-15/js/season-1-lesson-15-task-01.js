var calcButtonOneClass = 'calc-button-one';
var calcButtonOneElements = document.getElementsByClassName(calcButtonOneClass);

var calcButtonTwoClass = 'calc-button-two';
var calcButtonTwoElements = document.getElementsByClassName(calcButtonTwoClass);

var enterButtonClass = 'enter-button';
var enterButtonElements = document.getElementsByClassName(enterButtonClass);

var resultClass = 'result';
var resultElement = document.getElementsByClassName(resultClass);

var currentFirstNumber = '';
var currentSecondNumber = '';
var currentOperation = '';

/*--------------------------------------------------------------------------------*/

function enterSomething(valueToEnter) {
    resultElement[0].innerText = resultElement[0].innerText + valueToEnter;
};

function enterButtonListener(event) {
    var elementInEvent = event.currentTarget;
    var valueToEnter = elementInEvent.innerHTML;
    enterSomething(valueToEnter);
};

for (var i = 0; i < enterButtonElements.length; i++) {
    enterButtonElements[i].addEventListener('click', enterButtonListener);
};

/*--------------------------------------------------------------------------------*/

function doAfterChoosingOperation(operation) {
    if (currentFirstNumber === '' && resultElement[0].innerText != '') {
        currentFirstNumber = Number(resultElement[0].innerText);
        resultElement[0].innerText = '';
    };
    currentOperation = operation;
    showInfo(); /*remove it*/
};

function calcButtonOneListener(event) {
    var elementInEvent = event.currentTarget;
    var operation = elementInEvent.innerHTML;
    doAfterChoosingOperation(operation);
};


for (var i = 0; i < calcButtonOneElements.length; i++) {
    calcButtonOneElements[i].addEventListener('click', calcButtonOneListener);
};

/*--------------------------------------------------------------------------------*/

function resetNumbersAndOperation() {
    currentOperation = '';
    currentFirstNumber = '';
    currentSecondNumber = '';
};

function calculateSomething(operation) {
    switch (operation) {
        case '+/-':
            if (resultElement[0].innerText[0] != '-') {
                resultElement[0].innerText = '-' + resultElement[0].innerText;
            } else {
                var content = resultElement[0].innerText; /*Строки в JS "immutable", поэтому мы не можем просто изменить их,
                то есть нельзя сделать так "resultElement[0].innerText[0] = '123'", нам нужно переназначить измененную версию 
                обратно в "innerHTML.innerText".*/
                resultElement[0].innerText = content.substr(1) /*Метод substr() возвращает указанное количество символов из строки, 
                начиная с указанной позиции.*/
            };
            break;
        case 'C':
            resetNumbersAndOperation();
            resultElement[0].innerText = '';
            showInfo(); /*remove it*/
            break;
        case '=':
            if (currentFirstNumber !== '' && currentOperation !== '') {
                currentSecondNumber = Number(resultElement[0].innerText);
                switch (currentOperation) {
                    case '+':
                        resultElement[0].innerText = currentFirstNumber + currentSecondNumber;
                        resetNumbersAndOperation();
                        showInfo(); /*remove it*/
                        break;
                    case '-':
                        resultElement[0].innerText = currentFirstNumber - currentSecondNumber;
                        resetNumbersAndOperation();
                        showInfo(); /*remove it*/
                        break;
                    case '*':
                        resultElement[0].innerText = currentFirstNumber * currentSecondNumber;
                        resetNumbersAndOperation();
                        showInfo(); /*remove it*/
                        break;
                    case ':':
                        if (Number(currentFirstNumber) !== 0 && Number(currentSecondNumber) !== 0) {
                            resultElement[0].innerText = currentFirstNumber / currentSecondNumber;
                            resetNumbersAndOperation();
                            showInfo(); /*remove it*/
                            break;
                        } else {
                            resetNumbersAndOperation();
                            resultElement[0].innerText = '';
                            showInfo(); /*remove it*/
                            console.log('Do not use 0 in division'); /*remove it*/
                            break;
                        };                        
                    default:
                        break;
                };
            };
        default:
            break;
    };
};

function calcButtonTwoListener(event) {
    var elementInEvent = event.currentTarget;
    var operation = elementInEvent.innerHTML;
    calculateSomething(operation);
};


for (var i = 0; i < calcButtonTwoElements.length; i++) {
    calcButtonTwoElements[i].addEventListener('click', calcButtonTwoListener);
};

/*--------------------------------------------------------------------------------*/

var currentFirstNumberIsClass = 'first-number-is'; /*remove it*/
var currentOperationIsClass = 'current-operation-is'; /*remove it*/
var currentSecondNumberIsClass = 'second-number-is'; /*remove it*/

var currentFirstNumberIsElement = document.getElementsByClassName(currentFirstNumberIsClass); /*remove it*/
var currentOperationIsElement = document.getElementsByClassName(currentOperationIsClass); /*remove it*/
var currentSecondNumberIsElement = document.getElementsByClassName(currentSecondNumberIsClass); /*remove it*/

function showInfo() { /*remove it*/
    currentFirstNumberIsElement[0].innerHTML = currentFirstNumber; /*remove it*/
    currentSecondNumberIsElement[0].innerHTML = currentSecondNumber; /*remove it*/
    currentOperationIsElement[0].innerHTML = currentOperation; /*remove it*/
}; /*remove it*/