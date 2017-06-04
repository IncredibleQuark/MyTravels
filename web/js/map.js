var map;
var marker;
var infowindow;
var messagewindow;
var form =  document.getElementById('saveForm');
var msg =  document.getElementById('successMessage');

function initMap() {
    var atlantic = {lat: 35.444732, lng: -39.2746};
    map = new google.maps.Map(document.getElementById("map"), {
        center: atlantic,
        zoom: 3,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        }
    });
    //
    // infowindow = new google.maps.InfoWindow({
    //     content: document.getElementById('saveForm')
    // });
    //
    //
    // messagewindow = new google.maps.InfoWindow({
    //     content: document.getElementById('message')
    // });

    // google.maps.event.addListener(map, 'click', function(event) {
    //     marker = new google.maps.Marker({
    //         position: event.latLng,
    //         map: map
    //     });
    //     msg.classList.add('hidden');

        // google.maps.event.addListener(marker, 'click', function() {
        //     infowindow.open(map, marker);
        //     form.classList.remove('hidden');
        // });
    // });
    infowindow = new google.maps.InfoWindow();

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            // var icon = {
            //     url: place.icon,
            //     size: new google.maps.Size(71, 71),
            //     origin: new google.maps.Point(0, 0),
            //     anchor: new google.maps.Point(17, 34),
            //     scaledSize: new google.maps.Size(25, 25)
            // };

            // Create a marker for each place.
            // var msa = markers.push(new google.maps.Marker({
            //     map: map,
            //     icon: icon,
            //     title: place.name,
            //     position: place.geometry.location
            // }));
            var mark = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                draggable: false
            });


            google.maps.event.addListener(map, 'tilesloaded', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, mark);

            });

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



$(function() {
    var form = $('#saveForm');

    form.on('submit', function (e) {
        e.preventDefault();

        var city = encodeURI(document.getElementById('city').value);
        var country = encodeURI(document.getElementById('country').value);
        var date = encodeURI(document.getElementById('date').value);
        var type = document.getElementById('type').value;
        var latlng = marker.getPosition();
        var userId = document.getElementById('user_id').innerText;

        data = {'user': userId, 'city': city, 'country': country, 'date': date, 'type':type, 'lat': latlng.lat(), 'lng': latlng.lng()};
        var url = "/Travel/new";

        $.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify(data),
            dataType: 'json'
          //  headers: { 'Accept': 'application/hal+json', 'Access-Control-Allow-Origin': '*'  }
        }).done(function(response) {
            infowindow.close();
            msg.classList.remove('hidden');

        }).fail(function (XHR, textStatus, errorThrown) {
            alert('Try again!');
            console.log("error: " + textStatus);
            console.log("error: " + errorThrown);
        })
    })
});
