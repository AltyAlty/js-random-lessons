'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

let inputsValues = {};

function getInputOneValue() {
    const inputOne = document.getElementsByClassName('input-one')[0];
    const value = inputOne.value;
    return value;
};

function getInputTwoValue() {
    // const inputTwo = document.getElementsByClassName('input-two');
    const inputTwo = document.getElementsByClassName('input-two')[0];
    const value = inputTwo.value;
    return value;
};

function getInputThreeValue() {
    const inputThree = document.getElementsByClassName('input-three')[0];
    const value = inputThree.value;
    return value;
};

function groupInputsValues(inputOneValue, inputTwoValue, inputThreeValue) {
    inputsValues = {
        // inputOneValue: undefined,
        inputOneValue,
        inputTwoValue,
        inputThreeValue,
        info: { status: 'original' }
    };

    return inputsValues;
};

function formatInputsValues(inputsValues) {
    console.log(inputsValues);

    for (const key in inputsValues) {
        if (key !== 'info') {
            inputsValues[key] = key + ': ' + inputsValues[key];
        };
    };

    inputsValues.info.status = 'formatted';
    console.log(inputsValues);

    return inputsValues;
};

function showOutputOne(inputOneValue) {
    const outputOne = document.getElementsByClassName('output-one')[0];
    // outputOne.innerHTML = null;
    outputOne.innerHTML = inputOneValue;
};

function showOutputTwo(inputTwoValue) {
    const outputTwo = document.getElementsByClassName('output-two')[0];
    outputTwo.innerHTML = inputTwoValue;
};

function showOutputThree(inputThreeValue) {
    // const outputThree = document.getElementsByClassName('output-three');
    const outputThree = document.getElementsByClassName('output-three')[0];
    outputThree.innerHTML = inputThreeValue;
};

function showOutputs() {
    const inputOneValue = getInputOneValue();
    const inputTwoValue = getInputTwoValue();
    const inputThreeValue = getInputThreeValue();
    const inputsValues = groupInputsValues(inputOneValue, inputTwoValue, inputThreeValue);
    const formattedInputsValues = formatInputsValues(inputsValues);
    // debugger;
    showOutputOne(formattedInputsValues.inputOneValue);
    showOutputTwo(formattedInputsValues.inputTwoValue);
    showOutputThree(formattedInputsValues.inputThreeValue);
};