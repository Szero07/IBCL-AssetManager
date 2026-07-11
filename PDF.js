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

    return{

        exportar

    };

})();




function exportarPDF(doc,nombre){

    return PDF.exportar(

        doc,

        nombre

    );

}