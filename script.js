// --- SIMPLE CAROUSEL ---
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    function goToSlide(slideIndex) {
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        if (slideIndex >= totalSlides) slideIndex = 0;
        
        currentSlide = slideIndex;
        // Each slide is 90% + 10% margins = 100% total
        // To center the active slide in viewport, we need to offset by the slide width + left margin
        const slideWidth = 90;
        const leftMargin = 5;
        // Calculate offset to center the active slide in viewport
        const offset = -(slideIndex * (slideWidth + leftMargin * 2)) + 5; // Add 5vw to center
        track.style.transform = `translateX(${offset}vw)`;
        
        // Update active class and dots
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });
    
    // Pause on hover
    const container = document.querySelector('.carousel-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Initialize with first slide centered
    setTimeout(() => {
        goToSlide(0);
        startAutoPlay();
    }, 100);
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
let isMenuOpen = false;
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        // Simple visual toggle for demo
        menuBtn.innerHTML = isMenuOpen 
            ? '<i data-lucide="x" class="w-6 h-6"></i>' 
            : '<i data-lucide="menu" class="w-6 h-6"></i>';
        lucide.createIcons();
        if (isMenuOpen) {
            alert("Menyu açıldı (Demo)");
        }
    });
}

// Initialize Icons
lucide.createIcons();
