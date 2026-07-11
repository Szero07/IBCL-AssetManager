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

    doc.saveAndClose();

    return doc;

  }

  return {

    copiar,

    reemplazar

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