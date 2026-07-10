function buscarEquipo(id){

  const hoja = getBD().getSheetByName(CONFIG.HOJAS.EQUIPOS);

  const datos = hoja.getDataRange().getValues();

  datos.shift();

  for(const fila of datos){

    if(fila[0]==id){

      return{

        id:fila[0],

        descripcion:fila[1],

        marca:fila[2],

        modelo:fila[3],

        serial:fila[4],

        estado:fila[5],

        ubicacion:fila[6],

        utilizado:fila[7]

      };

    }

  }

  return null;

}