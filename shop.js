document.addEventListener('DOMContentLoaded', function () {
    // ========== VARIABLES GLOBALES ==========
    let products = [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // ========== FUNCIONES DEL CARRITO ==========
    function addToCart(event) {
        const button = event.target.closest('.add-to-cart');
        const productId = parseInt(button.dataset.id);
        const product = products.find(p => p.id === productId);

        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        saveCart();
        updateCartDisplay();
        animateAddToCart(button);
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function animateAddToCart(button) {
        button.innerHTML = '<i class="bi bi-check2"></i> Agregado';
        button.classList.add('btn-success');
        setTimeout(() => {
            button.innerHTML = '<i class="bi bi-cart-plus"></i> Agregar';
            button.classList.remove('btn-success');
        }, 2000);
    }

    function updateCartDisplay() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-counter').textContent = totalItems;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-cart-x text-muted" style="font-size: 3rem;"></i>
                    <p class="mt-3">Tu carrito está vacío</p>
                </div>
            `;
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="../img/${item.image}" class="cart-item-img" alt="${item.name}">
                    <div class="cart-item-details">
                        <h6 class="mb-1">${item.name}</h6>
                        <div class="d-flex justify-content-between">
                            <span class="text-muted">Cantidad: ${item.quantity}</span>
                            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                    <button class="cart-item-remove btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');

            document.querySelectorAll('.cart-item-remove').forEach(button => {
                button.addEventListener('click', function () {
                    const itemId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
                    removeFromCart(itemId);
                });
            });
        }

        cartTotal.textContent = `$${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`;
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartDisplay();
    }

    function clearCart() {
        cart = [];
        saveCart();
        updateCartDisplay();
        cartModal.hide();
    }

    // ========== FUNCIONES DE PRODUCTOS ==========
    function renderProducts() {
        const container = document.getElementById('products-container');
        if (!container || !products.length) return;

        container.innerHTML = products.map(product => `
            <div class="col-md-4 col-lg-3">
                <div class="card h-100 product-card">
                    ${product.discount ? `<span class="badge bg-danger position-absolute top-0 end-0 m-2">${product.discount}% OFF</span>` : ''}
                    <img src="../img/${product.image}" class="card-img-top p-3" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="text-muted">${product.description}</p>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    ${product.originalPrice ? `<span class="text-decoration-line-through text-muted small">$${product.originalPrice}</span>` : ''}
                                    <span class="fs-5 fw-bold ${product.discount ? 'text-danger' : ''}">$${product.price}</span>
                                </div>
                                <span class="badge ${product.stock > 3 ? 'bg-success' : 'bg-warning'}">${product.stock > 3 ? 'Disponible' : 'Últimas unidades'}</span>
                            </div>
                            <button class="btn btn-pink w-100 add-to-cart" data-id="${product.id}">
                                <i class="bi bi-cart-plus"></i> Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', addToCart);
        });
    }

    async function loadProducts() {
        try {
            const response = await fetch('../data/products.json');
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            products = await response.json();
            renderProducts();
        } catch (error) {
            console.error('Error al cargar productos:', error);
            const container = document.getElementById('products-container');
            if (container) {
                container.innerHTML = `
                <div class="alert alert-danger">
                    Error al cargar productos: ${error.message}
                    <br>Ruta intentada: ${response?.url || 'No disponible'}
                </div>
            `;
            }
        }
    }

    console.log("Intentando cargar:", '../data/products.json');

    // ========== EVENTOS ==========
    document.getElementById('cart-button')?.addEventListener('click', function () {
        updateCartDisplay();
        cartModal.show();
    });

    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            Swal.fire('¡Ups!', 'Tu carrito está vacío', 'warning');
            return;
        }
    
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const productsList = cart.map(item => 
            `<li>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>`
        ).join('');
    
        Swal.fire({
            title: 'Confirmar compra',
            html: `
                <h4>Total: $${total.toFixed(2)}</h4>
                <ul style="text-align: left; margin: 10px 0">${productsList}</ul>
                <p>¿Confirmar compra?</p>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#ff85a2',
            cancelButtonColor: '#6c757d',
            confirmButtonText: '¡Comprar!',
            cancelButtonText: 'Seguir comprando'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Éxito!',
                    'Tu compra ha sido procesada',
                    'success'
                );
                clearCart();
            }
        });
    });

    document.getElementById('clear-cart-btn')?.addEventListener('click', clearCart);

    // ========== INICIALIZACIÓN ==========
    loadProducts();
});
