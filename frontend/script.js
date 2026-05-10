// ===== SCRIPT.JS =====

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    setupQuickView();
    setupSearch();
});

// ===== VARUKORG =====

function getCart() {
    return JSON.parse(localStorage.getItem('veloraCart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('veloraCart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId) {
    const product = window.veloraProducts.find(p => p.id === productId);
    if (!product) return;

    const cart = getCart();
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
    showAddedFeedback(productId);
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
        removeFromCart(productId);
        return;
    }

    saveCart(cart);
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

function showAddedFeedback(productId) {
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    if (!card) return;
    const btn = card.querySelector('.add-to-cart-btn');
    if (!btn) return;
    btn.textContent = 'ADDED ✓';
    btn.style.background = 'white';
    btn.style.color = 'black';
    btn.style.borderColor = 'white';
    setTimeout(() => {
        btn.textContent = 'ADD TO CART';
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
    }, 1500);
}

// ===== QUICK VIEW MODAL =====

function setupQuickView() {
    if (!document.getElementById('quickViewModal')) {
        const modal = document.createElement('div');
        modal.id = 'quickViewModal';
        modal.innerHTML = `
            <div class="qv-overlay"></div>
            <div class="qv-content">
                <button class="qv-close">✕</button>
                <div class="qv-image-wrap">
                    <img id="qvImage" src="" alt="">
                </div>
                <div class="qv-details">
                    <span id="qvLabel" class="product-label"></span>
                    <h2 id="qvName"></h2>
                    <p id="qvDesc" class="product-desc"></p>
                    <p id="qvPrice" class="price"></p>
                    <button class="outline-btn qv-add-btn" id="qvAddBtn">ADD TO CART</button>
                    <p class="qv-secure"><i class="fas fa-lock"></i> Säker checkout</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.qv-overlay').addEventListener('click', closeQuickView);
        modal.querySelector('.qv-close').addEventListener('click', closeQuickView);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeQuickView();
        });
    }

    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('[data-product-id]');
            const productId = parseInt(card?.dataset.productId);
            if (productId) openQuickView(productId);
        });
    });
}

function openQuickView(productId) {
    const product = window.veloraProducts?.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('qvImage').src = product.image;
    document.getElementById('qvImage').alt = product.name;
    document.getElementById('qvLabel').textContent = product.label;
    document.getElementById('qvName').textContent = product.name;
    document.getElementById('qvDesc').textContent = product.description;
    document.getElementById('qvPrice').textContent = `$${product.price}.00`;

    const addBtn = document.getElementById('qvAddBtn');
    addBtn.onclick = () => {
        addToCart(productId);
        addBtn.textContent = 'ADDED ✓';
        setTimeout(() => addBtn.textContent = 'ADD TO CART', 1500);
    };

    const modal = document.getElementById('quickViewModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== SÖK =====

function setupSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.product-card');

        cards.forEach(card => {
            const name = card.querySelector('h2')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('.product-desc')?.textContent.toLowerCase() || '';
            card.style.display = (name.includes(query) || desc.includes(query)) ? '' : 'none';
        });
    });
}