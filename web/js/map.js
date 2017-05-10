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

function saveData() {
    var city = encodeURI(document.getElementById('city').value);
    var country = encodeURI(document.getElementById('country').value);
    var date = encodeURI(document.getElementById('date').value);
    var type = document.getElementById('type').value;
    var latlng = marker.getPosition();
    var url = 'phpsqlinfo_addrow.php?city=' + city + '&country=' + country + '&date=' + date +
        '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();

    msg.classList.remove('hidden');

    downloadUrl(url, function(data, responseCode) {

        if (responseCode === 200 && data.length <= 1) {
            infowindow.close();
            messagewindow.open(map, marker);
        }
    });
}

function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request.responseText, request.status);
        }
    };

    request.open('GET', url, true);
    request.send(null);
}

function doNothing () {
}
