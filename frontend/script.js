document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

function getCart() {
    return JSON.parse(localStorage.getItem('veloraCart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('veloraCart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId) {
    var product = window.veloraProducts.find(function(p) { return p.id === productId; });
    if (!product) return;
    var cart = getCart();
    var existing = cart.find(function(item) { return item.id === productId; });
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: product.id, shopifyId: product.shopifyId, name: product.name, price: product.price, image: product.image, quantity: 1 });
    }
    saveCart(cart);
    showAddedFeedback(productId);
}

function updateCartCount() {
    var cart = getCart();
    var count = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);
    document.querySelectorAll('.cart-count').forEach(function(badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    });
}

function showAddedFeedback(productId) {
    var card = document.querySelector('[data-product-id="' + productId + '"]');
    if (!card) return;
    var btn = card.querySelector('.add-to-cart-btn');
    if (!btn) return;
    btn.textContent = 'ADDED ✓';
    setTimeout(function() { btn.textContent = 'ADD TO CART'; }, 1500);
}

function openQuickView(productId) {
    var product = window.veloraProducts.find(function(p) { return p.id === productId; });
    if (!product) return;
    var images = product.images || [product.image];

    var labelEl = document.getElementById('qv-label');
    if (labelEl) labelEl.textContent = product.label;
    document.getElementById('qv-title').textContent = product.name;
    document.getElementById('qv-desc').textContent = product.description;
    document.getElementById('qv-price').textContent = '$' + product.price + '.00';
    document.getElementById('qv-main-img').src = images[0];

    var btn = document.getElementById('qv-cart-btn');
    btn.textContent = 'ADD TO CART';
    btn.onclick = function() {
        addToCart(productId);
        btn.textContent = 'ADDED ✓';
        setTimeout(function() { btn.textContent = 'ADD TO CART'; }, 1500);
    };

    var thumbsEl = document.getElementById('qv-thumbs');
    thumbsEl.innerHTML = '';
    images.forEach(function(src, i) {
        var img = document.createElement('img');
        img.src = src;
        img.style.cssText = 'width:56px;height:56px;object-fit:cover;cursor:pointer;border:2px solid ' + (i===0?'white':'transparent') + ';transition:0.2s;margin-right:8px;';
        img.onclick = function() {
            document.getElementById('qv-main-img').src = src;
            thumbsEl.querySelectorAll('img').forEach(function(t) { t.style.borderColor = 'transparent'; });
            img.style.borderColor = 'white';
        };
        thumbsEl.appendChild(img);
    });

    document.getElementById('quickViewModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('active');
    document.body.style.overflow = '';
}