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
});
