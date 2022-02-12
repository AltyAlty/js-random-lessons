class MenuComponent {
    constructor(elementID) {
        this._element = document.querySelector('#' + elementID);        
    }

    render() {
        this._element.innerHTML = `
        <ul>
            <li><a href='#page1' class='menu-item'>Page One</a></li>
            <li><a href='#page2' class='menu-item'>Page Two</a></li>
        </ul>`;
    }
};