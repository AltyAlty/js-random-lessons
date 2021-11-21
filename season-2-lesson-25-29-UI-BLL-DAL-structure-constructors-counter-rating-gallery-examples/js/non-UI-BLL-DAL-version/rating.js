let starsElements = findStarsElements();

bindStarsToClickEvent(starsElements);

restoreRatingValueFromLocalStorage(starsElements);

/*--------------------------------------------------------------------------------*/

function findStarsElements() {
    let stars = document.querySelectorAll('.js-stars img');
    return stars;
};

function bindStarsToClickEvent(stars) {
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            let clickedStarIndex = index;

            for (let i = 0; i < stars.length; i++) {
                stars[i].classList[i <= clickedStarIndex ? 'add' : 'remove']('active');
            };

            localStorage.setItem('rating-value', clickedStarIndex);
        });
    });
};

function restoreRatingValueFromLocalStorage(stars) {
    let ratingValueFromLocalStorage = localStorage.getItem('rating-value') - 0 || 0;    

    for (let i = 0; i <= ratingValueFromLocalStorage; i++) {
        let currentStar = stars[i];

        currentStar.classList.add('active');        
    };
};