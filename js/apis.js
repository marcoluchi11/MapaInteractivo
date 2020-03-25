var mapa; // Mapa que vamos a modificar
var posicionCentral = {lat: 40.6643, lng: -73.9385};
/* Crear la variable posicionCentral con las coordenadas donde se va a centrar el mapa */

// Inicializa el mapa con un valor de zoom y una locación en el medio
function inicializarMapa () {
    mapa = new google.maps.Map(document.getElementById('map'),{

      center: {

          lat: posicionCentral.lat,
          lng: posicionCentral.lng
      },
      zoom: 12,
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
