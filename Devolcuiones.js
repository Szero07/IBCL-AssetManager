const Devoluciones = (()=>{

    function registrar(datos){

        let devueltos=0;

        for(const idEquipo of datos.equipos){

            const equipo=Equipos.buscar(idEquipo);

            if(!equipo)
                continue;

            if(equipo.estado!="Asignado")
                continue;

            const empleado=Personal.obtenerPorTexto(equipo.utilizado);

            Equipos.devolver(idEquipo);

            Movimientos.registrarDevolucion(

                equipo,

                empleado

            );

            devueltos++;

        }

        return{

            ok:true,

            cantidad:devueltos,

            mensaje:"Devolución registrada correctamente."

        };

    }

    return{

        registrar

    };

})();


function registrarDevolucion(datos){

    return Devoluciones.registrar(datos);

}