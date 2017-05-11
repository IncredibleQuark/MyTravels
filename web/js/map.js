var map;
var marker;
var infowindow;
var messagewindow;
var form =  document.getElementById('saveForm');
var msg =  document.getElementById('successMessage');

function initMap() {
    var atlantic = {lat: 35.444732, lng: -39.2746};
    map = new google.maps.Map(document.getElementById('map'), {
        center: atlantic,
        zoom: 3,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        }
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
        msg.classList.add('hidden');

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
        var userId = document.getElementById('user_id').innerText;

        data = {'user': userId, 'city': city, 'country': country, 'date': date, 'type':type, 'lat': latlng.lat(), 'lng': latlng.lng()};
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
            alert('Try again!');
            console.log("error: " + textStatus);
            console.log("error: " + errorThrown);
        })
    })
});
