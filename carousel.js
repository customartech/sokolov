// Flowbite Carousel Implementation
document.addEventListener('DOMContentLoaded', function() {
    const carouselElement = document.getElementById('default-carousel');

    const items = [
        {
            position: 0,
            el: document.querySelector('[data-carousel-item="0"]'),
        },
        {
            position: 1,
            el: document.querySelector('[data-carousel-item="1"]'),
        },
        {
            position: 2,
            el: document.querySelector('[data-carousel-item="2"]'),
        },
        {
            position: 3,
            el: document.querySelector('[data-carousel-item="3"]'),
        },
        {
            position: 4,
            el: document.querySelector('[data-carousel-item="4"]'),
        },
    ];

    // options with default values
    const options = {
        defaultPosition: 0,
        interval: 3000,

        indicators: {
            activeClasses: 'bg-white dark:bg-gray-800',
            inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
            items: [
                {
                    position: 0,
                    el: document.querySelector('[data-carousel-slide-to="0"]'),
                },
                {
                    position: 1,
                    el: document.querySelector('[data-carousel-slide-to="1"]'),
                },
                {
                    position: 2,
                    el: document.querySelector('[data-carousel-slide-to="2"]'),
                },
                {
                    position: 3,
                    el: document.querySelector('[data-carousel-slide-to="3"]'),
                },
                {
                    position: 4,
                    el: document.querySelector('[data-carousel-slide-to="4"]'),
                },
            ],
        },

        // callback functions
        onNext: () => {
            console.log('next slider item is shown');
        },
        onPrev: () => {
            console.log('previous slider item is shown');
        },
        onChange: () => {
            console.log('new slider item has been shown');
        },
    };

    // instance options object
    const instanceOptions = {
        id: 'default-carousel',
        override: true
    };

    // Simple carousel implementation
    let currentPosition = options.defaultPosition;
    let intervalId = null;
    let isPaused = false;

    function showItem(position) {
        // Hide all items
        items.forEach(item => {
            item.el.classList.add('hidden');
        });

        // Show current item
        items[position].el.classList.remove('hidden');

        // Update indicators
        options.indicators.items.forEach((indicator, index) => {
            if (index === position) {
                indicator.el.classList.add(...options.indicators.activeClasses.split(' '));
                indicator.el.classList.remove(...options.indicators.inactiveClasses.split(' '));
            } else {
                indicator.el.classList.remove(...options.indicators.activeClasses.split(' '));
                indicator.el.classList.add(...options.indicators.inactiveClasses.split(' '));
            }
        });

        currentPosition = position;
        options.onChange();
    }

    function nextItem() {
        const nextPosition = (currentPosition + 1) % items.length;
        showItem(nextPosition);
        options.onNext();
    }

    function prevItem() {
        const prevPosition = currentPosition === 0 ? items.length - 1 : currentPosition - 1;
        showItem(prevPosition);
        options.onPrev();
    }

    function startInterval() {
        if (intervalId) clearInterval(intervalId);
        if (!isPaused) {
            intervalId = setInterval(nextItem, options.interval);
        }
    }

    function stopInterval() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    // Initialize carousel
    showItem(currentPosition);

    // Start autoplay
    startInterval();

    // Previous button
    const prevButton = document.querySelector('[data-carousel-prev]');
    if (prevButton) {
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Prev button clicked');
            stopInterval();
            prevItem();
            startInterval();
        });
    } else {
        console.log('Prev button not found');
    }

    // Next button
    const nextButton = document.querySelector('[data-carousel-next]');
    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Next button clicked');
            stopInterval();
            nextItem();
            startInterval();
        });
    } else {
        console.log('Next button not found');
    }

    // Indicator buttons
    options.indicators.items.forEach((indicator, index) => {
        if (indicator.el) {
            indicator.el.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Indicator clicked:', index);
                stopInterval();
                showItem(index);
                startInterval();
            });
        }
    });

    // Pause on hover
    const carouselContainer = document.getElementById('default-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            isPaused = true;
            stopInterval();
        });

        carouselContainer.addEventListener('mouseleave', () => {
            isPaused = false;
            startInterval();
        });
    }

    // Categories Carousel
    const categoriesTrack = document.getElementById('categories-track');
    const categoriesPrev = document.getElementById('categories-prev');
    const categoriesNext = document.getElementById('categories-next');

    if (categoriesTrack && categoriesPrev && categoriesNext) {
        const scrollAmount = 200; // Scroll by 200px

        categoriesPrev.addEventListener('click', () => {
            categoriesTrack.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        categoriesNext.addEventListener('click', () => {
            categoriesTrack.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // Product Card Image Carousel
    const productCards = document.querySelectorAll('[data-product-card]');
    productCards.forEach(card => {
        const imageWrapper = card.querySelector('.rounded-2xl.overflow-hidden.mb-3');
        const imagesContainer = card.querySelector('[data-product-images]');
        const dots = card.querySelectorAll('[data-dot]');
        const totalSlides = dots.length;
        let currentIndex = 0;

        function goToSlide(index) {
            if (index < 0 || index >= totalSlides || index === currentIndex) return;
            currentIndex = index;
            imagesContainer.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-gray-800', i === index);
                dot.classList.toggle('bg-gray-300', i !== index);
            });
        }

        // Mouse move on image - position determines which slide
        imageWrapper.addEventListener('mousemove', (e) => {
            const rect = imageWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = x / rect.width;
            const slideIndex = Math.min(Math.floor(percent * totalSlides), totalSlides - 1);
            goToSlide(slideIndex);
        });

        // Reset to first slide on mouse leave
        imageWrapper.addEventListener('mouseleave', () => {
            goToSlide(0);
        });

        // Dots click
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(parseInt(dot.dataset.dot));
            });
        });

        // Touch swipe
        let startX = 0;
        imageWrapper.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
        imageWrapper.addEventListener('touchend', (e) => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex < totalSlides - 1) goToSlide(currentIndex + 1);
                else if (diff < 0 && currentIndex > 0) goToSlide(currentIndex - 1);
            }
        });
    });

    // Yenilikler Section Carousel (4 cards at a time)
    const yeniliklerTrack = document.getElementById('yenilikler-track');
    const yeniliklerNext = document.getElementById('yenilikler-next');
    const yeniliklerPrev = document.getElementById('yenilikler-prev');

    if (yeniliklerTrack && yeniliklerNext && yeniliklerPrev) {
        let yeniliklerPage = 0;
        const cardsPerPage = window.innerWidth >= 768 ? 4 : 2;
        const totalCards = yeniliklerTrack.children.length;
        const totalPages = Math.ceil(totalCards / cardsPerPage) - 1;

        function updateYenilikler() {
            const slidePercent = (yeniliklerPage * cardsPerPage / totalCards) * 100;
            yeniliklerTrack.style.transform = `translateX(-${slidePercent}%)`;
            yeniliklerPrev.classList.toggle('hidden', yeniliklerPage === 0);
            yeniliklerNext.classList.toggle('hidden', yeniliklerPage >= totalPages);
        }

        yeniliklerNext.addEventListener('click', () => {
            if (yeniliklerPage < totalPages) {
                yeniliklerPage++;
                updateYenilikler();
            }
        });

        yeniliklerPrev.addEventListener('click', () => {
            if (yeniliklerPage > 0) {
                yeniliklerPage--;
                updateYenilikler();
            }
        });

        updateYenilikler();
    }

    // Populyar Mehsullar Section Carousel
    const populyarTrack = document.getElementById('populyar-track');
    const populyarNext = document.getElementById('populyar-next');
    const populyarPrev = document.getElementById('populyar-prev');

    if (populyarTrack && populyarNext && populyarPrev) {
        let populyarPage = 0;
        const populyarCardsPerPage = window.innerWidth >= 768 ? 4 : 2;
        const populyarTotalCards = populyarTrack.children.length;
        const populyarTotalPages = Math.ceil(populyarTotalCards / populyarCardsPerPage) - 1;

        function updatePopulyar() {
            const slidePercent = (populyarPage * populyarCardsPerPage / populyarTotalCards) * 100;
            populyarTrack.style.transform = `translateX(-${slidePercent}%)`;
            populyarPrev.classList.toggle('hidden', populyarPage === 0);
            populyarNext.classList.toggle('hidden', populyarPage >= populyarTotalPages);
        }

        populyarNext.addEventListener('click', () => {
            if (populyarPage < populyarTotalPages) {
                populyarPage++;
                updatePopulyar();
            }
        });

        populyarPrev.addEventListener('click', () => {
            if (populyarPage > 0) {
                populyarPage--;
                updatePopulyar();
            }
        });

        updatePopulyar();
    }

    // Kolleksiyalar Section Carousel (5 cards on desktop, 2 on mobile)
    const kolleksiyaTrack = document.getElementById('kolleksiya-track');
    const kolleksiyaNext = document.getElementById('kolleksiya-next');
    const kolleksiyaPrev = document.getElementById('kolleksiya-prev');

    if (kolleksiyaTrack && kolleksiyaNext && kolleksiyaPrev) {
        let kolleksiyaPage = 0;
        const kolleksiyaCardsPerPage = window.innerWidth >= 768 ? 5 : 2;
        const kolleksiyaTotalCards = kolleksiyaTrack.children.length;
        const kolleksiyaTotalPages = Math.ceil(kolleksiyaTotalCards / kolleksiyaCardsPerPage) - 1;

        function updateKolleksiya() {
            const slidePercent = (kolleksiyaPage * kolleksiyaCardsPerPage / kolleksiyaTotalCards) * 100;
            kolleksiyaTrack.style.transform = `translateX(-${slidePercent}%)`;
            kolleksiyaPrev.classList.toggle('hidden', kolleksiyaPage === 0);
            kolleksiyaNext.classList.toggle('hidden', kolleksiyaPage >= kolleksiyaTotalPages);
        }

        kolleksiyaNext.addEventListener('click', () => {
            if (kolleksiyaPage < kolleksiyaTotalPages) {
                kolleksiyaPage++;
                updateKolleksiya();
            }
        });

        kolleksiyaPrev.addEventListener('click', () => {
            if (kolleksiyaPage > 0) {
                kolleksiyaPage--;
                updateKolleksiya();
            }
        });

        updateKolleksiya();
    }

    // Language Selector
    const langSelector = document.getElementById('lang-selector');
    const langDropdown = document.getElementById('lang-dropdown');
    const langCurrent = document.getElementById('lang-current');

    if (langSelector && langDropdown && langCurrent) {
        langSelector.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('hidden');
        });

        langDropdown.querySelectorAll('[data-lang]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                langCurrent.textContent = item.dataset.lang;
                langDropdown.classList.add('hidden');
            });
        });

        document.addEventListener('click', () => {
            langDropdown.classList.add('hidden');
        });
    }
});
