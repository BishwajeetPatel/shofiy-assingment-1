
document.addEventListener('DOMContentLoaded', function() {

    const sizeChartTrigger = document.getElementById('size-chart-trigger');
    const sizeChartModal = document.getElementById('size-chart-modal');
    const closeModal = document.getElementById('close-modal');

   
    sizeChartTrigger.addEventListener('click', function() {
        sizeChartModal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    
    closeModal.addEventListener('click', function() {
        sizeChartModal.classList.remove('active');
        document.body.style.overflow = ''; 
    });


    sizeChartModal.addEventListener('click', function(e) {
        if (e.target === sizeChartModal) {
            sizeChartModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

  
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sizeChartModal.classList.contains('active')) {
            sizeChartModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

 
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

   
    initRelatedProductsSlider();
});


function changeImage(thumbnail, newSrc) {
 
    document.getElementById('main-product-image').src = newSrc;
  
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
}


function selectColor(colorElement) {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.remove('selected');
    });
    colorElement.classList.add('selected');
}


function selectSize(sizeElement) {
    // Don't allow selecting out-of-stock sizes
    if (sizeElement.classList.contains('out-of-stock')) {
        return;
    }
    
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.classList.remove('selected');
    });
    sizeElement.classList.add('selected');
}


function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity-input');
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity-input');
    let currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
    }
}


document.getElementById('quantity-input').addEventListener('change', function() {
    const value = parseInt(this.value);
    if (isNaN(value) || value < 1) {
        this.value = 1;
    } else if (value > 10) {
        this.value = 10;
    }
});


function initRelatedProductsSlider() {
    const slider = document.getElementById('related-products-slider');

    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        if (touchStartX - touchEndX > swipeThreshold) {
      
            scrollSlider(1);
        } else if (touchEndX - touchStartX > swipeThreshold) {
           
            scrollSlider(-1);
        }
    }
    
    // Mouse wheel horizontal scrolling
    slider.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            slider.scrollLeft += e.deltaY;
        }
    }, { passive: false });
}


function scrollSlider(direction) {
    const slider = document.getElementById('related-products-slider');
    const scrollAmount = slider.offsetWidth / 2; // Scroll half the visible width
    
    if (direction === 1) {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}


document.querySelector('.add-to-cart').addEventListener('click', function() {
    // Get selected options
    const selectedColor = document.querySelector('.color-option.selected');
    const selectedSize = document.querySelector('.size-option.selected');
    const quantity = document.getElementById('quantity-input').value;
    

    if (!selectedColor || !selectedSize) {
        alert('Please select color and size before adding to cart');
        return;
    }
    

    this.classList.add('added');
    
    setTimeout(() => {
        this.classList.remove('added');
    }, 1000);
    
 
    console.log(`Added ${quantity} Banana Bliss Oversized T-shirt(s) to cart`);
});

// Wishlist Button Toggle
document.querySelector('.wishlist-btn').addEventListener('click', function() {
    this.classList.toggle('active');
    
    if (this.classList.contains('active')) {
        this.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';
    } else {
        this.innerHTML = '<i class="fas fa-heart"></i> Wishlist';
    }
});


const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you! ${email} has been subscribed to our newsletter.`);
        this.reset();
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});
