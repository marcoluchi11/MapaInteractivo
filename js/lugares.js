lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
 // FALTA OPTIMIZACION 
   var inputPrincipal = document.getElementById('direccion');
    var desde = document.getElementById('desde');
    var hasta = document.getElementById('hasta');
    var agregarIntermedio = document.getElementById('agregar');
    var radio= new google.maps.Circle( {
      center: mapa.center,
      radius: 20000,
      })  
    var autocompletado = new google.maps.places.Autocomplete(inputPrincipal)  
     var autocompletado2 = new google.maps.places.Autocomplete(desde,{
      bounds: radio.getBounds(),
      strictBounds: true,
     });
    var autocompletado3 = new google.maps.places.Autocomplete(hasta,{
      bounds: radio.getBounds(),
      strictBounds: true,
    });
    var autocompletado4 = new google.maps.places.Autocomplete(agregarIntermedio,{
      bounds: radio.getBounds(),
      strictBounds: true,
    });
     /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
        página (las direcciones ingresables por el usuario).
        Para esto creá un círculo con radio de 20000 metros y usalo para fijar
        los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */
  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

    // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca (posicion) {
    //  var limites = new google.maps.LatLngBounds(posicion);
    var solicitud = {

      radius: $('#radio').val(),
      tipoLugar: $('#tipoDeLugar').val(),
      location: posicion
    }
    
     servicioLugares = new google.maps.places.PlacesService(mapa);

     servicioLugares.nearbySearch(solicitud, function(results,status){
          marcadorModulo.marcarLugares(results, status);
     });


        /* Completar la función buscarCerca  que realice la búsqueda de los lugares
    del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
    pasado como parámetro y llame a la función marcarLugares. */

  }
  return {
    inicializar,
    buscarCerca
  }
})()
