console.log("inside javascript");
var userSearch = $("#searchBox").val(); 
// This is our API key
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var cityForecastEl = $("#city-forecast");
var listGroup = $(".list-group")
var cities = [];

//print cities list to the screen each  time one is added 
function renderButtons(){
        $(".list-group").empty();
        // Loop through the array of movies, then generate buttons for each movie in the array
          for (var i = 0; i< cities.length; i++){
           var newButton= $("<li>").text(cities[i]);
           newButton.attr("class", "list-group-item");
            $(".list-group").append(newButton);
          }
}

// search button event listener and add to cities array 
$("#search-button").on("click", function() {
     event.preventDefault(); // prevent default
     var userSearch = $("#searchBox").val(); 
     cities.push(userSearch);
     renderButtons();

// Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
// + "&q="+ userSearch + "&units=imperial&appid=" + APIKey;

// var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=166a433c57516f51dfab1f7edaed8413&units=imperial"

$.ajax({
    url:queryURL ,
    method: "GET"
}).then(function(response) {
    console.log(response);
    // create variables to grab the information from the response
    var cityName = response.city.name ;
    var Date = moment().format('MMMM Do YYYY'); 
    var currentTemp = response.list[0].main.temp;
    // console.log(currentTemp);
    var humidityEl = response.list[0].main.humidity;
    var windSpeedEl = response.list[0].wind.speed;
    // var img = "http://openweathermap.org/img/w/" + userSearch+ data.weather[0].icon + ".png";
    // console.log(img);
    // var uvIndexEl = response.main;// not sure where to grab this from

    var img = $("<img>").attr("src", queryURL + respons.list[0].weather[0].icon + ".png");
    // var headline = result[i].headline.print_headline;
    // var newHeandlineEL =$("<h1>");
    // newHeandlineEL.text(headline);
    // newArticle.append(newHeandlineEL);

    //Create div to hold the information we need from response
    var cityHeadline = $("<h2>");
    var temperature = $("<p>");
    var humidity = $("<p>");
    var windSpeed = $("<p>");
    var imgDisplay = $("<img>");
    // var uvIndex = $("<p>");

    // add the text information information to the appropriate HTML element
    cityHeadline.text(cityName + " " + Date)
    temperature.text("Current Temp: " + currentTemp + "°");
    humidity.text("Humidity: " + humidityEl + "%");
    windSpeed.text("Wind Speed: " + windSpeedEl);
    imgDisplay.attr("src", img);
    // imgDisplay.attr("src","http://openweathermap.org/img/w/" + + img + ".png");
    // console.log(temperature);
    // uvIndex.text = "UV Index: " + uvIndexEl;

    //add to exisitng HTMl on page 
    cityForecastEl.append(cityHeadline);
    cityForecastEl.append(temperature);
    cityForecastEl.append(humidity);
    cityForecastEl.append(windSpeed);
    // cityForecastEl.append(uvIndex);
    cityForecastEl.append(imgDisplay);
    console.log(cityForecastEl);

    //remove the Hide class from the entire div. 
    cityForecastEl.removeAttr("class", "hide");

});// closing the .then function
});// closing the search button listener function
