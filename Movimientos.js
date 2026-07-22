/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Movimientos
 * Versión: 1.0.0
 * ============================================================
 */

const Movimientos = (() => {

  /**
   * Hoja de movimientos
   */
  function hoja(){

    return getBD().getSheetByName(CONFIG.HOJAS.MOVIMIENTOS);

  }

  /**
   * Registrar movimiento
   */
  function registrar(datos){

    hoja().appendRow([

      new Date(),

      datos.idEquipo,

      datos.descripcion,

      datos.marca,

      datos.modelo,

      datos.serial,

      datos.nombre,

      datos.cedula,

      datos.cargo,

      datos.ubicacion,

      datos.tipo,

      datos.observaciones || ""

    ]);

    return true;

  }

  /**
   * Registrar entrega
   */
  function registrarEntrega(equipo,empleado){

    return registrar({

      tipo:"ENTREGA",

      idEquipo:equipo.id,

      descripcion:equipo.descripcion,

      marca:equipo.marca,

      modelo:equipo.modelo,

      serial:equipo.serial,

      nombre:empleado.nombre,

      cedula:empleado.cedula,

      cargo:empleado.cargo,

      ubicacion:empleado.ubicacion,

      observaciones:"OK"

    });

  }

  /**
   * Registrar devolución
   */
  function registrarDevolucion(equipo,empleado){

    return registrar({

      tipo:"DEVOLUCION",

      idEquipo:equipo.id,

      descripcion:equipo.descripcion,

      marca:equipo.marca,

      modelo:equipo.modelo,

      serial:equipo.serial,

      nombre:empleado.nombre,

      cedula:empleado.cedula,

      cargo:empleado.cargo,

      ubicacion:empleado.ubicacion,

      observaciones:"OK"

    });

  }




  /**
 * Historial de un equipo
 */
  function buscarHistorial(idEquipo){

    try{

        const datos = hoja()
            .getDataRange()
            .getValues();

        const historial=[];

        for(let i=1;i<datos.length;i++){

            if(String(datos[i][1]) != String(idEquipo)){
                continue;
            }

            historial.push({

                fecha: Utilities.formatDate(
                    datos[i][0],
                    Session.getScriptTimeZone(),
                    "dd/MM/yyyy HH:mm"
                ),
                codigo:datos[i][1],
                descripcion:datos[i][2],
                marca:datos[i][3],
                modelo:datos[i][4],
                serial:datos[i][5],
                nombre:datos[i][6],
                cedula:datos[i][7],
                cargo:datos[i][8],
                ubicacion:datos[i][9],
                tipo:datos[i][10]

            });

        }

        Logger.log(historial);
        Logger.log(JSON.stringify(historial));

        return historial;

    }catch(e){

        Logger.log(e);

        throw e;

    }

}

  return{

    registrar,

    registrarEntrega,

    registrarDevolucion,

    buscarHistorial

  };

})();






function registrarMovimiento(datos){

  return Movimientos.registrar(datos);

}