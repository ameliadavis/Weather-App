console.log("inside javascript");
var userSeach = $("#searchBox").val(); 
// This is our API key
var APIKey = "a42fcd4bc8dfe0fd58dd271e41080b16";
var cityForecastEl = $("#city-forecast");
var listGroup = $(".list-group")
// var cityHeadlineEl = $("#cityHeadline");
// var temperatureEl = $("#temperature");
// var humidityEl = $("#humidity");
// var windSpeedEl = $("#wind-speed");
// var uvIndexEl = $("#uv-Index");
// Initial array of citys
var cities = [];

//print cities list to the screen each  time one is added 
function renderButtons(){
        $(".list-group").empty();
        // Loop through the array of movies, then generate buttons for each movie in the array
          for (var i = 0; i< cities.length; i++){
           var newButton= $("<li>").text(cities[i]);
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
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
+ "&q="+ userSeach + "&units=imperial&appid=" + APIKey;

$.ajax({
    url:queryURL ,
    method: "GET"
}).then(function(response) {
    console.log(response);
    // create variables to grab the information from the response
    var cityName = response.name ;
    var Date = moment().format('MMMM Do YYYY'); 
    var todaysTemp = response.main.temp;
    var humidityEl = response.main.humidity;


    //Create div to hold the information we need from response
    var cityHeadline = $("<h2>");
    var temperature = $("<p>");
    var humidity = $("<p>");

    
    // add the text information information to the appropriate HTML element
    cityHeadline.text = cityName + Date; 
    temperature.text = "Tempurature: " + todaysTemp;
    humidity.text = "Humidity: " + humidityEl;

    //add to exisitng HTMl on page 
    cityForecastEl.append(cityHeadline);
    cityForecastEl.append(temperature);
    cityForecastEl.append(humidity);

    //remove the Hide class from the entire div. 


    // create a new button in the list on the left


});// closing the .then function
});// closing the search button listener function
