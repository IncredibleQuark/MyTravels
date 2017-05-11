/**
 * Created by kruku on 11.05.17.
 */
function initMap() {
    var atlantic = {lat: 35.444732, lng: -39.2746};
    map = new google.maps.Map(document.getElementById('map'), {
        center: atlantic,
        zoom: 3
    })}

var image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

$(function () {

    var url = "http://127.0.0.1:8000/profile/getMapData/";

    $.ajax({
        url: url,
        dataType: 'json'
    }).done(function (response) {

        $.each(response, function(index, value) {

            var myLatLng = {lat: value.lat, lng: value.lng};

            new google.maps.Marker({
                position: myLatLng,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: image,
                title: value.city+' '+value.country
            });

        })
    }).fail(function(error) {
        alert('Something went wrong!');
    });
});