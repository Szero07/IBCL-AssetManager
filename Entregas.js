/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Entregas
 * Versión: 1.0.0
 * ============================================================
 */

const Entregas = (() => {

  /**
   * Registrar una entrega
   */
  function registrar(datos){

    const empleado = Personal.obtenerPorId(datos.empleadoId);

    if(!empleado){

      return{

        ok:false,

        mensaje:"Empleado no encontrado."

      };

    }

    let entregados = 0;

    for(const idEquipo of datos.equipos){

      const equipo = Equipos.buscar(idEquipo);

      if(!equipo){

        continue;

      }

      if(equipo.estado=="Asignado"){

        continue;

      }

      Equipos.entregar(

        idEquipo,

        empleado

      );

      Movimientos.registrarEntrega(

        equipo,

        empleado

      );

      entregados++;

    }

    return{

      ok:true,

      cantidad:entregados,

      mensaje:"Entrega realizada correctamente."

    };

  }

  return{

    registrar

  };

})();




function registrarEntrega(datos){

  return Entregas.registrar(datos);

}