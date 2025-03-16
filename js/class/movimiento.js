// Movimiento.js
export default function Movimiento(tipo, monto, descripcion, fecha) {
    this.tipo = tipo;
    this.monto = monto;
    this.descripcion = descripcion;
    this.fecha = fecha;
}


// Método prototípico para recalcular totales
Movimiento.prototype.recalcularTotales = function(movimientos) {

    const cardEgresoInfo = document.getElementById("card-info-egreso");
    const cardIngresoInfo = document.getElementById("card-info-ingreso");
    const cardBalanceInfo = document.getElementById("card-info-balance");
    const cardTotalMovInfo = document.getElementById("card-info-totalmov");

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
