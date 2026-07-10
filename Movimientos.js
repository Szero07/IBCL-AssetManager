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

      datos.tipo,

      datos.idEquipo,

      datos.descripcion,

      datos.marca,

      datos.modelo,

      datos.serial,

      datos.nombre,

      datos.cedula,

      datos.cargo,

      datos.ubicacion,

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

  return{

    registrar,

    registrarEntrega,

    registrarDevolucion

  };

})();






function registrarMovimiento(datos){

  return Movimientos.registrar(datos);

}