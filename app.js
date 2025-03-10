

function registrarMovimiento() {
    while (true) {
        let nombre = prompt("Ingrese el nombre del movimiento:");
        if (!nombre) {
            alert("Error: El nombre no puede estar vacío.");
        } else {
            let tipo = prompt("Ingrese el tipo (Ingreso/Egreso):").toLowerCase();
            if (tipo !== "ingreso" && tipo !== "egreso") {
                alert("Error: Tipo inválido. Debe ser 'Ingreso' o 'Egreso'.");
            } else {
                let monto = parseFloat(prompt("Ingrese el monto:"));
                if (isNaN(monto) || monto <= 0) {
                    alert("Error: El monto debe ser un número mayor a 0.");
                } else {
                    movimientos.push({ nombre, tipo, monto });
                    alert("Movimiento registrado con éxito.");
                    
                    let continuar = prompt("¿Desea registrar otro movimiento? (si/no):").toLowerCase();
                    if (continuar !== "si") break;
                }
            }
        }
    }
}

function mostrarResumenGeneral() {
let totalMovimientos = movimientos.length;
let saldoTotal = movimientos.reduce((acumulado, movimiento) => {
    return movimiento.tipo === "ingreso" ? acumulado + movimiento.monto : acumulado - movimiento.monto;
}, 0);

alert(`Resumen General\nCantidad de movimientos registrados: ${totalMovimientos}\nMonto total del saldo: $${saldoTotal.toFixed(2)}`);
}

function mostrarResumenPorTipo() {
let resumenPorTipo = movimientos.reduce((resumen, movimiento) => {
    if (!resumen[movimiento.tipo]) {
        resumen[movimiento.tipo] = 0;
    }
    resumen[movimiento.tipo] += movimiento.monto;
    return resumen;
}, {});

let mensaje = 'Resumen por Tipo:\n';
for (let tipo in resumenPorTipo) {
    mensaje += `${tipo.charAt(0).toUpperCase() + tipo.slice(1)}: $${resumenPorTipo[tipo].toFixed(2)}\n`;
}

alert(mensaje);
}

const movimientos = [];

registrarMovimiento(movimientos);
mostrarResumenGeneral();
mostrarResumenPorTipo();