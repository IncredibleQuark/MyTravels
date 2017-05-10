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
    var form = $('#saveForm');

    form.on('submit', function (e) {
        e.preventDefault();

        var city = encodeURI(document.getElementById('city').value);
        var country = encodeURI(document.getElementById('country').value);
        var date = encodeURI(document.getElementById('date').value);
        var type = document.getElementById('type').value;
        var latlng = marker.getPosition();

        data = {'city': city, 'country': country, 'date': date, 'type':type, 'lat': latlng.lat(), 'lng': latlng.lng()};
        var url = "http://127.0.0.1:8000/Travel/new";

        $.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify(data),
            dataType: 'json'
        }).done(function(response) {
            infowindow.close();
            msg.classList.remove('hidden');

        }).fail(function (XHR, textStatus, errorThrown) {
            console.log("error: " + textStatus);
            console.log("error: " + errorThrown);
        })
    })
});
