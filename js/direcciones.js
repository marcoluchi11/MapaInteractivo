direccionesModulo = (function () {
  var servicioDirecciones // Servicio que calcula las direcciones
  var mostradorDirecciones // Servicio muestra las direcciones

    // Calcula las rutas cuando se cambian los lugares de desde, hasta o algun punto intermedio
  function calcularRutasConClic () {
    document.getElementById('comoIr').addEventListener('change', function () {
      direccionesModulo.calcularYMostrarRutas()
    })

    document.getElementById('calcularMuchos').addEventListener('click', function () {
      direccionesModulo.calcularYMostrarRutas()
    })

    var listasLugares = document.getElementsByClassName('lugares')
    for (var j = 0; j < listasLugares.length; j++) {
      listasLugares[j].addEventListener('change', function () {
        if (document.getElementById('desde').value != '' && document.getElementById('desde').value != '') {
          direccionesModulo.calcularYMostrarRutas()
        }
      })
    }
  }

    // Agrega la dirección en las lista de Lugares Intermedios en caso de que no estén
  function agregarDireccionEnLista (direccion, coord) {
    var lugaresIntermedios = document.getElementById('puntosIntermedios')

    var haceFaltaAgregar = true
    for (i = 0; i < lugaresIntermedios.length; ++i) {
      if (lugaresIntermedios.options[i].text.replace(/\r?\n|\r/g, ' ') === direccion.replace(/\r?\n|\r/g, ' ')) {
        haceFaltaAgregar = false
      }
    }
    if (haceFaltaAgregar) {
      var opt = document.createElement('option')
      opt.value = coord
      opt.innerHTML = direccion
      lugaresIntermedios.appendChild(opt)
    }
  }

    // Agrega la dirección en las listas de puntos intermedios y lo muestra con el street view
  function agregarDireccionYMostrarEnMapa (direccion, ubicacion) {
    that = this
    var ubicacionTexto = ubicacion.lat() + ',' + ubicacion.lng()
    agregarDireccionEnLista(direccion, ubicacionTexto)
    mapa.setCenter(ubicacion)
    streetViewModulo.fijarStreetView(ubicacion)
    marcadorModulo.mostrarMiMarcador(ubicacion)
  }

  function agregarDireccion (direccion, ubicacion) {
    that = this
    var ubicacionTexto = ubicacion.lat() + ',' + ubicacion.lng()
    agregarDireccionEnLista(direccion, ubicacionTexto)
    mapa.setCenter(ubicacion)
  }

    // Inicializo las variables que muestra el panel y el que calcula las rutas//
  function inicializar () {
    calcularRutasConClic()
        // Agrega la direccion cuando se presioná enter en el campo agregar
    $('#agregar').keypress(function (e) {
      if (e.keyCode == 13) {
        var direccion = document.getElementById('agregar').value
        geocodificadorModulo.usaDireccion(direccion, direccionesModulo.agregarDireccion)
      }
    })
        // Calcula las rutas cuando se presioná enter en el campo desde y hay un valor disitnto a vacío en 'hasta'
    $('#desde').keypress(function (e) {
      if (e.keyCode == 13 && document.getElementById('hasta').value != '') {
        direccionesModulo.calcularYMostrarRutas()
      }
    })

        // Calcula las rutas cuando se presioná enter en el campo hasta y hay un valor disitnto a vacío en 'desde'
    $('#hasta').keypress(function (e) {
      if (e.keyCode == 13 && document.getElementById('desde').value != '') {
        direccionesModulo.calcularYMostrarRutas()
      }
    })
    servicioDirecciones = new google.maps.DirectionsService()
    mostradorDirecciones = new google.maps.DirectionsRenderer({
      draggable: true,
      map: mapa,
      panel: document.getElementById('directions-panel-summary'),
      suppressMarkers: true
    })
  }

    // Calcula la ruta entre los puntos Desde y Hasta con los puntosIntermedios
    // dependiendo de la formaDeIr que puede ser Caminando, Auto o Bus/Subterraneo/Tren

  function calcularYMostrarRutas () {
    var Transporte;
    var seleccionarModo = document.getElementById('comoIr').value
    var pasosASeguir = document.getElementById('directions-panel-summary');
    while(pasosASeguir.firstChild) { //Aca borro los div creados para la guia de los pasos a seguir
      pasosASeguir.firstChild.remove();
  }
    // var servicioDirecciones // Servicio que calcula las direcciones
    // var mostradorDirecciones // Servicio muestra las direcciones
      if (mostradorDirecciones != null) {
          mostradorDirecciones.setMap(null);
          mostradorDirecciones = null;
        }
      servicioDirecciones = new google.maps.DirectionsService();
      mostradorDirecciones = new google.maps.DirectionsRenderer();
      
      function obtenerPuntosIntermedios(){
                  var pIntermedioFinal = [];
                  var pIntermedios = document.getElementById('puntosIntermedios');
                  for(var i = 0; i<pIntermedios.length;i++){
                          var waypoints = {location: pIntermedios[i].textContent,}
                          pIntermedioFinal.push(waypoints);
                        }
                  return pIntermedioFinal;
         }
      var solicitud = {
              origin: $('#desde').val(),
              destination: $('#hasta').val(),
              travelMode: google.maps.TravelMode[seleccionarModo],
              waypoints: obtenerPuntosIntermedios(),
        };
      servicioDirecciones.route(solicitud, function(resultado, estado) {
            if (estado == 'OK') {
                          mostradorDirecciones.setDirections(resultado);
                          mostradorDirecciones.setMap(mapa)
                    }
            marcadorModulo.agregarMarcadorRuta(desde, 'Inicio', true);
            marcadorModulo.agregarMarcadorRuta(hasta, 'Fin', true);
            marcadorModulo.agregarMarcadorRuta(agregar, 'Intermedio', true);
            var miRuta = resultado.routes[0].legs[0];
			      for (var i = 0; i < miRuta.steps.length; i++) {
                      var StringHTML = miRuta.steps[i].instructions.replace(/(<([^>]+)>)/ig,"");
                      var nuevoDiv = document.createElement('div');
                      var nuevoBreak = document.createElement('br');
                      nuevoDiv.textContent = StringHTML;
                      pasosASeguir.appendChild(nuevoDiv);
                      pasosASeguir.appendChild(nuevoBreak);
		                 }
      });
        /* Completar la función calcularYMostrarRutas , que dependiendo de la forma en que el
         usuario quiere ir de un camino al otro, calcula la ruta entre esas dos posiciones
         y luego muestra la ruta. */
  }

  return {
    inicializar,
    agregarDireccion,
    agregarDireccionEnLista,
    agregarDireccionYMostrarEnMapa,
    calcularYMostrarRutas
  }
}())
