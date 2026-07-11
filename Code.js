function doGet(e){

  if(e.parameter.token){

    return HtmlService

      .createTemplateFromFile("firma")

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