// Open weather api key
var weatherKey = "ABC";
var infowindow;
// Main function to init map object and load current location of user
function makeMap() {
    // $.ajax({
    //     url: "http://ip-api.com/json", success: function (result) {
    //         var myLocation = { lat: result.lat, lng: result.lon };
    //         var mapElement = document.getElementById('map');
    //         $("#map").height($(window).height() - 20);
    //         var map = new google.maps.Map(mapElement, { zoom: 5, center:  myLocation });
    //         getWeather( myLocation, map,  myLocation.lat,  myLocation.lng);
    //         google.maps.event.addListener(map, 'click', function (event) {
    //             let lat = event.latLng.lat();
    //             let lng = event.latLng.lng();
    //             getWeather(event.latLng, map, lat, lng);

    //         });
    //     }
    // });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);

    }

}
function showError(error) {
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
function showPosition(position) {
    // alert('h');
    //x.innerHTML="Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;  
    //getWeather(position, position.coords.latitude, position.coords.longitude);
    //alert(position);
    var myLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
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
// function to get weather data
function getWeather(location, map, lat, lng) {
    let url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=" + weatherKey;
    $.ajax({
        type: "GET",
        url: url, success: function (result) {
            getTime(location, map, result, lat, lng);
        }
    });
}
// function to get time data using lat and lng 
function getTime(location, map, result, lat ,lng) {
    let url = "http://api.geonames.org/timezoneJSON?lat=" + lat + "1&lng=" + lng + "&username=ABC";
    $.ajax({
        type: "GET",
        url: url, success: function (time) {
            pop(location, map, result, time.time);
        }
    });
}
// function to display infowindows  
function pop(location, map, result, time) {
    if (infowindow) infowindow.close();
    infowindow = new google.maps.InfoWindow({
        content: 'Weather : ' + result.weather[0].description.toUpperCase() + ' | Time ' + time,
        position: location
    });
    infowindow.open(map);
}
