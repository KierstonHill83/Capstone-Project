// $(document).on('ready', function() {
function mapInit() {


  //////////////////
  // Google Maps //
  /////////////////

  // Setting the map to Colorado
  var map = new google.maps.Map(document.getElementById('map-div'),{
    center: {lat:39.393981, lng:-106.016311},
    zoom: 7
  });

  var placeInput = document.getElementById('place-input');

  var autocomplete = new google.maps.places.Autocomplete(placeInput);
  autocomplete.bindTo('bounds', map);

  var place;

  autocomplete.addListener('place_changed', function() {
    place = autocomplete.getPlace();
  });

  $(document).on("click",'#add-location', function(e){
    e.preventDefault();

    if (! place.geometry) {
      return;
    }
    else if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    }
    else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Add to map with info
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map
    });

    // Gives the info for the marker that was placed
    var infowindow = new google.maps.InfoWindow({
      content: "<div><h4>"+place.name+"</h4><p>"+place.formatted_address+"</p></div>"
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });
  
  // });
  }