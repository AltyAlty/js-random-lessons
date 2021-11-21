/*Конструктор, который позволяет создавать UI виджетов рейтинга.*/
function RatingUI() {
    var that = this;

    /*Создаем BLL уровень виджета рейтинга.*/
    this._ratingBLL = new RatingBLL();

    /*Метод, который отрисовывает виджет рейтинга на странице. В качестве
    параметра принимает класс HTML-элемента, в котором необходимо
    отрисовать виджет рейтинга.*/
    this.render = function (HTMLElementClass) {
        /*Находим HTML-элемент, в котором необходимо отрисовать виджет рейтинга.*/
        this._element = document.querySelector(HTMLElementClass);

        /*Добавляем HTML-разметку виджета рейтинга.*/
        this._element.innerHTML += `
            <div>Rate it:
                <div class='stars js-stars'>
                    <img src='./src/star1.png' />
                    <img src='./src/star1.png' />
                    <img src='./src/star1.png' />
                    <img src='./src/star1.png' />
                    <img src='./src/star1.png' />
                </div>
            </div>
        `;

        /*Находим HTML-элементы, отображающий звездочки рейтинга.*/
        this._starsElements = document.querySelectorAll('.js-stars img');

        /*Востанавливаем из уровня BLL значение рейтинга. Берем значение рейтинга из
        уровня BLL и пробегаемся по каждому HTML-элементу, отображающему звездочку рейтинга,
        индекс которого меньший или равный значению рейтинга из уровня BLL, и для каждого
        такого HTML-элемента делаем звездочку активной.*/
        for (let i = 0; i <= this._ratingBLL.restoreRatingValue('rating-value'); i++) {
            let currentStar = this._starsElements[i];

            currentStar.classList.add('active');
        };

        /*Подписываем на событие "click" каждый HTML-элемент, отображающий звездочку рейтинга.*/
        this._starsElements.forEach((star, index) => {
            star.addEventListener('click', () => {
                /*Сохраняем индекс звездочки рейтинга, на которую кликнули,
                что будет также являться текущим значением рейтинга.*/
                let clickedStarIndex = index;

                /*Пробегаемся по всему массиву со звездочками рейтинга, и звездочки, имеющие 
                индекс меньший или равный индексу звездочки рейтинга, на которую кликнули,
                делаем активными, а остальные звездочки неактивными.*/
                for (let i = 0; i < that._starsElements.length; i++) {
                    that._starsElements[i].classList[i <= clickedStarIndex ? 'add' : 'remove']('active');
                };

                /*Сохраняем на уровень BLL текущее значение рейтинга.*/
                that._ratingBLL.setRatingValue('rating-value', clickedStarIndex);
            });
        });        
    };
};