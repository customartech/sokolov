// ============================================
// SOKOLOV - Main JavaScript File
// ============================================

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// ============================================
// KATALOQ MENU TOGGLE - SIMPLIFIED
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const kataloqBtn = document.getElementById('kataloq-btn');
    const kataloqMenu = document.getElementById('kataloq-menu');
    const kataloqIconMenu = document.getElementById('kataloq-icon-menu');
    const kataloqIconClose = document.getElementById('kataloq-icon-close');
    
    if (!kataloqBtn || !kataloqMenu) {
        console.error('Kataloq elements missing');
        return;
    }
    
    function toggleMenu() {
        const isHidden = kataloqMenu.classList.contains('hidden');
        
        if (isHidden) {
            kataloqMenu.classList.remove('hidden');
            kataloqMenu.style.cssText = 'display: block !important; position: fixed; top: 160px; left: 0; height:100vh; width: 100%; z-index: 9999;';
            if (kataloqIconMenu) kataloqIconMenu.classList.add('hidden');
            if (kataloqIconClose) kataloqIconClose.classList.remove('hidden');
        } else {
            kataloqMenu.classList.add('hidden');
            kataloqMenu.style.display = 'none';
            if (kataloqIconMenu) kataloqIconMenu.classList.remove('hidden');
            if (kataloqIconClose) kataloqIconClose.classList.add('hidden');
        }
    }
    
    // Multiple event binding for reliability
    kataloqBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
        return false;
    };
    
    // Also try addEventListener as backup
    kataloqBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Global click to close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!kataloqMenu.classList.contains('hidden')) {
            if (!kataloqMenu.contains(e.target) && !kataloqBtn.contains(e.target)) {
                kataloqMenu.classList.add('hidden');
                kataloqMenu.style.display = 'none';
                if (kataloqIconMenu) kataloqIconMenu.classList.remove('hidden');
                if (kataloqIconClose) kataloqIconClose.classList.add('hidden');
            }
        }
    });
    
    // Kataloq category switching
    const kataloqCats = document.querySelectorAll('.kataloq-cat');
    const kataloqPanels = document.querySelectorAll('.kataloq-panel');
    
    kataloqCats.forEach(cat => {
        cat.addEventListener('click', (e) => {
            e.preventDefault();
            const category = cat.getAttribute('data-category');
            
            kataloqCats.forEach(c => {
                c.classList.remove('bg-gray-100', 'text-gray-800');
                c.classList.add('text-gray-600');
            });
            cat.classList.add('bg-gray-100', 'text-gray-800');
            cat.classList.remove('text-gray-600');
            
            kataloqPanels.forEach(panel => {
                if (panel.getAttribute('data-panel') === category) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
        });
    });
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuBtn = document.getElementById('menu-btn');
let isMenuOpen = false;
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        menuBtn.innerHTML = isMenuOpen 
            ? '<i data-lucide="x" class="w-6 h-6"></i>' 
            : '<i data-lucide="menu" class="w-6 h-6"></i>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
        if (isMenuOpen) {
            alert("Menyu açıldı (Demo)");
        }
    });
}

// ============================================
// SIMPLE CAROUSEL (for index page)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const dots = document.querySelectorAll('.dot');
    
    if (!track || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    function goToSlide(slideIndex) {
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        if (slideIndex >= totalSlides) slideIndex = 0;
        
        currentSlide = slideIndex;
        const slideWidth = 90;
        const leftMargin = 5;
        const offset = -(slideIndex * (slideWidth + leftMargin * 2)) + 5;
        track.style.transform = `translateX(${offset}vw)`;
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }
    function startAutoPlay() { autoPlayInterval = setInterval(nextSlide, 5000); }
    function stopAutoPlay() { clearInterval(autoPlayInterval); }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { stopAutoPlay(); goToSlide(index); startAutoPlay(); });
    });
    
    const container = document.querySelector('.carousel-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
    }
    
    setTimeout(() => { goToSlide(0); startAutoPlay(); }, 100);
});

// ============================================
// PRODUCT DETAIL PAGE - Thumbnail Click
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('main-image');
    const thumbs = document.querySelectorAll('[data-thumb]');
    
    if (!mainImage || thumbs.length === 0) return;
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imageUrl = thumb.getAttribute('data-image');
            mainImage.src = imageUrl;
            thumbs.forEach(t => {
                t.classList.remove('border-blue-500');
                t.classList.add('border-transparent');
            });
            thumb.classList.remove('border-transparent');
            thumb.classList.add('border-blue-500');
        });
    });
});

// ============================================
// ADD TO CART - Detail Page
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const cartBadge = document.getElementById('cart-badge');
    
    if (!addToCartBtn) return;
    
    let cartCount = parseInt(cartBadge?.textContent || '0');
    
    addToCartBtn.addEventListener('click', () => {
        const isInCart = addToCartBtn.classList.contains('bg-green-500');
        if (isInCart) {
            addToCartBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            addToCartBtn.classList.add('bg-orange-500', 'hover:bg-orange-600');
            addToCartBtn.textContent = 'Səbətə at';
            cartCount--;
        } else {
            addToCartBtn.classList.remove('bg-orange-500', 'hover:bg-orange-600');
            addToCartBtn.classList.add('bg-green-500', 'hover:bg-green-600');
            addToCartBtn.textContent = 'Səbətdədir ✓';
            cartCount++;
        }
        if (cartBadge) {
            if (cartCount > 0) {
                cartBadge.textContent = cartCount;
                cartBadge.classList.remove('hidden');
                cartBadge.classList.add('flex');
            } else {
                cartBadge.classList.add('hidden');
                cartBadge.classList.remove('flex');
            }
        }
    });
});

// ============================================
// FAVORITE BUTTON - Detail Page Sidebar
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const sidebarFavBtn = document.getElementById('sidebar-fav-btn');
    const favBadge = document.getElementById('fav-badge');
    
    if (!sidebarFavBtn) return;
    
    let favCount = parseInt(favBadge?.textContent || '0');
    
    sidebarFavBtn.addEventListener('click', () => {
        const svg = sidebarFavBtn.querySelector('svg');
        if (!svg) return;
        const isFav = svg.getAttribute('fill') === 'red';
        if (isFav) {
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.classList.remove('text-red-500');
            svg.classList.add('text-gray-400');
            favCount--;
        } else {
            svg.setAttribute('fill', 'red');
            svg.setAttribute('stroke', 'red');
            svg.classList.add('text-red-500');
            svg.classList.remove('text-gray-400');
            favCount++;
        }
        if (favBadge) {
            if (favCount > 0) {
                favBadge.textContent = favCount;
                favBadge.classList.remove('hidden');
                favBadge.classList.add('flex');
            } else {
                favBadge.classList.add('hidden');
                favBadge.classList.remove('flex');
            }
        }
    });
});

// ============================================
// PRODUCT CARDS - Favorite & Cart Toggles
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const favBadge = document.getElementById('fav-badge');
    const cartBadge = document.getElementById('cart-badge');
    let favCount = parseInt(favBadge?.textContent || '0');
    let cartCount = parseInt(cartBadge?.textContent || '0');
    
    // Use event delegation for favorite buttons (works with carousels)
    document.addEventListener('click', function(e) {
        // Find the closest favorite button
        const heartBtn = e.target.closest('[data-product-card] > button:first-of-type');
        if (!heartBtn) return;
        
        e.stopPropagation();
        e.preventDefault();
        
        const card = heartBtn.closest('[data-product-card]');
        if (!card) return;
        
        const svg = heartBtn.querySelector('svg');
        if (!svg) return;
        
        // Check if currently favorited
        const currentFill = svg.getAttribute('fill');
        const isFav = currentFill === 'red' || currentFill === '#ef4444';
        
        if (isFav) {
            // Remove from favorites
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.style.fill = 'none';
            svg.style.stroke = 'currentColor';
            svg.classList.remove('text-red-500', 'fill-red-500');
            svg.classList.add('text-gray-400');
            heartBtn.classList.remove('text-red-500');
            heartBtn.classList.add('text-gray-400');
            favCount = Math.max(0, favCount - 1);
        } else {
            // Add to favorites
            svg.setAttribute('fill', 'red');
            svg.setAttribute('stroke', 'red');
            svg.style.fill = 'red';
            svg.style.stroke = 'red';
            svg.classList.add('text-red-500', 'fill-red-500');
            svg.classList.remove('text-gray-400');
            heartBtn.classList.add('text-red-500');
            heartBtn.classList.remove('text-gray-400');
            favCount++;
        }
        
        // Update badge
        if (favBadge) {
            favBadge.textContent = favCount;
            if (favCount > 0) {
                favBadge.classList.remove('hidden');
                favBadge.classList.add('flex');
                favBadge.style.display = 'flex';
            } else {
                favBadge.classList.add('hidden');
                favBadge.classList.remove('flex');
                favBadge.style.display = 'none';
            }
        }
    });
    
    // Cart button handling
    document.addEventListener('click', function(e) {
        const cartBtn = e.target.closest('[data-product-card] button');
        if (!cartBtn) return;
        if (cartBtn.textContent.trim() !== 'Səbətə at') return;
        
        e.stopPropagation();
        e.preventDefault();
        
        const isInCart = cartBtn.classList.contains('bg-green-500');
        if (isInCart) {
            cartBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            cartBtn.classList.add('bg-blue-500', 'hover:bg-blue-600');
            cartBtn.textContent = 'Səbətə at';
            cartCount = Math.max(0, cartCount - 1);
        } else {
            cartBtn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
            cartBtn.classList.add('bg-green-500', 'hover:bg-green-600');
            cartBtn.textContent = 'Səbətdədir ✓';
            cartCount++;
        }
        
        if (cartBadge) {
            cartBadge.textContent = cartCount;
            if (cartCount > 0) {
                cartBadge.classList.remove('hidden');
                cartBadge.classList.add('flex');
                cartBadge.style.display = 'flex';
            } else {
                cartBadge.classList.add('hidden');
                cartBadge.classList.remove('flex');
                cartBadge.style.display = 'none';
            }
        }
    });
});

// ============================================
// PRODUCT CARDS - Image Swipe (Dots + Touch)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-product-card]').forEach(card => {
        const imagesContainer = card.querySelector('[data-product-images]');
        const dots = card.querySelectorAll('[data-dot]');
        if (!imagesContainer || dots.length === 0) return;
        
        let currentIndex = 0;
        const totalImages = imagesContainer.querySelectorAll('img').length;
        
        function goToSlide(index) {
            currentIndex = index;
            imagesContainer.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-gray-800', i === index);
                dot.classList.toggle('bg-gray-300', i !== index);
            });
        }
        
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(parseInt(dot.getAttribute('data-dot')));
            });
        });
        
        const imageWrapper = imagesContainer.parentElement;
        if (imageWrapper) {
            imageWrapper.addEventListener('mousemove', (e) => {
                const rect = imageWrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = x / rect.width;
                const newIndex = Math.min(Math.floor(percent * totalImages), totalImages - 1);
                if (newIndex !== currentIndex) goToSlide(newIndex);
            });
            
            imageWrapper.addEventListener('mouseleave', () => goToSlide(0));
        }
        
        let startX = 0;
        imagesContainer.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
        imagesContainer.addEventListener('touchend', (e) => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                if (diff > 0 && currentIndex < totalImages - 1) goToSlide(currentIndex + 1);
                else if (diff < 0 && currentIndex > 0) goToSlide(currentIndex - 1);
            }
        });
    });
});

// ============================================
// PRODUCTS PAGE - Filter Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-filter-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.parentElement.querySelector('[data-filter-content]');
            const icon = btn.querySelector('i');
            if (content) {
                content.classList.toggle('hidden');
                if (icon) icon.style.transform = content.classList.contains('hidden') ? 'rotate(-90deg)' : '';
            }
        });
    });
});

// ============================================
// PRODUCTS PAGE - Grid View Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('product-grid');
    const grid4Btn = document.getElementById('grid-4');
    const grid2Btn = document.getElementById('grid-2');
    
    if (!grid || !grid4Btn || !grid2Btn) return;
    
    grid4Btn.addEventListener('click', () => {
        grid.classList.remove('lg:grid-cols-2');
        grid.classList.add('lg:grid-cols-4');
        grid4Btn.classList.add('bg-gray-100');
        const icon = grid4Btn.querySelector('i');
        if (icon) icon.classList.replace('text-gray-400', 'text-gray-700');
        grid2Btn.classList.remove('bg-gray-100');
        const icon2 = grid2Btn.querySelector('i');
        if (icon2) icon2.classList.replace('text-gray-700', 'text-gray-400');
    });
    
    grid2Btn.addEventListener('click', () => {
        grid.classList.remove('lg:grid-cols-4');
        grid.classList.add('lg:grid-cols-2');
        grid2Btn.classList.add('bg-gray-100');
        const icon = grid2Btn.querySelector('i');
        if (icon) icon.classList.replace('text-gray-400', 'text-gray-700');
        grid4Btn.classList.remove('bg-gray-100');
        const icon2 = grid4Btn.querySelector('i');
        if (icon2) icon2.classList.replace('text-gray-700', 'text-gray-400');
    });
});

// ============================================
// CART PAGE - Quantity Controls & Remove
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    function formatPrice(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₼';
    }
    
    function updateSummary() {
        const items = document.querySelectorAll('[data-cart-item]');
        const summaryCount = document.getElementById('summary-count');
        const summarySubtotal = document.getElementById('summary-subtotal');
        const summaryTotal = document.getElementById('summary-total');
        const cartCountTitle = document.getElementById('cart-count-title');
        const cartItems = document.getElementById('cart-items');
        const emptyCart = document.getElementById('empty-cart');
        
        let totalItems = 0;
        let totalPrice = 0;
        
        items.forEach(item => {
            const qtyEl = item.querySelector('[data-qty-value]');
            const qty = qtyEl ? parseInt(qtyEl.textContent) : 1;
            const price = parseInt(item.getAttribute('data-price')) || 0;
            totalItems += qty;
            totalPrice += price * qty;
        });
        
        if (summaryCount) summaryCount.textContent = totalItems;
        if (summarySubtotal) summarySubtotal.textContent = formatPrice(totalPrice);
        if (summaryTotal) summaryTotal.textContent = formatPrice(totalPrice);
        if (cartCountTitle) cartCountTitle.textContent = '(' + totalItems + ' məhsul)';
        
        if (items.length === 0) {
            if (cartItems) cartItems.parentElement.classList.add('hidden');
            if (emptyCart) emptyCart.classList.remove('hidden');
        }
    }
    
    // Quantity controls
    document.querySelectorAll('[data-cart-item]').forEach(item => {
        const minusBtn = item.querySelector('[data-qty-minus]');
        const plusBtn = item.querySelector('[data-qty-plus]');
        const qtyEl = item.querySelector('[data-qty-value]');
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyEl?.textContent || '1');
                if (qty > 1 && qtyEl) {
                    qtyEl.textContent = qty - 1;
                    updateSummary();
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyEl?.textContent || '1');
                if (qtyEl) {
                    qtyEl.textContent = qty + 1;
                    updateSummary();
                }
            });
        }
    });
    
    // Remove item
    document.querySelectorAll('[data-remove-item]').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('[data-cart-item]');
            if (item) {
                item.style.transition = 'opacity 0.3s, transform 0.3s';
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    item.remove();
                    updateSummary();
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }, 300);
            }
        });
    });
    
    // Promo code
    const promoBtn = document.getElementById('promo-btn');
    const promoInput = document.getElementById('promo-input');
    const promoMessage = document.getElementById('promo-message');
    
    if (promoBtn) {
        promoBtn.addEventListener('click', () => {
            if (promoInput && promoMessage) {
                if (promoInput.value.trim()) {
                    promoMessage.textContent = 'Promo kod tətbiq edildi!';
                    promoMessage.classList.remove('hidden', 'text-red-500');
                    promoMessage.classList.add('text-green-600');
                } else {
                    promoMessage.textContent = 'Promo kodu daxil edin';
                    promoMessage.classList.remove('hidden', 'text-green-600');
                    promoMessage.classList.add('text-red-500');
                }
            }
        });
    }
});

// ============================================
// CHECKOUT PAGE - Delivery & Payment Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const deliveryCourier = document.getElementById('delivery-courier');
    const deliveryPickup = document.getElementById('delivery-pickup');
    const addressSection = document.getElementById('address-section');
    const pickupSection = document.getElementById('pickup-section');
    
    if (deliveryCourier && deliveryPickup) {
        function setDeliveryStyle(selected, other) {
            selected.classList.add('border-blue-600', 'bg-blue-50');
            selected.classList.remove('border-gray-200');
            other.classList.remove('border-blue-600', 'bg-blue-50');
            other.classList.add('border-gray-200');
        }
        
        deliveryCourier.addEventListener('change', () => {
            setDeliveryStyle(deliveryCourier, deliveryPickup);
            if (addressSection) addressSection.classList.remove('hidden');
            if (pickupSection) pickupSection.classList.add('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
        
        deliveryPickup.addEventListener('change', () => {
            setDeliveryStyle(deliveryPickup, deliveryCourier);
            if (addressSection) addressSection.classList.add('hidden');
            if (pickupSection) pickupSection.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }
    
    // Store selection
    const storeLabels = document.querySelectorAll('#pickup-section label');
    storeLabels.forEach(label => {
        const input = label.querySelector('input');
        if (input) {
            input.addEventListener('change', () => {
                storeLabels.forEach(l => {
                    l.classList.remove('border-blue-600', 'bg-blue-50');
                    l.classList.add('border-gray-200');
                });
                label.classList.add('border-blue-600', 'bg-blue-50');
                label.classList.remove('border-gray-200');
            });
        }
    });
    
    // Payment method toggle
    const payCard = document.getElementById('pay-card');
    const payCash = document.getElementById('pay-cash');
    const payInstallment = document.getElementById('pay-installment');
    const installmentOptions = document.getElementById('installment-options');
    const payLabels = [payCard, payCash, payInstallment].filter(Boolean);
    
    payLabels.forEach(label => {
        const input = label.querySelector('input');
        if (input) {
            input.addEventListener('change', () => {
                payLabels.forEach(l => {
                    l.classList.remove('border-blue-600', 'bg-blue-50');
                    l.classList.add('border-gray-200');
                });
                label.classList.add('border-blue-600', 'bg-blue-50');
                label.classList.remove('border-gray-200');
                
                if (installmentOptions) {
                    if (label.id === 'pay-installment') {
                        installmentOptions.classList.remove('hidden');
                    } else {
                        installmentOptions.classList.add('hidden');
                    }
                }
            });
        }
    });
    
    // Installment option selection
    const installmentLabels = document.querySelectorAll('.installment-option');
    installmentLabels.forEach(label => {
        const input = label.querySelector('input');
        if (input) {
            input.addEventListener('change', () => {
                installmentLabels.forEach(l => {
                    l.classList.remove('border-blue-600', 'bg-blue-50');
                    l.classList.add('border-gray-200');
                });
                label.classList.add('border-blue-600', 'bg-blue-50');
                label.classList.remove('border-gray-200');
            });
        }
    });
    
    // Submit order
    const checkoutForm = document.getElementById('checkout-form');
    const submitOrderBtn = document.getElementById('submit-order-btn');
    
    function submitOrder(e) {
        if (e) e.preventDefault();
        const checkoutFormSection = document.getElementById('checkout-form-section');
        const orderSuccess = document.getElementById('order-success');
        const step2 = document.getElementById('step-2');
        const step3 = document.getElementById('step-3');
        
        if (checkoutFormSection) checkoutFormSection.classList.add('hidden');
        if (orderSuccess) orderSuccess.classList.remove('hidden');
        
        if (step2) {
            step2.classList.remove('text-blue-600', 'font-bold');
            step2.classList.add('text-gray-400');
            const firstSpan = step2.querySelector('span:first-child');
            if (firstSpan) {
                firstSpan.classList.remove('bg-blue-600', 'text-white');
                firstSpan.classList.add('border-2', 'border-gray-300');
            }
        }
        
        if (step3) {
            step3.classList.remove('text-gray-400');
            step3.classList.add('text-green-600', 'font-bold');
            const firstSpan = step3.querySelector('span:first-child');
            if (firstSpan) {
                firstSpan.classList.remove('border-2', 'border-gray-300');
                firstSpan.classList.add('bg-green-600', 'text-white');
            }
        }
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', submitOrder);
    }
    
    if (submitOrderBtn) {
        submitOrderBtn.addEventListener('click', () => {
            if (checkoutForm) {
                if (checkoutForm.checkValidity()) {
                    submitOrder();
                } else {
                    checkoutForm.reportValidity();
                }
            }
        });
    }
});

// ============================================
// PROFILE PAGE - Tab Navigation
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const tabPanels = document.querySelectorAll('.tab-panel');
    if (tabPanels.length === 0) return;
    
    // Add data-tab attributes to menu items
    const menuLinks = document.querySelectorAll('aside nav a');
    const tabNames = ['basic', 'orders', 'favorites', 'addresses', 'notifications', 'password'];
    menuLinks.forEach((link, index) => {
        if (link.getAttribute('href') === '#' && index < tabNames.length) {
            link.setAttribute('data-tab', tabNames[index]);
        }
    });
    
    // Handle tab clicks
    document.querySelectorAll('[data-tab]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            
            document.querySelectorAll('[data-tab]').forEach(menuItem => {
                menuItem.classList.remove('bg-blue-50', 'text-blue-600');
                menuItem.classList.add('text-gray-700');
            });
            
            this.classList.remove('text-gray-700');
            this.classList.add('bg-blue-50', 'text-blue-600');
            
            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.add('hidden');
            });
            
            const targetPanel = document.getElementById(`tab-${tabName}`);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
            
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    });
    
    // Order filter tabs
    const orderFilterButtons = document.querySelectorAll('#tab-orders button');
    const orderItems = document.querySelectorAll('#tab-orders .border.border-gray-200.rounded-lg');
    
    orderFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            orderFilterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-100', 'text-blue-700');
                btn.classList.add('bg-gray-100', 'text-gray-700');
            });
            
            this.classList.remove('bg-gray-100', 'text-gray-700');
            this.classList.add('bg-blue-100', 'text-blue-700');
            
            const filterText = this.textContent.trim();
            orderItems.forEach(item => {
                const statusBadge = item.querySelector('.px-2.py-1.text-xs.rounded-full');
                if (statusBadge) {
                    const status = statusBadge.textContent.trim();
                    if (filterText === 'Hamısı') {
                        item.style.display = 'block';
                    } else if (filterText === 'Aktiv' && (status === 'Yolda' || status === 'Hazırlanır')) {
                        item.style.display = 'block';
                    } else if (filterText === 'Bitmiş' && status === 'Çatdırıldı') {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Address modal
    const addAddressBtn = document.getElementById('add-address-btn');
    const addressModal = document.getElementById('address-modal');
    const closeModal = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const addressForm = document.getElementById('address-form');
    const addressesList = document.getElementById('addresses-list');
    
    if (addAddressBtn && addressModal) {
        addAddressBtn.addEventListener('click', () => {
            addressModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
        
        function closeAddressModal() {
            addressModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            if (addressForm) addressForm.reset();
        }
        
        if (closeModal) closeModal.addEventListener('click', closeAddressModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeAddressModal);
        
        addressModal.addEventListener('click', (e) => {
            if (e.target === addressModal) closeAddressModal();
        });
        
        if (addressForm) {
            addressForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const addressName = document.querySelector('input[placeholder="Məs: Ev, İş və s."]')?.value || 'Yeni ünvan';
                const firstName = document.querySelector('input[value="Əli"]')?.value || '';
                const lastName = document.querySelector('input[value="Əliyev"]')?.value || '';
                const phone = document.querySelector('input[type="tel"]')?.value || '';
                const city = document.querySelector('input[value="Bakı"]')?.value || '';
                const address = document.querySelector('textarea')?.value || '';
                const isMain = document.querySelector('input[type="checkbox"]')?.checked || false;
                
                if (addressesList) {
                    const newAddress = document.createElement('div');
                    newAddress.className = 'border border-gray-200 rounded-lg p-4';
                    newAddress.innerHTML = `
                        <div class="flex items-start justify-between">
                            <div>
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="font-medium">${addressName}</span>
                                    ${isMain ? '<span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Əsas</span>' : ''}
                                </div>
                                <p class="text-gray-600 mb-1">${firstName} ${lastName}</p>
                                <p class="text-gray-600 mb-1">${phone}</p>
                                <p class="text-gray-600">${city}, ${address}</p>
                            </div>
                            <div class="flex gap-2">
                                <button class="text-blue-600 hover:text-blue-700 text-sm">Düzəlt</button>
                                <button class="text-red-600 hover:text-red-700 text-sm">Sil</button>
                            </div>
                        </div>
                    `;
                    
                    if (isMain) {
                        const existingMainBadges = addressesList.querySelectorAll('.bg-blue-100.text-blue-700');
                        existingMainBadges.forEach(badge => badge.remove());
                    }
                    
                    addressesList.appendChild(newAddress);
                }
                
                closeAddressModal();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        }
    }
    
    // Logout
    const logoutLink = document.querySelector('a[href="#"]');
    if (logoutLink && logoutLink.textContent.includes('Profildən çıx')) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Profildən çıxmaq istədiyinizə əminsiniz?')) {
                window.location.href = 'login.html';
            }
        });
    }
});

// ============================================
// LOGIN PAGE - Tab Switching & Password Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    
    if (tabLogin && tabRegister) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('text-blue-600', 'border-blue-600', 'font-bold');
            tabLogin.classList.remove('text-gray-500', 'border-transparent', 'font-medium');
            tabRegister.classList.remove('text-blue-600', 'border-blue-600', 'font-bold');
            tabRegister.classList.add('text-gray-500', 'border-transparent', 'font-medium');
            if (formLogin) formLogin.classList.remove('hidden');
            if (formRegister) formRegister.classList.add('hidden');
        });
        
        tabRegister.addEventListener('click', () => {
            tabRegister.classList.add('text-blue-600', 'border-blue-600', 'font-bold');
            tabRegister.classList.remove('text-gray-500', 'border-transparent', 'font-medium');
            tabLogin.classList.remove('text-blue-600', 'border-blue-600', 'font-bold');
            tabLogin.classList.add('text-gray-500', 'border-transparent', 'font-medium');
            if (formRegister) formRegister.classList.remove('hidden');
            if (formLogin) formLogin.classList.add('hidden');
        });
    }
    
    // Terms checkbox -> register button toggle
    const termsCheckbox = document.getElementById('terms-checkbox');
    const registerBtn = document.getElementById('register-btn');
    if (termsCheckbox && registerBtn) {
        termsCheckbox.addEventListener('change', () => {
            if (termsCheckbox.checked) {
                registerBtn.disabled = false;
                registerBtn.classList.remove('bg-blue-300', 'cursor-not-allowed');
                registerBtn.classList.add('bg-blue-600', 'hover:bg-blue-700', 'cursor-pointer');
            } else {
                registerBtn.disabled = true;
                registerBtn.classList.add('bg-blue-300', 'cursor-not-allowed');
                registerBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'cursor-pointer');
            }
        });
    }
    
    // Toggle password visibility
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('login-password');
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
    }
});

// ============================================
// FORGOT PASSWORD PAGE - Multi-Step Form
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const stepEmail = document.getElementById('step-email');
    const stepCode = document.getElementById('step-code');
    const stepPassword = document.getElementById('step-password');
    const stepSuccess = document.getElementById('step-success');
    
    if (!stepEmail || !stepCode) return;
    
    const formEmail = document.getElementById('form-email');
    const formCode = document.getElementById('form-code');
    const formPassword = document.getElementById('form-password');
    
    // Step 1 -> Step 2
    if (formEmail) {
        formEmail.addEventListener('submit', (e) => {
            e.preventDefault();
            stepEmail.classList.add('hidden');
            stepCode.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
            const firstCodeInput = document.querySelector('[data-code-input]');
            if (firstCodeInput) firstCodeInput.focus();
        });
    }
    
    // Back to Step 1
    const backToEmail = document.getElementById('back-to-email');
    if (backToEmail) {
        backToEmail.addEventListener('click', () => {
            stepCode.classList.add('hidden');
            stepEmail.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }
    
    // Code input auto-focus next
    const codeInputs = document.querySelectorAll('[data-code-input]');
    codeInputs.forEach((input, idx) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && idx < codeInputs.length - 1) {
                codeInputs[idx + 1].focus();
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && idx > 0) {
                codeInputs[idx - 1].focus();
            }
        });
    });
    
    // Step 2 -> Step 3
    if (formCode) {
        formCode.addEventListener('submit', (e) => {
            e.preventDefault();
            stepCode.classList.add('hidden');
            stepPassword.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }
    
    // Resend code
    const resendCode = document.getElementById('resend-code');
    if (resendCode) {
        resendCode.addEventListener('click', () => {
            codeInputs.forEach(i => i.value = '');
            codeInputs[0].focus();
        });
    }
    
    // Step 3 -> Step 4
    if (formPassword) {
        formPassword.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPass = document.getElementById('new-password')?.value;
            const confirmPass = document.getElementById('confirm-password')?.value;
            const errorEl = document.getElementById('password-error');
            
            if (newPass !== confirmPass) {
                if (errorEl) errorEl.classList.remove('hidden');
                return;
            }
            if (errorEl) errorEl.classList.add('hidden');
            
            stepPassword.classList.add('hidden');
            stepSuccess.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }
});

// ============================================
// CONTACT PAGE - Mobile Menu & Form
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = contactForm.querySelector('button[type="submit"]');
            if (!button) return;
            
            const originalText = button.textContent;
            button.textContent = 'Mesaj göndərildi!';
            button.classList.add('bg-green-600', 'hover:bg-green-700');
            button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            
            contactForm.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('bg-green-600', 'hover:bg-green-700');
                button.classList.add('bg-blue-600', 'hover:bg-blue-700');
            }, 3000);
        });
    }
});

// ============================================
// NOTIFICATION BANNER CLOSE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const closeBanner = document.getElementById('close-banner');
    const notificationBanner = document.getElementById('notification-banner');
    
    if (closeBanner && notificationBanner) {
        closeBanner.addEventListener('click', () => {
            notificationBanner.style.display = 'none';
        });
    }
});
