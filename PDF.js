/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: PDF
 * ============================================================
 */

const PDF = (() => {

    /**
     * Carpeta donde se almacenan los PDF
     */
    function carpeta(){

        return DriveApp.getFolderById(

            CONFIG.PDF.CARPETA_ID

        );

    }

    /**
     * Exporta un Google Docs a PDF
     */
    function exportar(doc,nombre){

        doc.saveAndClose();

        const archivo = DriveApp.getFileById(

            doc.getId()

        );

        const pdf = archivo.getBlob()

            .getAs(

                MimeType.PDF

            )

            .setName(

                nombre+".pdf"

            );

        const nuevo = carpeta()

            .createFile(pdf);

        return{

            id:nuevo.getId(),

            nombre:nuevo.getName(),

            url:nuevo.getUrl()

        };

    }

    /**
 * Genera el PDF completo de una acta
 */
    function generar(token){

        const solicitud = Solicitudes.buscar(token);

        if(!solicitud){

            throw new Error("Solicitud no encontrada.");

        }

        const doc = Plantillas.copiar();

        Plantillas.reemplazar(

            doc,

            Actas.obtenerVariables(

                solicitud.datos

            )

        );

        Actas.llenarTabla(

            doc,

            solicitud.datos.equipos

        );

        const pdf = exportar(

            doc,

            token

        );

        Solicitudes.guardarPDF(

            token,

            pdf

        );

        return pdf;

    }

    return{

        exportar,

        generar

    };

})();




function exportarPDF(doc,nombre){

    return PDF.exportar(

        doc,

        nombre

    );

}

function generarPDFActa(token){

    return PDF.generar(

        token

    );

}