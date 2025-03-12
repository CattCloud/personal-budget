# Registro de Movimientos Financieros

## Descripción
El programa permite registrar movimientos financieros, mostrando un resumen general y un resumen por tipo de movimiento. A través de ventanas de alerta, el usuario puede ingresar detalles de los movimientos, ver la cantidad total de movimientos registrados y el saldo total, así como un desglose de los montos por tipo (ingresos y egresos).

## Funciones Creadas
- **registrarMovimiento()**: Permite al usuario registrar movimientos financieros. Valida la entrada de datos y muestra alertas de error si es necesario.
- **mostrarResumenGeneral()**: Muestra el total de movimientos registrados y el saldo total (ingresos - egresos).
- **mostrarResumenPorTipo()**: Muestra un desglose de los montos registrados por tipo de movimiento (ingresos y egresos).
- **listarNombres()**: Muestra los nombres de los movimientos registrados.
- **listarEgresos100()**: Muestra los egresos mayores a $100.
- **mostrarNombreBuscado()**: Muestra los detalles de un movimiento buscado por nombre.

## Comparación entre Paradigmas Imperativo y Funcional
### Paradigma Imperativo
El paradigma imperativo se centra en cómo se deben realizar las tareas, especificando una secuencia de pasos para lograr un objetivo. Los lenguajes imperativos, como JavaScript en su forma tradicional, usan bucles, condicionales y mutaciones de estado para manipular datos y lograr resultados.

**Ventajas**:
- Claridad en la secuencia de operaciones.
- Fácil de entender para aquellos familiarizados con la programación tradicional.

**Desventajas**:
- Puede ser propenso a errores debido a la mutación de estados.
- Menos expresivo para operaciones sobre colecciones de datos.

### Paradigma Funcional
El paradigma funcional se centra en el uso de funciones puras (sin efectos secundarios) y la inmutabilidad. Se enfatiza qué se debe hacer, no cómo hacerlo, lo que puede llevar a un código más declarativo y menos propenso a errores.

**Ventajas**:
- Facilita la comprensión y el razonamiento sobre el código.
- Reducción de errores debido a la inmutabilidad y la ausencia de efectos secundarios.
- Más expresivo para operaciones sobre colecciones de datos (como map, filter, reduce).

**Desventajas**:
- Puede ser menos intuitivo para aquellos acostumbrados a la programación imperativa.
- A veces requiere un cambio de mentalidad significativo.

### Aplicación en el Proyecto
En este proyecto, he utilizado una mezcla de ambos paradigmas:
- **Imperativo**: Uso de bucles y condicionales para la secuencia de registro de movimientos.
- **Funcional**: Uso de métodos como `map`, `filter`, y `reduce` para manipular y transformar los datos de los movimientos.

## Reflexión sobre el Principio DRY
El principio DRY (Don't Repeat Yourself) promueve la reutilización del código y la reducción de duplicidad. En este proyecto, apliqué el principio DRY mediante:

- **Funciones Reutilizables**: Definí funciones específicas para cada operación (registro de movimientos, mostrar resúmenes, listar nombres, etc.), lo que permitió que el código fuera más modular y reutilizable.
- **Uso de Métodos de Array**: Utilicé métodos como `map`, `filter` y `reduce` para evitar escribir lógica repetitiva para operar sobre los datos de los movimientos.

---
