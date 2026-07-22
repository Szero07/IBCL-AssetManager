function doGet(e){

  if(e.parameter.token){

      const solicitud = Solicitudes.buscar(

          e.parameter.token

      );

      if(!solicitud){

          return HtmlService

              .createHtmlOutput(

                  "Solicitud no encontrada."

              );

      }

      const html = HtmlService

          .createTemplateFromFile("firma");

      html.token = e.parameter.token;

      html.solicitud = JSON.stringify(

          solicitud

      );

      return html

          .evaluate()

          .setTitle("Firma de Acta")

          .setXFrameOptionsMode(

              HtmlService.XFrameOptionsMode.ALLOWALL

          );

  }

  return HtmlService

    .createTemplateFromFile("index")

    .evaluate()

    .setTitle("Sistema de Activos")

    .setXFrameOptionsMode(

      HtmlService.XFrameOptionsMode.ALLOWALL

    );

}

function include(nombre){

  return HtmlService
    .createHtmlOutputFromFile(nombre)
    .getContent();

}


function cargarVista(nombre){

  return HtmlService
          .createHtmlOutputFromFile(nombre)
          .getContent();

}

function obtenerURLWebApp(){

  return CONFIG.WEBAPP.URL;

}