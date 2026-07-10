/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Equipos
 * Versión: 1.0.0
 * ============================================================
 */

const Equipos = (() => {

  /**
   * Retorna la hoja Equipos
   */
  function hoja() {
    return getBD().getSheetByName(CONFIG.HOJAS.EQUIPOS);
  }

  /**
   * Obtiene todos los registros
   */
  function obtenerTodos() {

    const datos = hoja()
      .getDataRange()
      .getValues();

    datos.shift();

    return datos
      .filter(f => f[0] != "")
      .map(mapear);

  }

  /**
   * Convierte una fila en objeto
   */
  function mapear(fila) {

    return {

      id: fila[0],
      descripcion: fila[1],
      marca: fila[2],
      modelo: fila[3],
      serial: fila[4],
      estado: fila[5],
      ubicacion: fila[6],
      utilizado: fila[7]

    };

  }

  /**
   * Buscar por ID
   */
  function buscar(id){

    return obtenerTodos().find(e => e.id == id) || null;

  }

  /**
   * Buscar por Serial
   */
  function buscarPorSerial(serial){

    return obtenerTodos().find(e => e.serial == serial) || null;

  }

  /**
   * Equipos disponibles
   */
  function disponibles(){

    return obtenerTodos().filter(e =>

      e.estado != "Asignado"

    );

  }

  /**
   * Equipos asignados
   */
  function asignados(){

    return obtenerTodos().filter(e =>

      e.estado == "Asignado"

    );

  }

  /**
   * Buscar número de fila
   */
  function fila(id){

    const datos = hoja()
      .getDataRange()
      .getValues();

    for(let i=1;i<datos.length;i++){

      if(datos[i][0]==id){

        return i+1;

      }

    }

    return null;

  }

  /**
   * Actualizar un equipo
   */
  function actualizar(id,valores){

    const f=fila(id);

    if(!f) return false;

    const h=hoja();

    if(valores.estado!==undefined)
      h.getRange(f,6).setValue(valores.estado);

    if(valores.ubicacion!==undefined)
      h.getRange(f,7).setValue(valores.ubicacion);

    if(valores.utilizado!==undefined)
      h.getRange(f,8).setValue(valores.utilizado);

    return true;

  }

  /**
   * Entregar equipo
   */
  function entregar(id,empleado){

    return actualizar(id,{

      estado:"Asignado",

      ubicacion:empleado.ubicacion,

      utilizado:`${empleado.nombre} - CC ${empleado.cedula}`

    });

  }

  /**
   * Devolver equipo
   */
  function devolver(id){

    return actualizar(id,{

      estado:"Disponible",

      ubicacion:"",

      utilizado:""

    });

  }

  /**
   * Validar existencia
   */
  function existe(id){

    return buscar(id)!=null;

  }

  return{

    obtenerTodos,

    buscar,

    buscarPorSerial,

    disponibles,

    asignados,

    actualizar,

    entregar,

    devolver,

    existe

  };

})();




/**
 * ===========================================
 * Funciones públicas para el Frontend
 * ===========================================
 */

function buscarEquipo(id){

  return Equipos.buscar(id);

}

function obtenerEquipos(){

  return Equipos.obtenerTodos();

}

function obtenerEquiposDisponibles(){

  return Equipos.disponibles();

}

function obtenerEquiposAsignados(){

  return Equipos.asignados();

}