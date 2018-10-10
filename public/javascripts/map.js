var map;
$(function(){
  var lat = $('#map').attr('lat');
  var lng = $('#map').attr('lng');
  var title = $('#map').attr('title');
  var geocoder = null;

  initMap(12, lat, lng, "", "");
  function initMap(valZoom, lat, lon, valTitle, info) {
    geocoder =  new google.maps.Geocoder();
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
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6195a0"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e6f3d6"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    },
                    {
                        "visibility": "simplified"
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
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f4d2c5"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#4e4e4e"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f4f4f4"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#787878"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#eaf6f8"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eaf6f8"
                    }
                ]
            }
        ]
      };


      var mapElement = document.getElementById('map');


      var map = new google.maps.Map(mapElement, mapOptions);

      var url = location.href;

          // Mark Español

          var contentString = '<h6>'+title+'</h6>';


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

            // infowindow.open(map,marker);

          // if (info == "1"){
          // }else if (info == "2"){
          //   infowindow2.open(map,marker2);
          // }else if (info == "3"){
          //   infowindow3.open(map,marker3);
          // }else if (info == "4"){
          //   infowindow4.open(map,marker4);
          // }
  }
});
