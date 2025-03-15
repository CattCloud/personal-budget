// Referencias de las tarjetas de informacion
const cardEgresoInfo = document.getElementById("card-info-egreso");
const cardIngresoInfo = document.getElementById("card-info-ingreso");
const cardBalanceInfo = document.getElementById("card-info-balance");
const cardTotalMovInfo = document.getElementById("card-info-totalmov");


// Array global para almacenar los movimientos
const movimientos = [];


function Movimiento(tipo,monto,descripcion,fecha){
    this.tipo=tipo;
    this.monto=monto;
    this.descripcion=descripcion;
    this.fecha=fecha;
}

// Método prototípico para recalcular totales
Movimiento.prototype.recalcularTotales = function() {
    // Inicializar variables para totales
    let ingresoTotal = 0;
    let egresoTotal = 0;

    // Recorrer el array global de movimientos
    movimientos.forEach((movimiento) => {
        if (movimiento.tipo === "ingreso") {
            ingresoTotal += movimiento.monto;
        } else if (movimiento.tipo === "egreso") {
            egresoTotal += movimiento.monto;
        }
    });

    // Calcular el balance total
    const saldoTotal = ingresoTotal - egresoTotal;

    // Actualizar las tarjetas de información
    cardTotalMovInfo.textContent = movimientos.length; // Total de movimientos
    cardBalanceInfo.textContent = "$" + saldoTotal.toFixed(2);
    cardIngresoInfo.textContent = "$" + ingresoTotal.toFixed(2);
    cardEgresoInfo.textContent = "$" + egresoTotal.toFixed(2);
};


function Egreso(tipo,monto,descripcion,esPrioritario,fecha){
    Movimiento.call(this,tipo,monto,descripcion,fecha);
    //Un booleano para marcar si el gasto es esencial o no.
    this.esPrioritario=esPrioritario;
    
}

function Ingreso(tipo,monto,descripcion,frecuencia,fecha){
    Movimiento.call(this,tipo,monto,descripcion,fecha);
    //Si el ingreso es recurrente (anual,semestral,mensual,semanal,único).
    this.frecuencia=frecuencia;
}



Ingreso.prototype=Object.create(Movimiento.prototype);

Ingreso.prototype.constructor=Ingreso;

Egreso.prototype=Object.create(Movimiento.prototype);

Egreso.prototype.constructor=Egreso;





// Referencias del formulario
const form = document.getElementById("form-insert-movimiento");
const tipoIngreso = document.getElementById("ingreso");
const tipoEgreso = document.getElementById("egreso");
const descripcionInput = form.querySelector("input[placeholder='Descripción']");
const montoInput = form.querySelector("input[placeholder='Monto']");
const frecuenciaSelect = document.getElementById("frecuencia");
const prioritarioCheckbox = document.getElementById("prioritario");



// Referencia al cuerpo de la tabla y el botón "Filtrar"
const movementsTableBody = document.getElementById("movementsTableBody");
const filterButton = document.getElementById("filterButton");

// Contenedor de alertas dinámico
let alertContainer;

// Función para mostrar alertas Bootstrap
function mostrarAlertaBootstrap(tipo, mensajes) {
    if (alertContainer) {
        alertContainer.remove(); // Eliminar alerta previa
    }

    alertContainer = document.createElement("div");
    alertContainer.className = `alert alert-${tipo} alert-dismissible fade show`;
    alertContainer.role = "alert";

    const mensajeTexto = document.createElement("p");
    mensajeTexto.classList.add("mb-0");
    mensajeTexto.textContent = mensajes.join(" ");
    alertContainer.appendChild(mensajeTexto);

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn-close";
    closeButton.setAttribute("data-bs-dismiss", "alert");
    closeButton.setAttribute("aria-label", "Close");
    alertContainer.appendChild(closeButton);

    form.prepend(alertContainer); // Insertar alerta
}

// Función para limpiar el formulario
function clearFormulario(){
    form.reset();
    tipoIngreso.checked = true; // Reestablecer "Ingreso" como predeterminado
    frecuenciaSelect.closest(".mb-4").classList.remove("d-none");
    prioritarioCheckbox.closest(".mb-4").classList.add("d-none");
    console.log("Movimientos:", movimientos);
}

function agregarMovimientoATabla(movimiento) {
    // Quitar el mensaje de "No hay movimientos registrados" si existe
    const noMovementsRow = movementsTableBody.querySelector("tr");
    if (noMovementsRow && noMovementsRow.children.length === 1) {
        movementsTableBody.removeChild(noMovementsRow);
    }

    // Crear una nueva fila
    const newRow = document.createElement("tr");

    // Crear y asignar las celdas
    const tipoCell = document.createElement("td");
    const texttipoCell = document.createElement("span");

    texttipoCell.textContent = movimiento.tipo.charAt(0).toUpperCase() + movimiento.tipo.slice(1);
    if(movimiento.tipo==="egreso"){
        texttipoCell.className = "celda_tipo_egreso text-white px-1";
        texttipoCell.style.backgroundColor = "#fa9c06";
    }else{
        texttipoCell.className = "celda_tipo_ingreso text-white px-1";
        texttipoCell.style.backgroundColor = "#183461";
    }
    tipoCell.appendChild(texttipoCell);

    const descripcionCell = document.createElement("td");
    descripcionCell.textContent = movimiento.descripcion;

    const fechaCell = document.createElement("td");
    fechaCell.textContent = new Date(movimiento.fecha).toLocaleDateString();

    const montoCell = document.createElement("td");
    montoCell.classList.add("text-end");
    montoCell.textContent = `$${movimiento.monto.toFixed(2)}`;

    // Agregar las celdas a la fila
    newRow.appendChild(tipoCell);
    newRow.appendChild(descripcionCell);
    newRow.appendChild(fechaCell);
    newRow.appendChild(montoCell);

    // Agregar la fila al cuerpo de la tabla
    movementsTableBody.appendChild(newRow);
}



// Función para manejar el envío del formulario
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar recargar pagina

    console.log("Ingrese al evento");

    // Capturar datos del formulario
    const tipo = tipoIngreso.checked ? "ingreso" : "egreso";
    let frecuencia,prioritario;
    if(tipo==="ingreso"){
        frecuencia = frecuenciaSelect.value;
    }
    else{
        prioritario = prioritarioCheckbox.checked;
    }
    const descripcion = descripcionInput.value.trim();
    const monto = parseFloat(montoInput.value);

    
    // Crear y almacenar el movimiento
    let movimiento;
    if (tipo === "ingreso") {
        movimiento = new Ingreso(tipo, monto, descripcion, frecuencia,new Date());
    } else {
        movimiento = new Egreso(tipo, monto, descripcion, prioritario,new Date());
    }
    movimientos.push(movimiento);
    agregarMovimientoATabla(movimiento);
    // Mostrar mensaje de éxito
    mostrarAlertaBootstrap("warning", ["Movimiento registrado correctamente."]);
    // Limpiar el formulario
    clearFormulario(tipo);

    movimiento.recalcularTotales();
});


// Evento para el botón "Filtrar"
filterButton.addEventListener("click", function() {
    window.location.href = "filter.html"; // Redirige a una página de filtros
});







function listarEgresos100(movimientos) {
    if(movimientos.length==0){
        console.log("No hay egresos mayores a 100")
    }else{
        console.log("Egresos mayores a $100:");
        let cadenaMovimientos = movimientos.map(elemento => 
            `  { nombre: '${elemento.nombre}', tipo: '${elemento.tipo.charAt(0).toUpperCase() + elemento.tipo.slice(1)}', monto: ${elemento.monto.toFixed(2)} }`
        );
        console.log("[");
        console.log(cadenaMovimientos.join(",\n"));
        console.log("]");
    }
}


function mostrarNombreBuscado(movimiento,nombre) {
    if(typeof movimiento == "undefined"){
        console.log("No hay ningun movimiento con nombre "+nombre);
    }else{
        console.log("Resultado encontrado:");
        console.log(`{ nombre: '${movimiento.nombre}', tipo: '${movimiento.tipo.charAt(0).toUpperCase() + movimiento.tipo.slice(1)}', monto: ${movimiento.monto.toFixed(2)} }`);
    }
}




const ingresoRadio = document.getElementById('ingreso');
const egresoRadio = document.getElementById('egreso');
const frecuenciaField = document.getElementById('frecuencia-field');
const prioritarioField = document.getElementById('prioritario-field');

// Mostrar el campo de frecuencia cuando se selecciona "Ingreso"
ingresoRadio.addEventListener('change', () => {
        console.log("Presionado ingreso");
        if (ingresoRadio.checked) {
            frecuenciaField.classList.remove('d-none'); // Mostrar
            prioritarioField.classList.add('d-none'); // Ocultar
        }
});
    // Mostrar el campo de "Prioritario" cuando se selecciona "Egreso"
egresoRadio.addEventListener('change', () => {
        console.log("Presionado egreso");
        if (egresoRadio.checked) {
            prioritarioField.classList.remove('d-none'); // Mostrar
            console.log("Dentro 2");
            frecuenciaField.classList.add('d-none'); // Ocultar
        }
});




//registrarMovimiento(movimientos);
//mostrarResumenGeneral();
//mostrarResumenPorTipo();

/*Obtener nombres de movimientos*/
//let listarNombreMovimientos =  movimientos.map(elemento=>elemento.nombre);

//listarNombres(listarNombreMovimientos);


/* Filtrar egresos mayores a $100 */
//let filtrarEgresos = movimientos.filter(elemento => elemento.tipo === "egreso" && elemento.monto > 100);

//listarEgresos100(filtrarEgresos);

/*Buscar movimiento por nombre*/
//let nombreBuscar = prompt("Ingrese el nombre del movimiento a buscar:");
//let buscarxNombre=movimientos.find(elemento=>elemento.nombre==nombreBuscar);

//mostrarNombreBuscado(buscarxNombre,nombreBuscar);