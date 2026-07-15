/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Plantillas
 * ============================================================
 */

const Plantillas = (() => {

  /**
   * Crear copia temporal de la plantilla
   */
  function copiar() {

    const archivo = DriveApp
      .getFileById(CONFIG.PLANTILLAS.ACTA);

    const copia = archivo.makeCopy(
      "TMP_" + Utilities.getUuid()
    );

    return DocumentApp.openById(
      copia.getId()
    );

  }

  /**
   * Reemplazar marcadores
   */
  function reemplazar(doc, variables) {

    const body = doc.getBody();

    Object.keys(variables).forEach(clave => {

      body.replaceText(
        "{{" + clave + "}}",
        variables[clave] ?? ""
      );

    });

    // IMPORTANTE:
    // NO cerramos el documento aquí.
    // Actas continuará modificándolo.

    return doc;

  }

  /**
   * Guardar documento
   */
  function guardar(doc){

    doc.saveAndClose();

    return true;

  }

  return {

    copiar,

    reemplazar,

    guardar

  };

})();





function copiarPlantilla(){

  return Plantillas.copiar();

}

function reemplazarVariables(doc, variables){

  return Plantillas.reemplazar(
      doc,
      variables
  );

}

function guardarPlantilla(doc){

  return Plantillas.guardar(doc);

}