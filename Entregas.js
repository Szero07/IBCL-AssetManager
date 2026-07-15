/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Entregas
 * Versión: 2.0.0
 * ============================================================
 */

const Entregas = (() => {

  /**
   * Inicia una entrega.
   * No modifica la BD todavía.
   */
  function registrar(datos){

    const empleado = Personal.obtenerPorId(

      datos.empleadoId

    );

    if(!empleado){

      return{

        ok:false,

        mensaje:"Empleado no encontrado."

      };

    }

    //-----------------------------------------
    // Validar equipos
    //-----------------------------------------

    const equipos=[];

    for(const id of datos.equipos){

      const equipo=Equipos.buscar(id);

      if(!equipo){

        continue;

      }

      if(equipo.estado=="Asignado"){

        continue;

      }

      equipos.push(equipo);

    }

    if(equipos.length==0){

      return{

        ok:false,

        mensaje:"No existen equipos disponibles."

      };

    }

    //-----------------------------------------
    // Crear solicitud de firma
    //-----------------------------------------

    const token = Solicitudes.crear({

      tipo:"ENTREGA",

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
   * Finaliza la entrega
   * Se ejecuta después de la firma.
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
    // PDF
    //-----------------------------------------

    const pdf = PDF.generar(token);

    //-----------------------------------------
    // Actualizar equipos
    //-----------------------------------------

    datos.equipos.forEach(eq=>{

      Equipos.entregar(

        eq.id,

        datos.empleado

      );

      Movimientos.registrarEntrega(

        eq,

        datos.empleado

      );

    });

    return{

      ok:true,

      pdf:pdf,

      mensaje:"Entrega registrada correctamente."

    };

  }

  return{

    registrar,

    finalizar

  };

})();





function registrarEntrega(datos){

  return Entregas.registrar(datos);

}

function finalizarEntrega(token){

  return Entregas.finalizar(token);

}