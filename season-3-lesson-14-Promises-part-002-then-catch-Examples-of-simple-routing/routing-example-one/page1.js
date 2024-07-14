class Page1Component {
    constructor(elementID) {
        this._element = document.querySelector('#' + elementID);
    }

    render() {
        this._element.innerHTML = `This is Page One`;
    }
};