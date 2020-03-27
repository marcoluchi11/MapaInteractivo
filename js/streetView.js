streetViewModulo = (function () {
  var panorama // 'Visor' de StreetView

  function inicializar () {
        /* Completar la función inicializar()  que crea un panorama
        en una posición y lo muestra en la página. */
      var etiquetaSView = document.getElementById('pano');    
      panorama = new google.maps.StreetViewPanorama(etiquetaSView,{

        position: mapa.center,
        pov: {
          heading:150,
          pitch: 10
        }
      });
  }

    // Actualiza la ubicación del Panorama
  function fijarStreetView (ubicacion) {
      
    //  panorama = mapa.getStreetView();
      panorama.setPosition(ubicacion);
      mapa.setStreetView(panorama);
        /* Completar la función fijarStreetView que actualiza la posición
         de la variable panorama y cambia el mapa de modo tal que se vea
         el streetView de la posición actual. */
  }

  return {
    inicializar,
    fijarStreetView
  }
})()
