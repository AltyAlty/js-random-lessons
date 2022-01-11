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
    var valueToEnter = elementInEvent.value;
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
    showInfo(); 
};

function calcButtonOneListener(event) {
    var elementInEvent = event.currentTarget;
    var operation = elementInEvent.value;
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
            showInfo();
            break;
        case '=':
            if (currentFirstNumber !== '' && currentOperation !== '') {
                currentSecondNumber = Number(resultElement[0].innerText);
                switch (currentOperation) {
                    case '+':
                        resultElement[0].innerText = currentFirstNumber + currentSecondNumber;
                        resetNumbersAndOperation();
                        showInfo();
                        break;
                    case '-':
                        resultElement[0].innerText = currentFirstNumber - currentSecondNumber;
                        resetNumbersAndOperation();
                        showInfo();
                        break;
                    case '*':
                        resultElement[0].innerText = currentFirstNumber * currentSecondNumber;
                        resetNumbersAndOperation();
                        showInfo();
                        break;
                    case ':':
                        if (Number(currentFirstNumber) !== 0 && Number(currentSecondNumber) !== 0) {
                            resultElement[0].innerText = currentFirstNumber / currentSecondNumber;
                            resetNumbersAndOperation();
                            showInfo();
                            break;
                        } else {
                            resetNumbersAndOperation();
                            resultElement[0].innerText = '';
                            showInfo();
                            console.log('Do not use 0 in division');
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
    var operation = elementInEvent.value;
    calculateSomething(operation);
};


for (var i = 0; i < calcButtonTwoElements.length; i++) {
    calcButtonTwoElements[i].addEventListener('click', calcButtonTwoListener);
};

/*--------------------------------------------------------------------------------*/

var currentFirstNumberIsClass = 'first-number-is';
var currentOperationIsClass = 'current-operation-is';
var currentSecondNumberIsClass = 'second-number-is';

var currentFirstNumberIsElement = document.getElementsByClassName(currentFirstNumberIsClass);
var currentOperationIsElement = document.getElementsByClassName(currentOperationIsClass);
var currentSecondNumberIsElement = document.getElementsByClassName(currentSecondNumberIsClass);

function showInfo() {
    currentFirstNumberIsElement[0].innerHTML = currentFirstNumber;
    currentSecondNumberIsElement[0].innerHTML = currentSecondNumber;
    currentOperationIsElement[0].innerHTML = currentOperation;
};