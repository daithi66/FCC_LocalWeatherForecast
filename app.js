window.onload = function() {
    loadForecast();
  };
  
  $("#switchFC").click(switchFC);
  
  function switchFC() {
    if ($("#switchFC").html() == "Use Celsius") {
      $("#switchFC").html("Use Fahrenheit");
    } else {
      $("#switchFC").html("Use Celsius");
    }
    loadForecast();
  }
  
  function loadForecast () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        getCity(latitude, longitude);
        getWeather(latitude, longitude);
      });
    }
  }
  
  function getCity(latitude, longitude) {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    url += latitude + "," + longitude + "&sensor=true";
    $.getJSON(url, function(cityData) {
      cityData = cityData.results[0].formatted_address;
      var cityStart = cityData.indexOf(", ") + 2;
      var cityEnd = cityData.indexOf(", USA") - 6;
      var cityState = cityData.substring(cityStart, cityEnd);
      if (cityState == "") {
        cityState = cityData;
      }
      $("#location").html("In " + cityState + " the weather will be:");
    });
  }
  
  function getWeather(latitude, longitude) {
    var key ="2f443e8572ff9e9b2881f72c00eddfae";
    var corsurl = "https://cors-anywhere.herokuapp.com/";
    var url = corsurl + "https://api.darksky.net/forecast/" + key + "/"
    url += latitude + "," + longitude;
    var degrees = " &#8457;";
    if ($("#switchFC").html() != "Use Celsius") {
      url += "?units=si";
      degrees = " &#8451;";
    } 
    $.getJSON(url, function(forecast) {
      $("#summary").html(forecast.hourly.summary);
      $("#currTemp").html(forecast.currently.temperature + 	degrees);
      $("#lowTemp").html(forecast.daily.data[0].temperatureMin + degrees);
      $("#highTemp").html(forecast.daily.data[0].temperatureMax + degrees);
      var icon = forecast.hourly.icon;
      loadImg(icon);
    });
  }
  
  function loadImg(icon) {
    var url = "http://icon-park.com/imagefiles/simple_weather_icons2_";
    if (icon == "clear-day") {
      document.getElementById("iconImg").src = url + "sunny.png";
    } else if (icon == "clear-night") {
      document.getElementById("iconImg").src = url + "night.png";
    } else if (icon == "partly-cloudy-day") {
      document.getElementById("iconImg").src = url + "partly_cloudy.png";
    } else if (icon == "partly-cloudy-night") {
      document.getElementById("iconImg").src = url + "night.png";
    } else if (icon == "cloudy") {
      document.getElementById("iconImg").src = url + "cloudy.png";
    } else if (icon == "rain") {
      document.getElementById("iconImg").src = url + "rain.png";
    } else if (icon == "snow") {
      document.getElementById("iconImg").src = url + "snow.png";
    } else if (icon == "sleet") {
      document.getElementById("iconImg").src = url + "snow.png";
    } else if (icon == "wind") {
      document.getElementById("iconImg").src = url + "cloudy.png";
    } else if (icon == "fog") {
      document.getElementById("iconImg").src = url + "cloudy.png";
    }
  }