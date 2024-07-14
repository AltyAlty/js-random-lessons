class Page2Component {
    constructor(elementID) {
        this._element = document.querySelector('#' + elementID);
        this.value = 0;
    }

    /*Добавили состояние для второй страницы в виде "value". Это значение можно будет увеличивать, причем при
    переключении страниц, оно будет сохраняться.*/
    render() {
        this._element.innerHTML = `
        This is Page Two

        <div class='counter-value'>
            ${this.value}
        </div>

        <div>
            <button class='increment'>Increase</button>
        </div>`;

        this._element.querySelector('.increment').addEventListener('click', () => {
            this.value++;
            this._element.querySelector('.counter-value').innerHTML = this.value;
        });
    }
};