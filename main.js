//Gestor de turnos y ventas de productos de Estetica
let continuar = true;

//Funcion para sacar un turno
function asignarTurno(servicio, diasDisponibles, horarioInicio, horarioFin) {
    // Pedimos al usuario que elija un día
    let dia = prompt(`Elige un día para tu turno de ${servicio} (${diasDisponibles.join(", ")}):`);
    dia = dia.toLowerCase(); // Normalizamos el texto
    // Validamos que el día sea válido
    if (!diasDisponibles.includes(dia)) {
        alert("El día ingresado no es válido. Por favor, elige un día disponible.");
        return;
    }
    // Mostramos los horarios disponibles
    let horariosDisponibles = [];
    for (let hora = horarioInicio; hora < horarioFin; hora++) {
        horariosDisponibles.push(`${hora}:00`);
    }
    let hora = prompt(`Elige una hora para tu turno de ${servicio} (Horarios disponibles: ${horariosDisponibles.join(", ")}):`);
    hora = Number(hora);
    if (isNaN(hora) || hora < horarioInicio || hora >= horarioFin) {
        alert("La hora ingresada no es válida. Por favor, elige una hora dentro del horario disponible.");
        return;
    }
    // Confirmamos el turno
    alert(`Has reservado un turno para ${servicio} el ${dia} a las ${hora}:00. ¡Gracias, te esperamos en MyBella!`);
}

//Menu principal

while (continuar) {
    let seleccion = prompt(`Bienvenidos a MyBella estetica, elige una opción:
        1 - Turnos y servicios 
        2 - My Bella Shop 
        3 - Finalizar`);

    if (seleccion == 1) {
        let servicio = prompt(`Elige un servicio:
            1 - Alisado definitivo
            2 - Depilación
            3 - Uñas esculpidas
            4 - Limpieza facial completa
            5 - Salir de Turnos`);
            // Definimos los días y horarios como parametros de la funcion según el servicio
            if (servicio === "1") {
                asignarTurno("Alisado definitivo", ["lunes", "miércoles", "viernes"], 11, 19);
            } else if (servicio === "2") {
                asignarTurno("Depilación", ["martes", "jueves"], 10, 18);
            } else if (servicio === "3") {
                asignarTurno("Uñas esculpidas", ["lunes", "martes", "miércoles", "jueves", "viernes"], 9, 20);
            } else if (servicio === "4") {
                asignarTurno("Limpieza facial completa", ["lunes", "miércoles", "viernes"], 12, 17);
            } else {
                alert("Opción de servicio no válida.");
            }
    } else if (seleccion == 2) {
        prompt(
            `Bienvenidos a MyBella Shop: Elige un producto para agregar al carrito:
            1 - Crema hidratante - $6500
            2 - Serum antiarrugas - $8000
            3 - Mascarilla facial - $2800
            4 - Kit de uñas - $3500`);

        if (producto === "1" || producto === "2" || producto === "3" || producto === "4") {
            let cantidad = prompt("Ingrese la cantidad que desea comprar:");
            alert(`Has seleccionado el producto ${producto}. Cantidad: ${cantidad}.`);
        } else {
            alert("Opción de producto no válida.");
        }
    } else if (seleccion == 3) {
        continuar = !confirm(
            "Estas saliendo de MyBella Estetica, ¿Estas seguro de querer salir?"
        );
    } else {
        prompt("El valor ingresado no es correcto, intente de nuevo");
    }
}
