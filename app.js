function Movimiento(tipo,monto,descripcion){

    this.tipo=tipo;
    this.monto=monto;
    this.descripcion=descripcion;
}

Movimiento.prototype.renderMovimiento = function() {

    const contenedorMovimiento=document.getElementById("contenedor_movimientos");
    
    // Crear el elemento <div class="col">
    const colDiv = document.createElement('div');
    colDiv.className = 'col';

    // Crear el elemento <div class="card text-center text-bg-danger">
    const cardDiv = document.createElement('div');
    if(this.tipo == "egreso"){
        cardDiv.className = 'card text-center text-bg-danger';
    }
    else{
        cardDiv.className = 'card text-center text-bg-success';
    }

    // Crear el elemento <div class="card-header">Egreso</div>
    const cardHeaderDiv = document.createElement('div');
    cardHeaderDiv.className = 'card-header';
    cardHeaderDiv.textContent = this.tipo.charAt(0).toUpperCase() + this.tipo.slice(1);

    // Crear el elemento <h4 class="card-title">Compras</h4>
    const cardTitleH4 = document.createElement('h4');
    cardTitleH4.className = 'card-title';
    cardTitleH4.textContent = this.descripcion;

    // Crear el elemento <p class="fs-2">$100</p>
    const cardTextP = document.createElement('p');
    cardTextP.className = 'fs-3';
    cardTextP.textContent = "S/"+this.monto;

    // Añadir los elementos al árbol DOM
    cardDiv.appendChild(cardHeaderDiv);
    cardDiv.appendChild(cardTitleH4);
    cardDiv.appendChild(cardTextP);
    colDiv.appendChild(cardDiv);

    contenedorMovimiento.appendChild(colDiv);
};


function registrarMovimiento() {
    console.log("Registro de Gastos");
    console.log("-----------------------");

    while (true) {
        let nombre = prompt("Ingrese el nombre del movimiento:"); //Usa la propiedad de input para requerir un valor si o si
        let tipo = prompt("Ingrese el tipo (Ingreso/Egreso):").toLowerCase();
            if (tipo !== "ingreso" && tipo !== "egreso") {
                console.log("Error: Tipo inválido. Debe ser 'Ingreso' o 'Egreso'.");
            } else {
                let monto = parseFloat(prompt("Ingrese el monto:"));
                if (isNaN(monto) || monto <= 0) {
                    console.log("Error: El monto debe ser un número mayor a 0.");
                } else {
                    //Creamos una instancia del objeto con los datos ingresados
                    movimientos.push(new Movimiento(tipo,monto,nombre));
                    console.log(`Nombre del movimiento: ${nombre}`);
                    console.log(`Tipo: ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`);
                    console.log(`Monto: $${monto.toFixed(2)}`);
                    //Renderizando el elemento en la interfaz
                    movimientos[movimientos.length-1].renderMovimiento();
                    let continuar = prompt("¿Registrar otro movimiento? (si/no):").toLowerCase();
                    if (continuar !== "si") break;
                    console.log("\n¿Registrar otro movimiento? (si/no): si\n");
                }
            }
    }
}


function mostrarResumenGeneral() {
    let totalMovimientos = movimientos.length;
    let saldoTotal = movimientos.reduce((acumulado, movimiento) => {
        return movimiento.tipo === "ingreso" ? acumulado + movimiento.monto : acumulado - movimiento.monto;
    }, 0);

    console.log("\nResumen Final");
    console.log("-----------------------");
    console.log(`Total de movimientos registrados: ${totalMovimientos}`);
    console.log(`Saldo total: $${saldoTotal.toFixed(2)}`);
}

function mostrarResumenPorTipo() {
    let resumenPorTipo = movimientos.reduce((resumen, movimiento) => {
        if (!resumen[movimiento.tipo]) {
            resumen[movimiento.tipo] = 0;
        }
        resumen[movimiento.tipo] += movimiento.monto;
        return resumen;
    }, {});

    console.log("\nDesglose por tipo:");
    for (let tipo in resumenPorTipo) {
        console.log(`- ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}: $${resumenPorTipo[tipo].toFixed(2)}`);
    }
}

function listarNombres(nombreMovimientos){
    console.log("Nombres de movimientos registrados:");
    console.log("["+nombreMovimientos.join()+"]");
}


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


const movimientos = [];


registrarMovimiento(movimientos);
mostrarResumenGeneral();
mostrarResumenPorTipo();

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