/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Plantillas
 * ============================================================
 */

const Plantillas = (() => {

  /**
   * Obtiene el ID de la plantilla según el tipo
   */
  function obtenerPlantilla(tipo){

    if(String(tipo).toUpperCase() == "DEVOLUCION"){

      return CONFIG.PLANTILLAS.DEVOLUCION;

    }

    return CONFIG.PLANTILLAS.ENTREGA;

  }

  /**
   * Crear copia temporal
   */
  function copiar(tipo){

    const archivo = DriveApp.getFileById(

      obtenerPlantilla(tipo)

    );

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
  function reemplazar(doc,variables){

    const body = doc.getBody();

    Object.keys(variables).forEach(clave=>{

      body.replaceText(

        "{{"+clave+"}}",

        variables[clave] ?? ""

      );

    });

    return doc;

  }

  /**
   * Guardar documento
   */
  function guardar(doc){

    return doc;

  }

  return{

    copiar,

    reemplazar,

    guardar

  };

})();






function copiarPlantilla(tipo){

  return Plantillas.copiar(tipo);

}

function reemplazarVariables(doc,variables){

  return Plantillas.reemplazar(

    doc,

    variables

  );

}

function guardarPlantilla(doc){

  return Plantillas.guardar(doc);

}