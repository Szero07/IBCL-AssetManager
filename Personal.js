/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Personal
 * Versión: 1.0.0
 * ============================================================
 */

const Personal = (() => {

  /**
   * Retorna la hoja Personal
   */
  function hoja() {
    return getBD().getSheetByName(CONFIG.HOJAS.PERSONAL);
  }

  /**
   * Convierte una fila en un objeto
   */
  function mapear(fila) {
    return {
      id: fila[0],
      cedula: fila[1],
      nombre: fila[2],
      cargo: fila[3],
      ubicacion: fila[4]
    };
  }

  /**
   * Retorna todos los empleados
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
   * Buscar por ID
   */
  function obtenerPorId(id) {

    return obtenerTodos().find(e => String(e.id) === String(id)) || null;

  }

  /**
   * Buscar por nombre
   */
  function buscar(texto) {

    texto = texto.toLowerCase();

    return obtenerTodos().filter(e =>

      e.nombre.toLowerCase().includes(texto) ||

      String(e.cedula).includes(texto) ||

      e.cargo.toLowerCase().includes(texto)

    );

  }

  /**
   * Buscar por cédula
   */
  function obtenerPorCedula(cedula){

    return obtenerTodos().find(e=>String(e.cedula)==String(cedula)) || null;

  }

  /**
   * Validar existencia
   */
  function existe(id){

    return obtenerPorId(id)!=null;

  }

  return{

    obtenerTodos,

    obtenerPorId,

    obtenerPorCedula,

    buscar,

    existe

  };

})();






/**
 * ===========================================
 * Funciones públicas para el Frontend
 * ===========================================
 */

function obtenerPersonal(){

  return Personal.obtenerTodos();

}

function obtenerEmpleado(id){

  return Personal.obtenerPorId(id);

}