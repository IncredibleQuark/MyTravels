/**
 * Created by kruku on 11.05.17.
 */
function initMap() {
    var california = {lat: 37.4419, lng: -122.1419};
    map = new google.maps.Map(document.getElementById('map'), {
        center: california,
        zoom: 4

    })}

$(function () {

    var url = "http://127.0.0.1:8000/profile/getMapData/";

    $.ajax({
        url: url,
        dataType: 'json'
    }).done(function (response) {
        console.log(response);
    }).fail(function(error) {

    });
});