// ===== CHECKOUT.JS =====

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    setupShippingOptions();
    setupFormValidation();
    updateCartCount();
});

// ===== LADDA VARUKORG =====

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItems = document.querySelector('.order-items');
    const emptyMessage = document.querySelector('.empty-cart-message');
    const checkoutContent = document.querySelector('.checkout-content');

    // Visa tom varukorg-meddelande om tomt
    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        checkoutContent.style.display = 'none';
        return;
    }

    emptyMessage.style.display = 'none';
    checkoutContent.style.display = 'grid';

    // Rendera produkter
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="order-item-image">
            <div class="order-item-details">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-variant">
                    ${item.size ? 'Stl: ' + item.size : ''} 
                    ${item.color ? '/ ' + item.color : ''}
                    ${item.quantity > 1 ? '× ' + item.quantity : ''}
                </div>
                <div class="order-item-price">${item.price * item.quantity} kr</div>
            </div>
        </div>
    `).join('');

    updateTotals();
}

// ===== UPPDATERA SUMMERING =====

function updateTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const subtotal = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    const shippingOption = document.querySelector('input[name="shipping"]:checked');
    const shippingCost = shippingOption.value === 'express' ? 99 : 49;

    const total = subtotal + shippingCost;

    document.querySelector('.subtotal-amount').textContent = subtotal + ' kr';
    document.querySelector('.shipping-amount').textContent = shippingCost + ' kr';
    document.querySelector('.total-amount').textContent = total + ' kr';
}

// ===== FRAKTALTERNATIV =====

function setupShippingOptions() {
    const shippingInputs = document.querySelectorAll('input[name="shipping"]');
    
    shippingInputs.forEach(input => {
        input.addEventListener('change', updateTotals);
    });
}

// ===== FORMULÄRVALIDERING =====

function setupFormValidation() {
    const requiredFields = document.querySelectorAll('input[required]');
    const checkoutBtn = document.querySelector('.btn-checkout');

    function validateForm() {
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
            }
        });

        // Enkel e-postvalidering
        const email = document.getElementById('email');
        if (email && !email.value.includes('@')) {
            isValid = false;
        }

        checkoutBtn.disabled = !isValid;
    }

    requiredFields.forEach(field => {
        field.addEventListener('input', validateForm);
    });

    // Checkout-knapp
    checkoutBtn.addEventListener('click', function() {
        if (!this.disabled) {
            alert('Betalning hanteras via Shopify – kopplas i nästa steg!');
        }
    });
}

// ===== UPPDATERA VARUKORG-IKON =====

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        cartCount.textContent = count;
    }
}
