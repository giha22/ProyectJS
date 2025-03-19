// Función para mostrar el menú de turnos en el modal
function mostrarTurnos() {
    const modalTurnosBody = document.getElementById("modalTurnosBody");
    modalTurnosBody.innerHTML = `
        <select id="servicio">
            <option value="Alisado definitivo">Alisado definitivo</option>
            <option value="Depilación">Depilación</option>
            <option value="Uñas esculpidas">Uñas esculpidas</option>
            <option value="Limpieza facial completa">Limpieza facial completa</option>
        </select>
        <button id="btn-elegir-servicio">Elegir Servicio</button>
    `;
    document
        .getElementById("btn-elegir-servicio")
        .addEventListener("click", elegirServicio);
}

// Función para elegir un servicio
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

// Función para asignar un turno
function asignarTurno(servicio, diasDisponibles, horarioInicio, horarioFin) {
    const modalTurnosBody = document.getElementById("modalTurnosBody");
    modalTurnosBody.innerHTML = `
        <p>Servicio: ${servicio}</p>
        <label for="nombreCliente">Nombre:</label>
        <input type="text" id="nombreCliente" placeholder="Ingrese su nombre" required>
        <select id="dia">
            ${diasDisponibles.map(dia => `<option value="${dia}">${dia}</option>`).join("")}
        </select>
        <select id="hora">
            ${Array.from({ length: horarioFin - horarioInicio }, (_, i) => horarioInicio + i)
                .map(hora => `<option value="${hora}">${hora}:00</option>`)
                .join("")}
        </select>
        <button id="btn-confirmar-turno">Confirmar Turno</button>
    `;
    document.getElementById("btn-confirmar-turno").addEventListener("click", () => confirmarTurno(servicio));
}

// Función para confirmar el turno
function confirmarTurno(servicio) {
    const nombreCliente = document.getElementById("nombreCliente").value;
    const dia = document.getElementById("dia").value;
    const hora = document.getElementById("hora").value;

    if (!nombreCliente) {
        alert("Por favor, ingrese su nombre.");
        return;
    }

    // Crear un objeto con los datos del turno
    const turno = {
        nombre: nombreCliente,
        servicio: servicio,
        dia: dia,
        hora: `${hora}:00`
    };

    // Guardar en localStorage
    guardarTurnoEnLocalStorage(turno);

    // Mostrar mensaje de confirmación
    const modalTurnosBody = document.getElementById("modalTurnosBody");
    modalTurnosBody.innerHTML = `
        <p>¡Gracias, ${nombreCliente}!</p>
        <p>Has reservado un turno para ${servicio} el ${dia} a las ${hora}:00.</p>
        <p>Te esperamos en MyBella.</p>
    `;
}

// Función para guardar el turno en localStorage
function guardarTurnoEnLocalStorage(turno) {
    let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    turnos.push(turno);
    localStorage.setItem("turnos", JSON.stringify(turnos));
}

//  Función para mostrar los turnos guardados

function mostrarTurnosGuardados() {
    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    if (turnos.length === 0) {
        console.log("No hay turnos guardados.");
        return;
    }
    console.log("Turnos guardados:");
    turnos.forEach((turno, index) => {
        console.log(`Turno ${index + 1}:`);
        console.log(`- Nombre: ${turno.nombre}`);
        console.log(`- Servicio: ${turno.servicio}`);
        console.log(`- Día: ${turno.dia}`);
        console.log(`- Hora: ${turno.hora}`);
    });
}

// Función para mostrar el menú de compras en el modal
function mostrarShop() {
    const modalShopBody = document.getElementById("modalShopBody");
    modalShopBody.innerHTML = `
        <select id="producto">
            <option value="1">Crema hidratante - $6500</option>
            <option value="2">Serum antiarrugas - $8000</option>
            <option value="3">Mascarilla facial - $2800</option>
            <option value="4">Kit de uñas - $3500</option>
        </select>
        <input type="number" id="cantidad" placeholder="Cantidad" min="1">
        <button id="btn-agregar-carrito">Agregar al Carrito</button>
    `;
    document
        .getElementById("btn-agregar-carrito")
        .addEventListener("click", agregarAlCarrito);
}

// Función para agregar un producto al carrito
function agregarAlCarrito() {
    const producto = document.getElementById("producto").value;
    const cantidad = document.getElementById("cantidad").value;
    const modalShopBody = document.getElementById("modalShopBody");
    modalShopBody.innerHTML = `
        <p>Has seleccionado el producto ${producto}. Cantidad: ${cantidad}.</p>
    `;
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    // Evento para abrir el modal de turnos
    document
        .querySelectorAll('[data-bs-target="#modalTurnos"]')
        .forEach((element) => {
            element.addEventListener("click", mostrarTurnos);
        });

    // Evento para abrir el modal de shop
    document
        .querySelectorAll('[data-bs-target="#modalShop"]')
        .forEach((element) => {
            element.addEventListener("click", mostrarShop);
        });
});
