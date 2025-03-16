// Importar Movimiento
import Movimiento from './movimiento.js';

export default function Egreso(tipo, monto, descripcion, esPrioritario, fecha) {
    Movimiento.call(this, tipo, monto, descripcion, fecha);
    this.esPrioritario = esPrioritario; // Booleano para marcar prioridad
}

Egreso.prototype = Object.create(Movimiento.prototype);
Egreso.prototype.constructor = Egreso;

// Método para renderizar egreso en la tabla
Egreso.prototype.renderEgreso = function () {
    const expenseTableBody = document.getElementById("expenseTableBody");

    // Quitar el mensaje de "No hay egresos registrados" si existe
    const noExpenseRow = expenseTableBody.querySelector("tr");
    if (noExpenseRow && noExpenseRow.children.length === 1) {
        expenseTableBody.removeChild(noExpenseRow);
    }

    // Crear una nueva fila
    const newRow = document.createElement("tr");


    // Crear y asignar las celdas
    const descripcionCell = document.createElement("td");
    const textdescripcionCell = document.createElement("span");

    textdescripcionCell.textContent = this.descripcion.charAt(0).toUpperCase() + this.descripcion.slice(1);
    textdescripcionCell.className = "celda_tipo_egreso text-white px-1";
    textdescripcionCell.style.backgroundColor = "#fa9c06";
    descripcionCell.appendChild(textdescripcionCell);

    const prioridadCell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = this.esPrioritario; // Marcar si es prioritario
    checkbox.disabled = true; // Hacerlo no editable
    prioridadCell.appendChild(checkbox);

    const fechaCell = document.createElement("td");
    fechaCell.textContent = new Date(this.fecha).toLocaleDateString();

    const montoCell = document.createElement("td");
    montoCell.classList.add("text-end");
    montoCell.textContent = `$${this.monto.toFixed(2)}`;

    // Agregar las celdas a la fila
    newRow.appendChild(descripcionCell);
    newRow.appendChild(prioridadCell);
    newRow.appendChild(fechaCell);
    newRow.appendChild(montoCell);

    // Agregar la fila al cuerpo de la tabla
    expenseTableBody.appendChild(newRow);
};