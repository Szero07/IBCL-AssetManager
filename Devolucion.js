function devolverEquipos() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const formato = ss.getSheetByName("Acta de Entrega");
  const equipos = ss.getSheetByName("Equipos");
  const movimientos = ss.getSheetByName("Movimientos");

  const nombre = formato.getRange("L1").getValue();
  const cedula = formato.getRange("L4").getValue();
  const cargo = formato.getRange("L5").getValue();
  const ubicacion = formato.getRange("L6").getValue();

  const codigos = formato.getRange("A13:A25").getValues().flat();


  const data = equipos.getDataRange().getValues();


  const indiceEquipos = {};

  for (let i = 1; i < data.length; i++) {
    indiceEquipos[data[i][0]] = i + 1;
  }

  let procesados = 0;

  const noEncontrados = [];

  codigos.forEach(codigoEquipo => {

    if (!codigoEquipo) return;

    const fila = indiceEquipos[codigoEquipo];


    if (!fila) {
      noEncontrados.push(codigoEquipo);
      return;
    }


    const descripcion = data[fila - 1][1];
    const marca = data[fila - 1][2];
    const modelo = data[fila - 1][3];
    const serial = data[fila - 1][4];

    const ubicacionAnterior = data[fila - 1][6];
    const usuarioAnterior = data[fila - 1][7];
    
    

    equipos.getRange(fila, 6).setValue("Disponible"); // Estado
    equipos.getRange(fila, 7).setValue(""); // Ubicación
    equipos.getRange(fila, 8).setValue(""); // Utilizado


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
      ubicacionAnterior,
      "DEVOLUCION",
      "OK"
    ]);

    procesados++;

  });


  let mensaje = procesados + " equipos devueltos";

  if (noEncontrados.length > 0) {
    mensaje += "\nNo encontrados: " + noEncontrados.join(", ");
  }

  SpreadsheetApp.getUi().alert(mensaje);

}