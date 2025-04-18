document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-elegir-servicio").addEventListener("click", elegirServicio);
});

function elegirServicio() {
    const servicio = document.getElementById("servicio").value;
    let diasDisponibles, horarioInicio, horarioFin;

    switch (servicio) {
        case "Alisado definitivo":
            diasDisponibles = ["lunes", "miércoles", "viernes"];
            horarioInicio = 11;
            horarioFin = 19;
            break;
        case "Depilación":
            diasDisponibles = ["martes", "jueves"];
            horarioInicio = 10;
            horarioFin = 18;
            break;
        case "Uñas esculpidas":
            diasDisponibles = ["lunes", "martes", "miércoles", "jueves", "viernes"];
            horarioInicio = 9;
            horarioFin = 20;
            break;
        case "Limpieza facial completa":
            diasDisponibles = ["lunes", "miércoles", "viernes"];
            horarioInicio = 12;
            horarioFin = 17;
            break;
        default:
            alert("Opción de servicio no válida.");
            return;
    }

    asignarTurno(servicio, diasDisponibles, horarioInicio, horarioFin);
}

function asignarTurno(servicio, diasDisponibles, horarioInicio, horarioFin) {
    const formularioTurno = document.getElementById("formularioTurno");
    formularioTurno.innerHTML = `
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <p class="fw-bold">Servicio: ${servicio}</p>
                    <div class="mb-3">
                        <label for="nombreCliente" class="form-label">Nombre:</label>
                        <input type="text" id="nombreCliente" class="form-control" placeholder="Ingrese su nombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="dia" class="form-label">Día:</label>
                        <select id="dia" class="form-select">
                            ${diasDisponibles.map(dia => `<option value="${dia}">${dia}</option>`).join("")}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="hora" class="form-label">Hora:</label>
                        <select id="hora" class="form-select">
                            ${Array.from({ length: horarioFin - horarioInicio }, (_, i) => horarioInicio + i)
            .map(hora => `<option value="${hora}">${hora}:00</option>`)
            .join("")}
                        </select>
                    </div>
                    <button id="btn-confirmar-turno" class="btn btn-primary w-100">Confirmar Turno</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById("btn-confirmar-turno").addEventListener("click", () => confirmarTurno(servicio));
}

function confirmarTurno(servicio) {
    const nombreCliente = document.getElementById("nombreCliente").value;
    const dia = document.getElementById("dia").value;
    const hora = document.getElementById("hora").value;

    if (!nombreCliente) {
        alert("Por favor, ingrese su nombre.");
        return;
    }

    const turno = {
        nombre: nombreCliente,
        servicio: servicio,
        dia: dia,
        hora: `${hora}:00`
    };

    guardarTurnoEnLocalStorage(turno);

    const confirmacionTurno = document.getElementById("confirmacionTurno");
    confirmacionTurno.style.display = "block";
    const inicioPath = window.location.href.includes('pages') 
        ? '../index.html' 
        : 'index.html';
    
    confirmacionTurno.innerHTML = `
        <div class="alert alert-success">
            <h4>¡Gracias, ${nombreCliente}!</h4>
            <p>✅ Turno reservado para: <strong>${servicio}</strong></p>
            <p>📅 Fecha: <strong>${dia}</strong> a las <strong>${hora}:00</strong></p>
            
            <div class="mt-3 info-adicional">
                <p>📍 <strong>Dirección:</strong> Av. Principal 1234, Local 5</p>
                <p>📞 <strong>Teléfono:</strong> 11 2345-6789</p>
                <p>⏰ <strong>Horario:</strong> Lunes a Viernes de 9 a 18hs</p>
                <p class="text-muted">Por favor llegar 10 minutos antes</p>
            </div>
            <a href="${inicioPath}" class="btn btn-primary">Volver al inicio</a>
        </div>
    `;

    document.getElementById("formularioTurno").style.display = "none";
}

function guardarTurnoEnLocalStorage(turno) {
    let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    turnos.push(turno);
    localStorage.setItem("turnos", JSON.stringify(turnos));
}



document.addEventListener('DOMContentLoaded', function() {
    // ========== ARRAY DE PRODUCTOS ==========
    const products = [
        {
            id: 1,
            name: "Crema Hidratante",
            description: "Para piel seca • 50ml",
            price: 6000,
            originalPrice: 7500,
            discount: 20,
            image: "./img/producto1.jpg",
            category: "piel",
            stock: 10
        },
        {
            id: 2,
            name: "Serum Anti-age",
            description: "Reduce arrugas • 30ml",
            price: 8200,
            image: "./img/producto2.jpg",
            category: "piel",
            stock: 5
        },
        {
            id: 3,
            name: "Serum Anti-age",
            description: "Reduce arrugas • 30ml",
            price: 8200,
            image: "./img/producto2.jpg",
            category: "piel",
            stock: 5
        },{
            id: 4,
            name: "Serum Anti-age",
            description: "Reduce arrugas • 30ml",
            price: 8200,
            image: "./img/producto2.jpg",
            category: "piel",
            stock: 5
        },{
            id: 5,
            name: "Serum Anti-age",
            description: "Reduce arrugas • 30ml",
            price: 8200,
            image: "./img/producto2.jpg",
            category: "piel",
            stock: 5
        },
        // Añade más productos aquí...
    ];

    // ========== CARRITO CON LOCALSTORAGE ==========
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // ========== RENDERIZADO DE PRODUCTOS ==========
    function renderProducts(productsToRender = products) {
        const productsContainer = document.querySelector('.row.g-4');
        if (!productsContainer) return;
        
        productsContainer.innerHTML = productsToRender.map(product => `
            <div class="col-md-4 col-lg-3">
                <div class="card h-100 product-card">
                    ${product.discount ? `<span class="badge bg-danger position-absolute top-0 end-0 m-2">${product.discount}% OFF</span>` : ''}
                    <img src="${product.image}" class="card-img-top p-3" alt="${product.name}">
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
        
        // Asignar eventos a los nuevos botones
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCartHandler);
        });
    }

    // ========== FUNCIONES DEL CARRITO ==========
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCartHandler(event) {
        const button = event.target.closest('.add-to-cart');
        const productId = parseInt(button.getAttribute('data-id'));
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

    function animateAddToCart(button) {
        button.innerHTML = '<i class="bi bi-check2"></i> Agregado';
        button.classList.add('btn-success');
        setTimeout(() => {
            button.innerHTML = '<i class="bi bi-cart-plus"></i> Agregar';
            button.classList.remove('btn-success');
        }, 2000);
    }

    function updateCartDisplay() {
        // Actualizar contador del botón flotante
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-counter').textContent = totalItems;
        
        // Actualizar modal del carrito
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
                    <img src="${item.image}" class="cart-item-img" alt="${item.name}">
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
            
            // Agregar eventos a los botones de eliminar
            document.querySelectorAll('.cart-item-remove').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
                    removeFromCart(itemId);
                });
            });
        }
        
        // Actualizar total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
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

    // ========== INICIALIZACIÓN ==========
    renderProducts();
    updateCartDisplay();
    
    // Evento del botón flotante del carrito
    document.getElementById('cart-button').addEventListener('click', function() {
        updateCartDisplay();
        cartModal.show();
    });
    
    // Evento del botón "Finalizar compra"
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        alert(`Compra finalizada! Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
        clearCart();
    });
    
    // Evento del botón "Vaciar carrito"
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
});
