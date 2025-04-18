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