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

### **Backlog**

#### **HU1: Filtrado Avanzado de Movimientos**
**Como usuario**, quiero poder filtrar los movimientos por tipo (ingreso o egreso), rango de fechas y monto mínimo o máximo desde la vista de filtros, para encontrar fácilmente la información que necesito.

**Criterios de Aceptación:**
- Se deben implementar campos para seleccionar tipo, rango de fechas y rango de montos en la página `filter.html`.
- Los resultados de los filtros deben mostrarse dinámicamente en la tabla de movimientos.
- Incluir la opción de "Limpiar Filtros" para volver a mostrar todos los movimientos.

---

#### **HU2: Edición y Eliminación de Movimientos**
**Como usuario**, quiero poder editar o eliminar cualquier movimiento registrado desde la tabla de movimientos, para corregir errores o ajustar mi resumen financiero.

**Criterios de Aceptación:**
- Cada fila de la tabla debe incluir botones para editar o eliminar el movimiento.
- Al eliminar un movimiento, este debe ser eliminado del array global `movimientos` y la interfaz debe actualizarse.
- Al editar un movimiento, se debe mostrar un formulario con los datos actuales precargados para que puedan ser modificados.
- Recalcular automáticamente los totales al editar o eliminar.

---

#### **HU3: Exportar Movimientos a CSV**
**Como usuario**, quiero poder exportar mis movimientos registrados a un archivo CSV, para poder analizarlos en otras herramientas o compartirlos.

**Criterios de Aceptación:**
- Agregar un botón "Exportar CSV" que genere un archivo descargable con los datos actuales del array `movimientos`.
- El archivo CSV debe incluir columnas para tipo, descripción, fecha y monto.
- Asegurar que todos los movimientos visibles (filtrados o no) se incluyan en el archivo.

---

#### **HU4: Visualización Gráfica del Resumen Financiero**
**Como usuario**, quiero poder ver gráficos que representen mis ingresos, egresos y balances de manera visual, para entender más fácilmente mis datos financieros.

**Criterios de Aceptación:**
- Implementar gráficos de barras o circulares para mostrar:
  - Proporción de ingresos y egresos.
  - Evolución del saldo a lo largo del tiempo.
- Utilizar una biblioteca de gráficos (como Chart.js o D3.js).
- Los gráficos deben actualizarse automáticamente al registrar nuevos movimientos o aplicar filtros.

---

#### **HU5: Notificaciones de Presupuesto Excedido**
**Como usuario**, quiero recibir alertas visuales cuando mis egresos acumulados superen cierto porcentaje de mis ingresos, para tomar mejores decisiones financieras.

**Criterios de Aceptación:**
- Establecer un umbral personalizable de egresos, por ejemplo, el 80% de los ingresos.
- Mostrar una alerta en la interfaz (usando Bootstrap) cuando los egresos superen el umbral.
- La alerta debe desaparecer automáticamente si los egresos vuelven a estar por debajo del límite.

---

### **Conexión con la Aplicación Actual**

- **HU1:** Filtrado de movimientos ya tiene una base implementada con la redirección a `filter.html` y el manejo del array `movimientos` en `localStorage`.
- **HU2:** Aprovecha la estructura actual de la tabla para agregar acciones de edición y eliminación por fila.
- **HU3:** El array `movimientos` está listo para ser convertido a CSV, lo que facilita la implementación.
- **HU4:** Las tarjetas de resumen (`Balance`, `Ingresos`, `Egresos`) ya ofrecen cálculos que podrían integrarse a los gráficos.
- **HU5:** Los totales de ingresos y egresos recalculados automáticamente pueden usarse como base para determinar el umbral.

---
