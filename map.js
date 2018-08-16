var weatherKey = "b0e74e60f082fb0478861b4892261ae0";
var infowindow;
function makeMap() {
    $.ajax({
        url: "http://ip-api.com/json", success: function (result) {
            var myLocation = { lat: result.lat, lng: result.lon };
            var mapElement = document.getElementById('map');
            $("#map").height($(window).height() - 20);
            var map = new google.maps.Map(mapElement, { zoom: 5, center:  myLocation });
            getWeather( myLocation, map,  myLocation.lat,  myLocation.lng);
            google.maps.event.addListener(map, 'click', function (event) {
                let lat = event.latLng.lat();
                let lng = event.latLng.lng();
                getWeather(event.latLng, map, lat, lng);

            });
        }
    });
}

function getWeather(location, map, lat, lng) {
    let url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=" + weatherKey;
    $.ajax({
        type: "GET",
        url: url, success: function (result) {
            getTime(location, map, result, lat, lng);
        }
    });
}
function getTime(location, map, result, lat ,lng) {
    let url = "http://api.geonames.org/timezoneJSON?lat=" + lat + "1&lng=" + lng + "&username=rootasasa0king";
    $.ajax({
        type: "GET",
        url: url, success: function (time) {
            pop(location, map, result, time.time);
        }
    });
}
function pop(location, map, result, time) {
    if (infowindow) infowindow.close();
    infowindow = new google.maps.InfoWindow({
        content: 'Weather : ' + result.weather[0].description.toUpperCase() + ' | Time ' + time,
        position: location
    });
    infowindow.open(map);
}