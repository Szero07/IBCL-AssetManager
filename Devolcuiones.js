/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Devoluciones
 * Versión: 2.0.0
 * ============================================================
 */

const Devoluciones = (() => {

  /**
   * Crear solicitud de devolución
   */
  function registrar(datos){

    const equipos = [];

    let empleado = null;

    for(const id of datos.equipos){

      const equipo = Equipos.buscar(id);

      if(!equipo){
        continue;
      }

      if(equipo.estado != "Asignado"){
        continue;
      }

      if(!empleado){

        empleado = Personal.obtenerPorTexto(

          equipo.utilizado

        );

      }

      equipos.push(equipo);

    }

    if(equipos.length == 0){

      return{

        ok:false,

        mensaje:"No existen equipos para devolver."

      };

    }

    //-----------------------------------------
    // Crear solicitud
    //-----------------------------------------

    const token = Solicitudes.crear({

      tipo:"DEVOLUCION",

      fecha:new Date(),

      empleado:empleado,

      equipos:equipos,

      observaciones:datos.observaciones || ""

    });

    return{

      ok:true,

      token:token,

      mensaje:"Solicitud creada correctamente."

    };

  }

  /**
   * Finalizar devolución
   */
  function finalizar(token){

    const solicitud = Solicitudes.buscar(token);

    if(!solicitud){

      throw new Error(

        "Solicitud no encontrada."

      );

    }

    const datos = solicitud.datos;

    //-----------------------------------------
    // Generar PDF
    //-----------------------------------------

    const pdf = PDF.generar(token);

    //-----------------------------------------
    // Actualizar inventario
    //-----------------------------------------

    datos.equipos.forEach(eq=>{

      Equipos.devolver(eq.id);

      Movimientos.registrarDevolucion(

        eq,

        datos.empleado

      );

    });

    return{

      ok:true,

      pdf:pdf,

      mensaje:"Devolución registrada correctamente."

    };

  }

  return{

    registrar,

    finalizar

  };

})();

function registrarDevolucion(datos){

  return Devoluciones.registrar(datos);

}

function finalizarDevolucion(token){

  return Devoluciones.finalizar(token);

}