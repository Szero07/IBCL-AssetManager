function doGet(){

  return HtmlService
    .createTemplateFromFile("index")
    .evaluate()
    .setTitle("Sistema de Activos")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

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