
function actualizarEquipo() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formato = ss.getSheetByName("Acta de Entrega");
  const equipos = ss.getSheetByName("Equipos");
  const movimientos = ss.getSheetByName("Movimientos");

  const nombre = formato.getRange("L1").getValue();
  const cedula = formato.getRange("L4").getValue();
  const cargo = formato.getRange("L5").getValue();
  const ubicacion = formato.getRange("L6").getValue();

  if (!nombre || !cedula || !ubicacion) {
    SpreadsheetApp.getUi().alert("Faltan datos de persona o ubicación");
    return;
  }

  const utilizado = nombre + " - CC " + cedula;

  const codigos = formato.getRange("A13:A25").getValues().flat();
  const data = equipos.getDataRange().getValues();

  let actualizados = 0;

  codigos.forEach(codigoEquipo => {

    if (!codigoEquipo) return;

    let fila = -1;

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == codigoEquipo) {
        fila = i + 1;
        break;
      }
    }

    if (fila === -1) return;

    const estadoActual = data[fila - 1][5];
    if (estadoActual === "Asignado") return;

    const descripcion = data[fila - 1][1];
    const marca = data[fila - 1][2];
    const modelo = data[fila - 1][3];
    const serial = data[fila - 1][4];

    // ✍️ Actualizar BD
    equipos.getRange(fila, 7).setValue(ubicacion);
    equipos.getRange(fila, 8).setValue(utilizado);
    equipos.getRange(fila, 6).setValue("Asignado");


    if (movimientos) {
      movimientos.appendRow([
        new Date(),
        codigoEquipo,
        descripcion,
        marca,
        modelo,
        serial,
        nombre,
        cedula,
        cargo,
        ubicacion,
        "ENTREGA",
        "OK"
      ]);
    }

    actualizados++;
  });


  SpreadsheetApp.getUi().alert(actualizados + " equipos actualizados");
}