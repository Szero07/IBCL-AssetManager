/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Actas
 * ============================================================
 */

const Actas = (() => {

  /**
   * Obtiene la primera tabla del documento
   */
  function obtenerTabla(doc) {

    const tablas = doc.getBody().getTables();

    if (tablas.length === 0) {

      throw new Error("La plantilla no contiene una tabla.");

    }

    return tablas[0];

  }

  /**
   * Llena la tabla de equipos
   */
  function llenarTabla(doc, equipos) {

    const tabla = obtenerTabla(doc);

    equipos.forEach(eq => {

      const fila = tabla.appendTableRow();

      fila.appendTableCell(eq.id || "");

      fila.appendTableCell(eq.descripcion || "");

      fila.appendTableCell(eq.marca || "");

      fila.appendTableCell(eq.modelo || "");

      fila.appendTableCell(eq.serial || "");

      fila.appendTableCell(eq.observaciones || "");

    });

    return doc;

  }

  /**
   * Variables para la plantilla
   */
  function obtenerVariables(datos) {

    return {

      TIPO: datos.tipo || "",

      FECHA: datos.fecha || "",

      EMPLEADO: datos.empleado.nombre || "",

      CEDULA: datos.empleado.cedula || "",

      CARGO: datos.empleado.cargo || "",

      UBICACION: datos.empleado.ubicacion || "",

      OBSERVACIONES: datos.observaciones || ""

    };

  }

  /**
   * Busca un marcador dentro del documento
   */
  function buscarMarcador(body, marcador){

    const encontrado = body.findText(marcador);

    if(!encontrado){

      return null;

    }

    return encontrado.getElement().getParent();

  }

  /**
   * Inserta una imagen reemplazando un marcador
   */
  function insertarImagen(parrafo, marcador, blob){

    if(!parrafo){

      return;

    }

    parrafo.setText("");

    const imagen = parrafo.appendInlineImage(blob);

    imagen.setWidth(170);

    imagen.setHeight(70);

  }

  /**
   * Inserta las firmas en el documento
   */
  function insertarFirmas(doc, solicitud){

    const body = doc.getBody();

    //----------------------------------------
    // Firma empleado
    //----------------------------------------

    if(solicitud.firma){

      const archivoEmpleado = DriveApp.getFileById(

        solicitud.firma

      );

      const blobEmpleado = archivoEmpleado.getBlob();

      insertarImagen(

        buscarMarcador(

          body,

          "{{FIRMA_EMPLEADO}}"

        ),

        "{{FIRMA_EMPLEADO}}",

        blobEmpleado

      );

    }

    //----------------------------------------
    // Firma TI
    //----------------------------------------

    if(CONFIG.FIRMAS.FIRMA_TI){

      const archivoTI = DriveApp.getFileById(

        CONFIG.FIRMAS.FIRMA_TI

      );

      const blobTI = archivoTI.getBlob();

      insertarImagen(

        buscarMarcador(

          body,

          "{{FIRMA_TI}}"

        ),

        "{{FIRMA_TI}}",

        blobTI

      );

    }

    return doc;

  }

  return {

    llenarTabla,

    obtenerVariables,

    insertarFirmas

  };

})();






function llenarTablaEquipos(doc,equipos){

  return Actas.llenarTabla(

    doc,

    equipos

  );

}

function obtenerVariablesActa(datos){

  return Actas.obtenerVariables(

    datos

  );

}

function insertarFirmasActa(doc,solicitud){

  return Actas.insertarFirmas(

    doc,

    solicitud

  );

}