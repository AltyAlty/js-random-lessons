/*#1*/

document.addEventListener('blur', function (event) {
    // Validate the field
    const isValid = event.target.validity.valid;
    const message = event.target.validationMessage;
    const connectedValidationId = event.target.getAttribute('aria-describedby');
    const connectedValidation = connectedValidationId ? document.getElementById(connectedValidationId) : false;

    if (connectedValidation && message && !isValid) {
        connectedValidation.innerText = message;
    } else {
        connectedValidation.innerText = '';
    }
}, true);

/*--------------------------------------------------------------------------------------------------------------------------------------------*/