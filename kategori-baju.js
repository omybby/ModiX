
// Store initial product card arrangement on page load
let initialCards = [];

document.addEventListener('DOMContentLoaded', () => {
    // Store initial arrangement of cards when the page loads
    const grid = document.querySelector('.product-grid');
    initialCards = Array.from(grid.querySelectorAll('.product-card')).map(card => card.cloneNode(true));
    
    // Sort Dropdown functionality
    const sortDropdown = document.querySelector('.sort-dropdown');
    if (sortDropdown) {
        sortDropdown.addEventListener('change', () => {
            const sortBy = sortDropdown.value;
            
            if (sortBy === 'Featured') {
                resetToInitialView();
                showToast('Restored to Featured view');
            } else {
                sortProducts(sortBy);
                showToast('Sorted by: ' + sortBy);
            }
        });
    }
    
    // Quick View functionality
    setupQuickViewButtons();
    
    // Initialize wishlist icons
    setupWishlistIcons();
});

// Function to reset grid to initial view
function resetToInitialView() {
    const grid = document.querySelector('.product-grid');
    
    // Clear the current grid
    grid.innerHTML = '';
    
    // Add back all the original cards in their initial order
    initialCards.forEach(card => {
        const newCard = card.cloneNode(true);
        grid.appendChild(newCard);
    });
    
    // Re-attach event listeners to the new cards
    setupQuickViewButtons();
    setupWishlistIcons();
}

// Function to set up quick view buttons
function setupQuickViewButtons() {
    const quickViewButtons = document.querySelectorAll('.quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showToast('Quick view opened!');
        });
    });
}

// Function to set up wishlist icons
function setupWishlistIcons() {
    const wishlistIcons = document.querySelectorAll('.wishlist-icon');
    wishlistIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(this);
        });
    });
}

// Function to sort products
function sortProducts(sortBy) {
    const grid = document.querySelector('.product-grid');
    const cards = Array.from(grid.querySelectorAll('.product-card'));

    cards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));

        return sortBy.includes('Low to High') ? priceA - priceB : priceB - priceA;
    });

    // Clear and re-append sorted cards
    grid.innerHTML = '';
    cards.forEach(card => grid.appendChild(card));
    
    // Re-attach event listeners
    setupQuickViewButtons();
    setupWishlistIcons();
}

// Toast Notification Function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Wishlist button function
function toggleWishlist(el) {
    el.classList.toggle('active');

    // Toggle heart icon color (inside <i>)
    const icon = el.querySelector('i');
    if (icon) {
        if (el.classList.contains('active')) {
            icon.style.color = '#e63946'; // red
        } else {
            icon.style.color = '#999'; // grey
        }
    }

    const toast = document.getElementById('toast');
    toast.textContent = el.classList.contains('active')
        ? 'Added to wishlist!'
        : 'Removed from wishlist!';
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}