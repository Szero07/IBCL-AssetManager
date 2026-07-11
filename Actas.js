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
    function obtenerTabla(doc){

        const body = doc.getBody();

        const tablas = body.getTables();

        if(tablas.length==0){

            throw new Error(

                "La plantilla no contiene tablas."

            );

        }

        return tablas[0];

    }

    /**
     * Agregar equipos
     */
    function llenarTabla(doc,equipos){

        const tabla = obtenerTabla(doc);

        equipos.forEach(eq=>{

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

    return{

        llenarTabla

    };

})();







function llenarTablaEquipos(doc,equipos){

    return Actas.llenarTabla(

        doc,

        equipos

    );

}