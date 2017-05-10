var map;
var marker;
var infowindow;
var messagewindow;
var form =  document.getElementById('saveForm');
var msg =  document.getElementById('successMessage');

function initMap() {
    var california = {lat: 37.4419, lng: -122.1419};
    map = new google.maps.Map(document.getElementById('map'), {
        center: california,
        zoom: 4
    });

    infowindow = new google.maps.InfoWindow({
        content: document.getElementById('saveForm')
    });


    messagewindow = new google.maps.InfoWindow({
        content: document.getElementById('message')
    });

    google.maps.event.addListener(map, 'click', function(event) {
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });


        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
            form.classList.remove('hidden');
        });
    });
}



$(function() {
    var submit = $('#submit');

    submit.on('click', function () {
        var city = encodeURI(document.getElementById('city').value);
        var country = encodeURI(document.getElementById('country').value);
        var date = encodeURI(document.getElementById('date').value);
        var type = document.getElementById('type').value;
        var latlng = marker.getPosition();

        console.log(city);
        console.log(country);
        console.log(date);
        console.log(type);
        console.log(latlng.lat());
    })
})