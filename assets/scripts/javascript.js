$(document).ready(function() {
	console.log("Ready!");


    var kelvin; 
    var celcius = true;

	function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        // x.innerHTML = "Geolocation is not supported by this browser.";
        console.log("Could not find location.");
    }
	}

	function showPosition(position) { 
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + 'd522438778f2abe0742dee75c368562a', function(json, textStatus) {
            var weather = json;
            kelvin = weather.main.temp;
            $("#temp").html((kelvin-273).toFixed(1) + " <a id='celciusFarenheit' href='#'>&deg;C</a>");
            $("#location").html(weather.name + ", " + weather.sys.country);
            $("#clouds").html(weather.weather["0"].description.replace());
            $("#icon").attr('src', 'http://openweathermap.org/img/w/' + weather.weather["0"].icon + '.png');

        });
    }

    $("#temp-div").click(function() {
        console.log("Entered!");
        if (celcius) {
            $("#temp").html((kelvin *9/5 - 459.67).toFixed(1) + " <a id='celciusFarenheit' href='#'>&deg;F</a>");
            celcius = false;
        }else{
            $("#temp").html((kelvin - 273).toFixed(1) + " <a id='celciusFarenheit' href='#'>&deg;C</a>");
            celcius = true;
        }
    });



    getLocation();


});