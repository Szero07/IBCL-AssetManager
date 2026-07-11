/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Firmas
 * ============================================================
 */

const Firmas = (()=>{

    /**
     * Carpeta donde se almacenan las firmas
     */
    function carpeta(){

        return DriveApp.getFolderById(

            CONFIG.FIRMAS.CARPETA_ID

        );

    }

    /**
     * Convierte Base64 en Blob
     */
    function convertir(base64,nombre){

        base64 = base64.replace(

            /^data:image\/png;base64,/,

            ""

        );

        const bytes = Utilities.base64Decode(base64);

        return Utilities.newBlob(

            bytes,

            "image/png",

            nombre

        );

    }

    /**
     * Guarda una firma
     */
    function guardar(token,base64){

        const blob = convertir(

            base64,

            token+".png"

        );

        const archivo = carpeta()

            .createFile(blob);

        return{

            id:archivo.getId(),

            nombre:archivo.getName(),

            url:archivo.getUrl()

        };

    }

    return{

        guardar

    };

})();





function guardarFirma(token,base64){

    return Firmas.guardar(

        token,

        base64

    );

}