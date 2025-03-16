// -------------------------------- Importaciones --------------------------------
import Ingreso from './class/ingreso.js';
import Egreso from './class/egreso.js';

// -------------------------------- Arrays Globales -----------------------------
//const movimientos = []; 
//Se ingresa un array con datos prueba para no ingresar valor por valor
const movimientos = [ new Ingreso("ingreso", 2500, "Salario mensual", "mensual", "2024-10-01"), new Ingreso("ingreso", 150, "Venta de libros", "unico", "2024-09-15"), new Ingreso("ingreso", 500, "Freelance diseño web", "semanal", "2024-11-10"), new Ingreso("ingreso", 200, "Reembolso de gastos", "unico", "2024-10-20"), new Ingreso("ingreso", 3000, "Bono anual", "anual", "2024-12-01"), new Ingreso("ingreso", 100, "Venta de ropa usada", "unico", "2024-10-05"), new Ingreso("ingreso", 1200, "Devolución de préstamo", "unico", "2024-09-30"), new Ingreso("ingreso", 600, "Trabajo extra", "mensual", "2024-11-20"), new Ingreso("ingreso", 300, "Regalo familiar", "unico", "2024-12-10"), new Ingreso("ingreso", 800, "Subsidio del gobierno", "mensual", "2024-11-05"), new Egreso("egreso", 120, "Compra de libros", true, "2024-09-15"), new Egreso("egreso", 300, "Pago de alquiler", true, "2024-10-01"), new Egreso("egreso", 50, "Cena en restaurante", false, "2024-11-05"), new Egreso("egreso", 200, "Gasolina", false, "2024-09-20"), new Egreso("egreso", 75, "Regalo de cumpleaños", false, "2024-12-10"), new Egreso("egreso", 600, "Reparación de auto", true, "2024-11-20"), new Egreso("egreso", 180, "Medicinas", true, "2024-10-15"), new Egreso("egreso", 450, "Pago de servicios públicos", true, "2024-10-10"), new Egreso("egreso", 100, "Entretenimiento", false, "2024-11-25"), new Egreso("egreso", 350, "Reparación de electrodomésticos", true, "2024-09-25") ];
const egresos = [];
const ingresos = [];

// -------------------------------- Referencias DOM -----------------------------
const form = document.getElementById("form-insert-movimiento");
const tipoIngreso = document.getElementById("ingreso");
const tipoEgreso = document.getElementById("egreso");
const descripcionInput = form.querySelector("input[placeholder='Descripción']");
const montoInput = form.querySelector("input[placeholder='Monto']");
const frecuenciaSelect = document.getElementById("frecuencia");
const prioritarioCheckbox = document.getElementById("prioritario");
const ingresoRadio = document.getElementById("ingreso");
const egresoRadio = document.getElementById("egreso");
const frecuenciaField = document.getElementById("frecuencia-field");
const prioritarioField = document.getElementById("prioritario-field");
const movementsTableBody = document.getElementById("movementsTableBody");
const filterFrequency = document.getElementById("filterFrequency");
const priorityYes = document.getElementById("priorityYes");
const priorityNo = document.getElementById("priorityNo");
const searchForm = document.getElementById("searchForm");
const filterDescriptionInput = document.getElementById("filterDescriptionAll");
const btnClearSearch = document.getElementById("btnClearSearch");
const filterSection = document.getElementById("filterSection");
const btnAplicarFilter = document.getElementById("btnAplicarFilter");

// -------------------------------- Funciones Globales --------------------------

// Función para mostrar mensajes en el modal
function mostrarAlertaModal(titulo, mensajes) {
    // Configurar el título del modal
    const modalTitle = document.getElementById("alertModalLabel");
    modalTitle.textContent = titulo;

    // Configurar el mensaje del modal
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.innerHTML = ""; // Limpiar mensajes previos

    // Agregar cada mensaje como un párrafo dentro del modal
    mensajes.forEach((mensaje) => {
        const mensajeElemento = document.createElement("p");
        mensajeElemento.textContent = mensaje;
        modalMessage.appendChild(mensajeElemento);
    });

    // Mostrar el modal utilizando Bootstrap
    const alertModal = new bootstrap.Modal(document.getElementById("alertModal"));
    alertModal.show();
}

// Función para limpiar la tabla de ingresos
function limpiarTablaIngresos() {
    const incomeTableBody = document.getElementById("incomeTableBody");
    incomeTableBody.innerHTML = ""; // Eliminar todo el contenido de la tabla
}

// Función para limpiar la tabla de egresos
function limpiarTablaEgresos() {
    const expenseTableBody = document.getElementById("expenseTableBody");
    expenseTableBody.innerHTML = ""; // Eliminar todo el contenido de la tabla
}


// Función para limpiar la tabla de movimientos
function limpiarTablaMovimientos() {
    const movementsTableBody = document.getElementById("movementsTableBody");
    movementsTableBody.innerHTML = ""; // Eliminar todo el contenido de la tabla
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
    fechaCell.textContent = new Date(`${movimiento.fecha}T00:00:00`).toLocaleDateString();

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


// Función para buscar y renderizar movimientos por descripción
function buscarPorDescripcion() {
    // Capturar el término ingresado en el input
    const terminoBusqueda = filterDescriptionInput.value.trim().toLowerCase();

    // Filtrar el array de movimientos
    const movimientosFiltrados = movimientos.filter(movimiento => {
        return movimiento.descripcion.toLowerCase().includes(terminoBusqueda);
    });


    // Limpiar la tabla antes de renderizar
    limpiarTablaMovimientos();

    // Renderizar los movimientos filtrados
    if (movimientosFiltrados.length === 0) {
        // Mostrar mensaje si no se encontraron movimientos
        const movementsTableBody = document.getElementById("movementsTableBody");
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `<td colspan="4" class="text-center text-muted">No se encontraron movimientos</td>`;
        movementsTableBody.appendChild(noDataRow);
        return;
    }

    movimientosFiltrados.forEach(movimiento => agregarMovimientoATabla(movimiento));
}

// Función para filtrar y renderizar ingresos
function filtrarIngresos() {
    // Capturar el valor del select
    const frecuenciaSeleccionada = filterFrequency.value;

    // Filtrar el array de ingresos
    const ingresosFiltrados = ingresos.filter(ingreso => {
        // Si "Todas las Frecuencias" está seleccionada, mostrar todo
        if (frecuenciaSeleccionada === "") return true;

        // Filtrar por la propiedad frecuencia
        console.log(ingreso.frecuencia+"-"+frecuenciaSeleccionada);
        return ingreso.frecuencia === frecuenciaSeleccionada;
    });

    // Limpiar la tabla antes de renderizar
    limpiarTablaIngresos();

    // Renderizar cada ingreso filtrado
    if (ingresosFiltrados.length === 0) {
        // Si no hay ingresos que cumplan con el filtro, mostrar mensaje
        const incomeTableBody = document.getElementById("incomeTableBody");
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `<td colspan="4" class="text-center text-muted">No se encontraron ingresos</td>`;
        incomeTableBody.appendChild(noDataRow);
        return;
    }

    ingresosFiltrados.forEach(ingreso => ingreso.renderIngreso());
}


// Función para filtrar y renderizar egresos
function filtrarEgresos() {
    const mostrarPrioritarios = priorityYes.checked;
    const mostrarNoPrioritarios = priorityNo.checked;

    // Filtrar el array de egresos
    const egresosFiltrados = egresos.filter(egreso => {
        // Mostrar todo si ambos checkboxes están marcados
        if (mostrarPrioritarios && mostrarNoPrioritarios) return true;

        // Mostrar solo prioritarios o no prioritarios según el estado de los checkboxes
        if (mostrarPrioritarios) return egreso.esPrioritario === true;
        if (mostrarNoPrioritarios) return egreso.esPrioritario === false;

        // Si ninguno está marcado, no se muestra nada
        return false;
    });

    // Limpiar la tabla antes de renderizar
    limpiarTablaEgresos();

    // Renderizar cada egreso filtrado
    if (egresosFiltrados.length === 0) {
        // Si no hay egresos que cumplan con el filtro, mostrar mensaje
        const expenseTableBody = document.getElementById("expenseTableBody");
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `<td colspan="4" class="text-center text-muted">No se encontraron egresos</td>`;
        expenseTableBody.appendChild(noDataRow);
        return;
    }

    egresosFiltrados.forEach(egreso => egreso.renderEgreso());
}

// Función para limpiar la búsqueda y los filtros, y renderizar todos los movimientos
function limpiarBusqueda() {
    // Limpiar el valor del campo de búsqueda
    filterDescriptionInput.value = "";

    // Limpiar los valores de los campos de filtro
    document.getElementById("filterDate").value = ""; // Limpiar la fecha
    document.getElementById("minAmountAll").value = ""; // Limpiar monto mínimo
    document.getElementById("maxAmountAll").value = ""; // Limpiar monto máximo

    // Limpiar la tabla de movimientos
    limpiarTablaMovimientos();

    // Renderizar todos los movimientos
    movimientos.forEach(movimiento => agregarMovimientoATabla(movimiento));
}

// Función para aplicar los filtros
function aplicarFiltros() {
    // Obtener valores de los filtros
    const fechaSeleccionada = document.getElementById("filterDate").value; // Fecha única
    const minAmount = parseFloat(document.getElementById("minAmountAll").value) || 0; // Por defecto: 0
    const maxAmount = parseFloat(document.getElementById("maxAmountAll").value) || 1000000; // Por defecto: 1000000

    //Se puede combinar con el filtro de busqueda
    let arrayxFiltrar;
    if(filterDescriptionInput.value!=""){
        // Capturar el término ingresado en el input
         const terminoBusqueda = filterDescriptionInput.value.trim().toLowerCase();
        // Filtrar el array de movimientos
        arrayxFiltrar = movimientos.filter(movimiento => {
            return movimiento.descripcion.toLowerCase().includes(terminoBusqueda);
        });
    }
    else{
        arrayxFiltrar=movimientos;
    }


    // Filtrar los movimientos
    const movimientosFiltrados = arrayxFiltrar.filter(movimiento => {
        // Filtrar por fecha única (si se especifica)
        const fechaMovimiento = new Date(movimiento.fecha).toISOString().split('T')[0]; // Convertir fecha a formato YYYY-MM-DD
        const coincideFecha = fechaSeleccionada ? fechaMovimiento === fechaSeleccionada : true;

        console.log(fechaSeleccionada+"-"+fechaMovimiento);
        
        // Filtrar por rango de montos
        const coincideMonto = movimiento.monto >= minAmount && movimiento.monto <= maxAmount;

        // Retornar solo movimientos que cumplan con ambos criterios
        return coincideFecha && coincideMonto;
    });

    // Limpiar la tabla antes de renderizar
    limpiarTablaMovimientos();

    // Renderizar los movimientos filtrados
    if (movimientosFiltrados.length === 0) {
        // Si no hay movimientos que cumplan con los filtros
        const movementsTableBody = document.getElementById("movementsTableBody");
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `<td colspan="4" class="text-center text-muted">No se encontraron movimientos</td>`;
        movementsTableBody.appendChild(noDataRow);
        return;
    }

    movimientosFiltrados.forEach(movimiento => agregarMovimientoATabla(movimiento));
}

//Solo para cuando el array tenga elementos establecidos sin usar el form de registro
function addMovimientoUI(){
    //Llenar las tablas
    movimientos.forEach(movimiento => {
        agregarMovimientoATabla(movimiento);
        if (movimiento.tipo === "ingreso") {
            ingresos.push(movimiento);
            movimiento.renderIngreso();
        } else {
            egresos.push(movimiento);
            movimiento.renderEgreso();
        }
    });
    //Actualizar las tarjetas
    movimientos[0].recalcularTotales(movimientos);
}

// -------------------------------- Manejadores de Eventos ----------------------

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


// Eventos para los checkboxes
priorityYes.addEventListener("change", filtrarEgresos);
priorityNo.addEventListener("change", filtrarEgresos);


// Evento para filtrar al cambiar el valor del select
filterFrequency.addEventListener("change", filtrarIngresos);

btnAplicarFilter.addEventListener("click", () => {
    aplicarFiltros(); // Aplicar los filtros
});

// Evento para el botón de limpiar búsqueda
btnClearSearch.addEventListener("click", limpiarBusqueda);


// Evento para el formulario
searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    buscarPorDescripcion(); // Ejecutar la búsqueda
});



// Función para manejar el envío del formulario
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar recargar pagina


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
        // Crear la fecha local sin horas
    const hoy = new Date(); // Fecha actual
    const fechaLocal = hoy.getFullYear()+"-"+String(hoy.getMonth() + 1).padStart(2, '0')+"-"+String(hoy.getDate()).padStart(2, '0');
    
    console.log(fechaLocal);

    if (tipo === "ingreso") {
        movimiento = new Ingreso(tipo, monto, descripcion, frecuencia,fechaLocal);
        ingresos.push(movimiento);
    } else {
        movimiento = new Egreso(tipo, monto, descripcion, prioritario,fechaLocal);
        egresos.push(movimiento);
    }
    movimientos.push(movimiento);
    
    agregarMovimientoATabla(movimiento);
    if (tipo === "ingreso") {
        movimiento.renderIngreso();
    } else {
        movimiento.renderEgreso();
    }

    // Mostrar mensaje de éxito
    mostrarAlertaModal("Movimiento Registrado", ["El movimiento se registró exitosamente."]);    // Limpiar el formulario
    clearFormulario(tipo);

    movimiento.recalcularTotales(movimientos);
});


//Solo porque el array movimientos se inicializa con datos
addMovimientoUI();