function obtenerPersonal() {

  const hoja = getBD().getSheetByName(CONFIG.HOJAS.PERSONAL);

  const datos = hoja.getDataRange().getValues();

  datos.shift();

  return datos.map(fila => ({

    id: fila[0],
    cedula: fila[1],
    nombre: fila[2],
    cargo: fila[3],
    ubicacion: fila[4]

  }));

}