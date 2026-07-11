/**
 * ============================================================
 * IBCL Asset Manager
 * Módulo: Solicitudes de Firma
 * ============================================================
 */

const Solicitudes = (() => {

    function hoja(){

        return getBD().getSheetByName(CONFIG.HOJAS.SOLICITUDES);

    }

    function generarToken(){

        return Utilities.getUuid();

    }

    function crear(datos){

        const token = generarToken();

        hoja().appendRow([

            token,

            datos.tipo,

            new Date(),

            datos.empleado.nombre,

            datos.empleado.cedula,

            "PENDIENTE",

            JSON.stringify(datos),

            "",

            ""

        ]);

        return token;

    }

    function buscar(token){

        const datos=hoja().getDataRange().getValues();

        for(let i=1;i<datos.length;i++){

            if(datos[i][0]==token){

                return{

                    fila:i+1,

                    token:datos[i][0],

                    tipo:datos[i][1],

                    fecha:datos[i][2],

                    empleado:datos[i][3],

                    cedula:datos[i][4],

                    estado:datos[i][5],

                    datos:JSON.parse(datos[i][6]),

                    firma:datos[i][7],

                    pdf:datos[i][8]

                };

            }

        }

        return null;

    }

    return{

        crear,

        buscar

    };

})();





function crearSolicitudFirma(datos){

    return Solicitudes.crear(datos);

}

function obtenerSolicitud(token){

    return Solicitudes.buscar(token);

}