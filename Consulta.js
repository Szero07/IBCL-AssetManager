/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Consulta
 * ============================================================
 */

const Consulta = (() => {

  /**
   * Buscar un equipo por código
   */
  function buscar(codigo){

    const equipo = Equipos.buscar(codigo);

    if(!equipo){

      return null;

    }

    //-------------------------------------------------
    // Buscar responsable
    //-------------------------------------------------

    let responsable = null;

    if(
      equipo.estado == "Asignado" &&
      equipo.utilizado
    ){

      responsable = Personal.obtenerPorTexto(
        equipo.utilizado
      );

    }

    //-------------------------------------------------
    // Historial
    //-------------------------------------------------

    let historial = [];

    try{

        historial = Movimientos.buscarHistorial(equipo.id);

    }catch(e){

        Logger.log(e);

    }

    Logger.log("Historial encontrado: " + historial.length);
    Logger.log(JSON.stringify(historial));

    //-------------------------------------------------
    // Resultado
    //-------------------------------------------------

    return{

      equipo,

      responsable,

      historial

    };

  }

  return{

    buscar

  };

})();

function consultarEquipo(codigo){

  return Consulta.buscar(codigo);

}