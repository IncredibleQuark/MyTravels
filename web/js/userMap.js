/**
 * Created by kruku on 11.05.17.
 */

var map;

function initMap() {
    var atlantic = {lat: 35.444732, lng: -39.2746};
    map = new google.maps.Map(document.getElementById('map'), {
        center: atlantic,
        zoom: 3,
        styles:[
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
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
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
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
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ],
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        }
    })}

var image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

$(function () {

    var url = "/profile/getMapData";

    $.ajax({
        url: url,
        method: 'GET',
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


})
