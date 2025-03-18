// Función para mostrar el menú de turnos en el modal
function mostrarTurnos() {
    const modalTurnosBody = document.getElementById("modalTurnosBody");
    modalTurnosBody.innerHTML = `
        <select id="servicio">
            <option value="1">Alisado definitivo</option>
            <option value="2">Depilación</option>
            <option value="3">Uñas esculpidas</option>
            <option value="4">Limpieza facial completa</option>
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
        case "1":
            diasDisponibles = ["lunes", "miércoles", "viernes"];
            horarioInicio = 11;
            horarioFin = 19;
            break;
        case "2":
            diasDisponibles = ["martes", "jueves"];
            horarioInicio = 10;
            horarioFin = 18;
            break;
        case "3":
            diasDisponibles = ["lunes", "martes", "miércoles", "jueves", "viernes"];
            horarioInicio = 9;
            horarioFin = 20;
            break;
        case "4":
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
    const dia = document.getElementById("dia").value;
    const hora = document.getElementById("hora").value;
    const modalTurnosBody = document.getElementById("modalTurnosBody");
    modalTurnosBody.innerHTML = `
        <p>Has reservado un turno para ${servicio} el ${dia} a las ${hora}:00. ¡Gracias, te esperamos en MyBella!</p>
    `;
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
