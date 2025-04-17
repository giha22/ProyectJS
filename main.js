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
    confirmacionTurno.innerHTML = `
        <div class="alert alert-success">
            <h4>¡Gracias, ${nombreCliente}!</h4>
            <p>Has reservado un turno para ${servicio} el ${dia} a las ${hora}:00.</p>
            <p>Te esperamos en MyBella.</p>
            <a href="index.html" class="btn btn-primary">Volver al inicio</a>
        </div>
    `;

    document.getElementById("formularioTurno").style.display = "none";
}

function guardarTurnoEnLocalStorage(turno) {
    let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    turnos.push(turno);
    localStorage.setItem("turnos", JSON.stringify(turnos));
}

document.addEventListener("DOMContentLoaded", () => {
    const carrito = [];

    document.querySelectorAll(".agregar-carrito").forEach(btn => {
        btn.addEventListener("click", agregarAlCarrito);
    });

    document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
    document.getElementById("finalizar-compra").addEventListener("click", finalizarCompra);

    function agregarAlCarrito(e) {
        const categoria = e.target.getAttribute("data-categoria");
        const selectId = `producto${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`;
        const cantidadId = `cantidad${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`;

        const producto = document.getElementById(selectId).value;
        const cantidad = document.getElementById(cantidadId).value;

        if (cantidad < 1) {
            alert("La cantidad debe ser al menos 1");
            return;
        }

        carrito.push({ producto, cantidad, categoria });
        actualizarCarrito();
    }

    function actualizarCarrito() {
        const listaCarrito = document.getElementById("lista-carrito");
        listaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            listaCarrito.innerHTML = "<p>No hay productos en el carrito</p>";
            return;
        }

        carrito.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "d-flex justify-content-between align-items-center mb-2";
            div.innerHTML = `
                <span>Producto ${item.producto} (${item.categoria}) - Cantidad: ${item.cantidad}</span>
                <button class="btn btn-sm btn-danger eliminar-item" data-index="${index}">X</button>
            `;
            listaCarrito.appendChild(div);
        });

        document.querySelectorAll(".eliminar-item").forEach(btn => {
            btn.addEventListener("click", eliminarDelCarrito);
        });
    }

    function eliminarDelCarrito(e) {
        const index = e.target.getAttribute("data-index");
        carrito.splice(index, 1);
        actualizarCarrito();
    }

    function vaciarCarrito() {
        carrito.length = 0;
        actualizarCarrito();
    }

    function finalizarCompra() {
        if (carrito.length === 0) {
            alert("El carrito está vacío");
            return;
        }

        alert("Compra finalizada. ¡Gracias por tu compra!");
        vaciarCarrito();
    }
});
