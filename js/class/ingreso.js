// Importar Movimiento
import Movimiento from './movimiento.js';

export default function Ingreso(tipo, monto, descripcion, frecuencia, fecha) {
    Movimiento.call(this, tipo, monto, descripcion, fecha);
    this.frecuencia = frecuencia; // Anual, mensual, etc.
}

Ingreso.prototype = Object.create(Movimiento.prototype);
Ingreso.prototype.constructor = Ingreso;

//Metodo para renderizar el ingreso en la tabla de ingresos

Ingreso.prototype.renderIngreso = function () {
    const incomeTableBody = document.getElementById("incomeTableBody");

    // Eliminar el mensaje de "No hay ingresos registrados" si existe
    const noIncomeRow = incomeTableBody.querySelector("tr");
    if (noIncomeRow && noIncomeRow.children.length === 1) {
        incomeTableBody.removeChild(noIncomeRow);
    }

    // Crear una nueva fila
    const newRow = document.createElement("tr");

    // Crear y asignar las celdas
    const descripcionCell = document.createElement("td");
    const textdescripcionCell = document.createElement("span");

    textdescripcionCell.textContent = this.descripcion.charAt(0).toUpperCase() + this.descripcion.slice(1);
    textdescripcionCell.className = "celda_tipo_ingreso text-white px-1";
    textdescripcionCell.style.backgroundColor = "#183461";
    descripcionCell.appendChild(textdescripcionCell);

    const frecuenciaCell = document.createElement("td");
    frecuenciaCell.textContent = this.frecuencia.charAt(0).toUpperCase() + this.frecuencia.slice(1);

    const fechaCell = document.createElement("td");
    fechaCell.textContent = new Date(this.fecha).toLocaleDateString();

    const montoCell = document.createElement("td");
    montoCell.classList.add("text-end");
    montoCell.textContent = `$${this.monto.toFixed(2)}`;

    // Agregar las celdas a la fila
    newRow.appendChild(descripcionCell);
    newRow.appendChild(frecuenciaCell);
    newRow.appendChild(fechaCell);
    newRow.appendChild(montoCell);

    // Agregar la fila al cuerpo de la tabla
    incomeTableBody.appendChild(newRow);
};