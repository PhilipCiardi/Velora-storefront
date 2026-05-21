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

function addToCart(productId, variantId, variantName, variantImage) {
    var product = window.veloraProducts.find(function(p) { return p.id === productId; });
    if (!product) return;

    var cart = getCart();
    var cartKey = variantId ? productId + '_' + variantId : String(productId);
    var existing = cart.find(function(item) { return item.cartKey === cartKey; });

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            cartKey: cartKey,
            id: product.id,
            shopifyId: product.shopifyId,
            variantId: variantId || null,
            variantName: variantName || null,
            name: product.name + (variantName ? ' — ' + variantName : ''),
            price: product.price,
            image: variantImage || product.image,
            quantity: 1
        });
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
    var selectedVariantId = null;
    var selectedVariantName = null;
    var selectedVariantImage = product.image;

    if (product.variants && product.variants.length > 0) {
        selectedVariantId = product.variants[0].variantId;
        selectedVariantName = product.variants[0].name;
        selectedVariantImage = product.variants[0].image;
    } else if (product.defaultVariantId) {
        selectedVariantId = product.defaultVariantId;
    }

    var labelEl = document.getElementById('qv-label');
    if (labelEl) labelEl.textContent = product.label;
    document.getElementById('qv-title').textContent = product.name;
    document.getElementById('qv-desc').textContent = product.description;
    document.getElementById('qv-price').textContent = '$' + product.price + '.00';
    document.getElementById('qv-main-img').src = selectedVariantImage;

    // Färgväljare
    var variantEl = document.getElementById('qv-variants');
    if (variantEl) {
        if (product.variants && product.variants.length > 0) {
            variantEl.innerHTML = '<p style="font-size:11px;letter-spacing:2px;color:rgba(255,255,255,0.6);margin-bottom:10px;">COLOR</p>' +
                product.variants.map(function(v, i) {
                    return '<button onclick="selectVariant(' + productId + ',\'' + v.variantId + '\',\'' + v.name + '\',\'' + v.image + '\')" ' +
                        'id="vbtn-' + v.variantId + '" ' +
                        'style="margin-right:8px;margin-bottom:8px;padding:8px 16px;border:1px solid ' + (i===0?'white':'rgba(255,255,255,0.3)') + ';' +
                        'background:' + (i===0?'white':'transparent') + ';color:' + (i===0?'black':'rgba(255,255,255,0.8)') + ';' +
                        'font-size:11px;letter-spacing:2px;cursor:pointer;font-family:Inter,sans-serif;transition:0.2s;">' +
                        v.name + '</button>';
                }).join('');
            variantEl.style.display = 'block';
        } else {
            variantEl.style.display = 'none';
        }
    }

    // Add to Cart knapp
    var btn = document.getElementById('qv-cart-btn');
    btn.textContent = 'ADD TO CART';
    btn.onclick = function() {
        addToCart(productId, selectedVariantId, selectedVariantName, selectedVariantImage);
        btn.textContent = 'ADDED ✓';
        setTimeout(function() { btn.textContent = 'ADD TO CART'; }, 1500);
    };

    // Thumbnails
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

function selectVariant(productId, variantId, variantName, variantImage) {
    // Uppdatera huvudbild
    document.getElementById('qv-main-img').src = variantImage;

    // Uppdatera knapp-styling
    document.querySelectorAll('[id^="vbtn-"]').forEach(function(btn) {
        btn.style.border = '1px solid rgba(255,255,255,0.3)';
        btn.style.background = 'transparent';
        btn.style.color = 'rgba(255,255,255,0.8)';
    });
    var activeBtn = document.getElementById('vbtn-' + variantId);
    if (activeBtn) {
        activeBtn.style.border = '1px solid white';
        activeBtn.style.background = 'white';
        activeBtn.style.color = 'black';
    }

    // Uppdatera Add to Cart med vald variant
    var btn = document.getElementById('qv-cart-btn');
    btn.onclick = function() {
        addToCart(productId, variantId, variantName, variantImage);
        btn.textContent = 'ADDED ✓';
        setTimeout(function() { btn.textContent = 'ADD TO CART'; }, 1500);
    };
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('active');
    document.body.style.overflow = '';
}