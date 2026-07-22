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
  /**
 * Obtiene la tabla de equipos
 * Buscando el encabezado de la tabla.
 */
function obtenerTabla(doc){

    const body = doc.getBody();

    const tablas = body.getTables();

    for(const tabla of tablas){

        if(tabla.getNumRows()==0){

            continue;

        }

        const encabezado = tabla.getRow(0);

        if(encabezado.getNumCells()<6){

            continue;

        }

        const c1 = encabezado.getCell(0).getText().trim().toUpperCase();
        const c2 = encabezado.getCell(1).getText().trim().toUpperCase();
        const c3 = encabezado.getCell(2).getText().trim().toUpperCase();

        if(

            c1=="ID" &&

            c2.includes("ELEMENTO ENTREGADO") &&

            c3=="MARCA"

        ){

            return tabla;

        }

    }

    throw new Error(

        "No se encontró la tabla de equipos en la plantilla."

    );

}

  /**
   * Llena la tabla de equipos
   * utilizando las filas vacías de la plantilla.
   */
  function llenarTabla(doc, equipos) {

      const tabla = obtenerTabla(doc);
      if (equipos.length > tabla.getNumRows() - 1) {

          throw new Error(
              "La plantilla solo soporta " +
              (tabla.getNumRows() - 1) +
              " equipos."
          );

      }

      equipos.forEach((eq, i) => {

          // La fila 0 es el encabezado
          const fila = tabla.getRow(i + 1);

          fila.getCell(0).setText(eq.id || "");

          fila.getCell(1).setText(eq.descripcion || "");

          fila.getCell(2).setText(eq.marca || "");

          fila.getCell(3).setText(eq.modelo || "");

          fila.getCell(4).setText(eq.serial || "");

          fila.getCell(5).setText(
              eq.observaciones ||
              eq.estado ||
              ""
          );

      });

  }

  /**
   * Variables para la plantilla
   */
  /**
 * Construye el objeto de variables
 */
function obtenerVariables(datos) {

  const fecha = new Date(datos.fecha);

  const zona = Session.getScriptTimeZone();

  return {

    TIPO: datos.tipo || "",

    FECHA: Utilities.formatDate(
      fecha,
      zona,
      "dd/MM/yyyy"
    ),

    HORA: Utilities.formatDate(
      fecha,
      zona,
      "HH:mm"
    ),

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

      const texto = parrafo.editAsText();

      const indice = texto.getText().indexOf(marcador);

      if(indice === -1){
          return;
      }

      texto.deleteText(
          indice,
          indice + marcador.length - 1
      );

      const imagen = parrafo.insertInlineImage(
          indice,
          blob
      );

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