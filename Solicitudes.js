/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Solicitudes de Firma
 * Versión: 1.1.0
 * ============================================================
 */

const Solicitudes = (() => {

  /**
   * Hoja de solicitudes
   */
  function hoja() {

    return getBD().getSheetByName(CONFIG.HOJAS.SOLICITUDES);

  }

  /**
   * Genera un token único
   */
  function generarToken() {

    return Utilities.getUuid();

  }

  /**
   * Crear una nueva solicitud de firma
   */
  function crear(datos) {

    const token = generarToken();

    hoja().appendRow([

      token,

      datos.tipo,

      new Date(),

      datos.empleado.nombre,

      datos.empleado.cedula,

      "PENDIENTE",

      JSON.stringify(datos),

      "",

      ""

    ]);

    return token;

  }

  /**
   * Buscar una solicitud por token
   */
  function buscar(token) {

    const datos = hoja().getDataRange().getValues();

    for (let i = 1; i < datos.length; i++) {

      if (datos[i][0] == token) {

        return {

          fila: i + 1,

          token: datos[i][0],

          tipo: datos[i][1],

          fecha: datos[i][2],

          empleado: datos[i][3],

          cedula: datos[i][4],

          estado: datos[i][5],

          datos: JSON.parse(datos[i][6]),

          firma: datos[i][7],

          pdf: datos[i][8]

        };

      }

    }

    return null;

  }

  /**
   * Marcar una solicitud como firmada
   */
  function firmar(token, firma) {

    const solicitud = buscar(token);

    if (!solicitud) {

      throw new Error("La solicitud no existe.");

    }

    if (solicitud.estado === "FIRMADA") {

      throw new Error("La solicitud ya fue firmada.");

    }

    const hojaBD = hoja();

    hojaBD.getRange(solicitud.fila, 6).setValue("FIRMADA");

    hojaBD.getRange(solicitud.fila, 8).setValue(firma.id);

    solicitud.estado = "FIRMADA";
    solicitud.firma = firma.id;

    return solicitud;

  }

  /**
   * Procesa una firma completa
   * 1. Guarda el PNG en Drive
   * 2. Actualiza la solicitud
   */
  function procesarFirma(token, base64) {

    const firma = Firmas.guardar(token, base64);

    return firmar(token, firma);

  }

  /**
     * Guarda el PDF generado
     */
    function guardarPDF(token, pdf){

        const solicitud = buscar(token);

        if(!solicitud){

            throw new Error("La solicitud no existe.");

        }

        hoja().getRange(solicitud.fila,9).setValue(pdf.id);

        solicitud.pdf = pdf.id;

        return solicitud;

    }

    /**
   * Lista todas las solicitudes
   */
  function listar(){

    const datos = hoja()
      .getDataRange()
      .getValues();

    const lista = [];

    for(let i = 1; i < datos.length; i++){

      let solicitud = {};

      try{

        solicitud = JSON.parse(String(datos[i][6]));

      }catch(e){

        solicitud = {};

      }

      lista.push({

        token: datos[i][0],
        tipo: datos[i][1],
        fecha: datos[i][2],
        empleado: datos[i][3],
        cedula: datos[i][4],
        estado: datos[i][5],
        datos: solicitud,
        firma: datos[i][7],
        pdf: datos[i][8]

      });

    }

    lista.reverse();

    Logger.log("LISTA FINAL");
    Logger.log(JSON.stringify(lista));

    return lista;

  }


  return {

    crear,

    buscar,
    
    listar,

    firmar,

    guardarPDF,

    procesarFirma

  };

})();

/**
 * ============================================================
 * Funciones públicas
 * ============================================================
 */

function crearSolicitudFirma(datos) {

  return Solicitudes.crear(datos);

}

function obtenerSolicitud(token) {

  return Solicitudes.buscar(token);

}

function registrarFirmaSolicitud(token, firma) {

  return Solicitudes.firmar(token, firma);

}

function procesarFirma(token, base64) {

  return Solicitudes.procesarFirma(token, base64);

}

function guardarPDFSolicitud(token,pdf){

    return Solicitudes.guardarPDF(

        token,

        pdf

    );

}

function obtenerSolicitudes(){

  const lista = Solicitudes.listar();

  Logger.log("ANTES");
  Logger.log(Array.isArray(lista));

  return JSON.parse(JSON.stringify(lista));

}
