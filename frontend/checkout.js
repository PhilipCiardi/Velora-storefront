// ===== CHECKOUT.JS =====

document.addEventListener('DOMContentLoaded', function () {
    loadCart();
    setupShippingOptions();
    setupFormValidation();
    updateCartCount();
});

// ===== VARUKORG =====

function getCart() {
    return JSON.parse(localStorage.getItem('veloraCart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('veloraCart', JSON.stringify(cart));
    updateCartCount();
    loadCart();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    });
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        let newCart = cart.filter(i => i.id !== productId);
        localStorage.setItem('veloraCart', JSON.stringify(newCart));
        updateCartCount();
        loadCart();
        return;
    }

    saveCart(cart);
}

function loadCart() {
    const cart = getCart();
    const orderItems = document.querySelector('.order-items');
    const emptyMessage = document.querySelector('.empty-cart-message');
    const checkoutContent = document.querySelector('.checkout-content');

    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        checkoutContent.style.display = 'none';
        return;
    }

    emptyMessage.style.display = 'none';
    checkoutContent.style.display = 'grid';

    orderItems.innerHTML = cart.map(item => `
        <div class="order-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="order-item-image">
            <div class="order-item-details">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');

    updateTotals();
}

// ===== SUMMERING =====

function updateTotals() {
    const cart = getCart();

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const shippingOption = document.querySelector('input[name="shipping"]:checked');
    const shippingCost = shippingOption?.value === 'express' ? 9.99 : 4.99;

    const total = subtotal + shippingCost;

    document.querySelector('.subtotal-amount').textContent = '$' + subtotal.toFixed(2);
    document.querySelector('.shipping-amount').textContent = '$' + shippingCost.toFixed(2);
    document.querySelector('.total-amount').textContent = '$' + total.toFixed(2);
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
            if (!field.value.trim()) isValid = false;
        });

        const email = document.getElementById('email');
        if (email && !email.value.includes('@')) isValid = false;

        checkoutBtn.disabled = !isValid;
    }

    requiredFields.forEach(field => {
        field.addEventListener('input', validateForm);
    });

    checkoutBtn.addEventListener('click', function () {
        if (!this.disabled) {
            alert('Betalning hanteras via Shopify – kopplas i nästa steg!');
        }
    });
}