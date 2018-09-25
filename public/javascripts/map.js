var map;
$(function(){
  var lat = $('#map').attr('lat');
  var lng = $('#map').attr('lng');

  initMap(15, lat, lng, "", "");
  function initMap(valZoom, lat, lon, valTitle, info) {
      // Basic options for a simple Google Map
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
      var mapOptions = {
          // How zoomed in you want the map to start at (always required)
          zoom: valZoom,

          // The latitude and longitude to center the map (always required)
          center: new google.maps.LatLng(lat, lon),
          panControl: false,
          zoomControl: true,
          scrollwheel: false,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
          },
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false,

          // How you would like to style the map.
          styles:
          [
              {
                  "featureType": "administrative",
                  "elementType": "all",
                  "stylers": [
                      {
                          "saturation": "-100"
                      }
                  ]
              },
              {
                  "featureType": "administrative.province",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "all",
                  "stylers": [
                      {
                          "saturation": -100
                      },
                      {
                          "lightness": 65
                      },
                      {
                          "visibility": "on"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "all",
                  "stylers": [
                      {
                          "saturation": -100
                      },
                      {
                          "lightness": "50"
                      },
                      {
                          "visibility": "simplified"
                      }
                  ]
              },
              {
                  "featureType": "road",
                  "elementType": "all",
                  "stylers": [
                      {
                          "saturation": "-100"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "simplified"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "all",
                  "stylers": [
                      {
                          "lightness": "30"
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "all",
                  "stylers": [
                      {
                          "lightness": "40"
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "elementType": "all",
                  "stylers": [
                      {
                          "saturation": -100
                      },
                      {
                          "visibility": "simplified"
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "hue": "#ffff00"
                      },
                      {
                          "lightness": -25
                      },
                      {
                          "saturation": -97
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "labels",
                  "stylers": [
                      {
                          "lightness": -25
                      },
                      {
                          "saturation": -100
                      }
                  ]
              }
          ]};


      var mapElement = document.getElementById('map');


      var map = new google.maps.Map(mapElement, mapOptions);

      var url = location.href;

          // Mark Español

          var contentString = '<h1>Hola</h1>';


          var infowindow = new google.maps.InfoWindow({
            content: contentString,
            //pixelOffset: new google.maps.Size(100,100)
          });

          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(lat, lon),
              map: map,
              title: 'OFICINAS CENTRALES'
          });

          google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map,marker);
            });

            infowindow.open(map,marker);

          // if (info == "1"){
          // }else if (info == "2"){
          //   infowindow2.open(map,marker2);
          // }else if (info == "3"){
          //   infowindow3.open(map,marker3);
          // }else if (info == "4"){
          //   infowindow4.open(map,marker4);
          // }
  }

})
