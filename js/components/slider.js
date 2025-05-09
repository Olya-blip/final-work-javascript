const list = document.querySelector('.day-products__list');
const dayProducts = document.querySelector('.day-products');

export function filterProducts(products) {
    return products.filter(product => product.goodsOfDay);
}

function createProductCard(product) {
    return `
        <div class="product-card product-card--small">
            <div class="product-card__visual">
                <img class="product-card__img" src="${product.image}" height="344" width="290" alt="${product.name}">
                <div class="product-card__more">
                    <a href="#" class="product-card__link btn btn--icon">
                        <span class="btn__text">В корзину</span>
                        <svg width="24" height="24" aria-hidden="true">
                            <use xlink:href="images/sprite.svg#icon-basket"></use>
                        </svg>
                    </a>
                    <a href="#" class="product-card__link btn btn--secondary">
                        <span class="btn__text">Подробнее</span>
                    </a>
                </div>
            </div>
            <div class="product-card__info">
                <h2 class="product-card__title">${product.name}</h2>
                <span class="product-card__old">
                    <span class="product-card__old-number">${product.price.old}</span>
                    <span class="product-card__old-add">₽</span>
                </span>
                <span class="product-card__price">
                    <span class="product-card__price-number">${product.price.new}</span>
                    <span class="product-card__price-add">₽</span>
                </span>
                <div class="product-card__tooltip tooltip">
                    <button class="tooltip__btn" aria-label="Показать подсказку">
                        <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                            <use xlink:href="images/sprite.svg#icon-i"></use>
                        </svg>
                    </button>
                    <div class="tooltip__content">
                        <span class="tooltip__text">Наличие товара по городам:</span>
                        <ul class="tooltip__list">
                            ${Object.entries(product.availability).map(([city, count]) => `
                                <li class="tooltip__item">
                                    <span class="tooltiptext">${city.charAt(0).toUpperCase() + city.slice(1)}: <span class="tooltipcount">${count}</span></span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createSlides(products) {
    if (!products.length) {
        dayProducts.remove();
        return;
    }

    list.innerHTML = ''; // Очищаем список перед добавлением новых товаров
    products.forEach(product => {
        const slide = document.createElement('li');
        slide.classList.add('day-products__item', 'swiper-slide');
        slide.innerHTML = createProductCard(product);
        list.appendChild(slide);
    });
}

export async function initSlider(products) {
    try {
        const productsOfDay = filterProducts(products);
        createSlides(productsOfDay);
        initSwiper();
    } catch (error) {
        console.error('Ошибка при инициализации:', error);
    }
}

function initSwiper() {
    return new window.Swiper('.day-products__slider', {
        navigation: {
            nextEl: '.day-products__navigation-btn--next',
            prevEl: '.day-products__navigation-btn--prev',
        },
        spaceBetween: 20,
        slidesPerView: 4,
    });
}