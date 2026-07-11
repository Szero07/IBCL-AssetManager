/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Plantillas
 * ============================================================
 */

const Plantillas = (()=>{

    /**
     * Crear copia temporal
     */
    function copiarActa(){

        const archivo = DriveApp

            .getFileById(

                CONFIG.PLANTILLAS.ACTA

            );

        const copia = archivo.makeCopy(

            "TMP_"+Utilities.getUuid()

        );

        return{

            id:copia.getId(),

            documento:DocumentApp.openById(

                copia.getId()

            )

        };

    }

    return{

        copiarActa

    };

})();






function copiarPlantillaActa(){

    return Plantillas.copiarActa();

}