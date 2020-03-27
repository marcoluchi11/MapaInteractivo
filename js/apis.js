var mapa; // Mapa que vamos a modificar {lat: 40.6643, lng: -73.9385};
/* Crear la variable posicionCentral con las coordenadas donde se va a centrar el mapa */
// Inicializa el mapa con un valor de zoom y una locación en el medio
function inicializarMapa () {
  var posicionCentral = new google.maps.LatLng(40.76708822241082,-73.96836907958985);
    mapa = new google.maps.Map(document.getElementById('map'),{
      zoom: 12,
      center: posicionCentral,
      
    })
    /* Modificá la variable mapa con el constructor Map().
    Tendrás que asignarle un valor de zoom y
    un centro igual a la variable posicionCentral. */

  geocodificadorModulo.inicializar()
  marcadorModulo.inicializar()
  direccionesModulo.inicializar()
  lugaresModulo.inicializar()
  streetViewModulo.inicializar()
}
