class MenuComponent {
    constructor(elementID, showPageCallback) {
        this._element = document.querySelector('#' + elementID);
        this._showPage = showPageCallback;
    }

    render() {
        this._element.innerHTML = `
        <ul>
            <li><a href='page1' class='menu-item'>Page One</a></li>
            <li><a href='page2' class='menu-item'>Page Two</a></li>
        </ul>`;

        this._addEventListeners()
    }

    _addEventListeners() {
        let menuItems = this._element.querySelectorAll('.menu-item');

        menuItems.forEach((item) => item.addEventListener('click', (e) => {
            e.preventDefault(); // Отключаем станадартное поведение HTML-элемента "a", когда происходит изменение адреса.
            this._showPage(e.currentTarget.getAttribute('href'));
        }));
    }
};