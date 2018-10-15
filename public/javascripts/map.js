var map;
$(function(){
    var lat = $('#map').attr('lat') || -34.397;
    var lng = $('#map').attr('lng') || 150.644;
    var title = $('#map').attr('title');
  initMap(12, lat, lng, "", "");
  function initMap(valZoom, lat, lon, valTitle, info) {
    geocoder =  new google.maps.Geocoder();
      // Basic options for a simple Google Map
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
      var mapOptions = {
          // How zoomed in you want the map to start at (always required)
          zoom: 12,

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

            // Geolocation
            var infoContent = new google.maps.InfoWindow;
          if(navigator.geolocation){
              navigator.geolocation.getCurrentPosition(function (position) {
                  var pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                  };
                  infoContent.setPosition(pos);
                  infoContent.setContent('your right now');
                  infoContent.open(map);
                  map.setCenter(pos);
                  addInputLocation(pos.lat, pos.lng);
              }, function () {
                  handleLocationError(true, infoContent, map.getCenter());
              });
          }else{
              handleLocationError(false, infoContent, map.getCenter());
          }

            //Buscador
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        //this is to add the view like google map have to example but we dont want to modify us style
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });
        //pin click event
        map.addListener('click', function(e){
            placeMarkerAndPanTo(e.latLng);
        });
      function placeMarkerAndPanTo(location) {
          if(!marker || !marker.setPosition){
              marker = new google.maps.Marker({
                  position: location,
                  map: map,
              });
          }else{
              marker.setPosition(location);
          }
          if (!!infowindow && !!infowindow.close) {
              infowindow.close();
          }

          infowindow = new google.maps.InfoWindow({
              content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
          });
          addInputLocation(location.lat(), location.lng());
          infowindow.open(map, marker);
      }
      google.maps.event.addDomListener(window, 'load', initMap);
      function addInputLocation(lat, lng){
          $('input[name=lat]').val(lat);
          $('input[name=lng]').val(lng);
      }
      //end pin
      var marker = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function(){
          var places = searchBox.getPlaces();

          if (places.length == 0) {
              return;
          }
          // Clear out the old markers.
          marker.forEach(function (marker) {
              marker.setMap(null);
          });
          marker = [];
          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function (place){
              if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
              }
              var icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
              };
              // Create a marker for each place.
              marker.push(new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
              }));
              if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
              } else {
                  bounds.extend(place.geometry.location);
              }

          });
          map.fitBounds(bounds);
      });

        


  }
    function handleLocationError(browserHasGeolocation, infoContent, pos) {
        infoContent.setPosition(pos);
        infoContent.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoContent.open(map);
    }

//end init map

});
