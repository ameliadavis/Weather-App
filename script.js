console.log("inside javascript");
var userSearch = $("#searchBox").val(); 
// This is our API key
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var cityForecastEl = $("#city-forecast");
var listGroup = $(".list-group");
var FiveDayEl = $("#5-Day");
var day1 = $(".day1");
var day2 = $(".day2");
var day3 = $(".day3");
var day4 = $(".day4");
var day5 = $(".day5");
let cities = JSON.parse(localStorage.getItem("listGroup")) || []; // grab this array from local storage or set it to a blank array

// set local storage
function updateStorage () {
  localStorage.setItem("listGroup", JSON.stringify(cities));
}
// on page load populate buttons list from local storage
// $(document).ready(function(){
//   $(".list-group").append(JSON.parse(localStorage.getItem("listGroup")));
// }),


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
     cityForecastEl.empty();
     day1.empty();
     renderButtons();
     updateStorage();

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
    // var img ="http://openweathermap.org/img/wn/10d@2x.png"
    var img = "http://openweathermap.org/img/wn/"+ response.list[0].weather["0"].icon + "@2x.png";
    // var uvIndexEl = response.main;// not sure where to grab this from
  
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
    // imgDisplay.attr("src", img + "@2x.png");
    // imgDisplay.attr("src","http://openweathermap.org/img/w/" + + img + ".png");
    // uvIndex.text = "UV Index: " + uvIndexEl;

    //add to exisitng HTMl on page 
    cityForecastEl.append(cityHeadline);
    cityForecastEl.append(temperature);
    cityForecastEl.append(humidity);
    cityForecastEl.append(windSpeed);
    // cityForecastEl.append(uvIndex);
  //  cityForecastEl.append(imgDisplay);
    console.log(cityForecastEl);

// ======================
// 5 day forcast 
// ======================

// DAY 1
    // variables
    var day1ForcastDateEL = response.list[6].dt_txt;
    console.log(day1ForcastDateEL);
    var day1ForcastHumidityEl= response.list[6].main.humidity;
    var day1forcastTempEl= response.list[6].main.temp;
    var img1 = "http://openweathermap.org/img/wn/"+ response.list[0].weather["0"].icon + "@2x.png";

     // set elements
     var day1ForcastDate = $("<p>");
     var day1ForcastHumidity = $("<p>");
     var day1forcastTemp = $("<p>");
     var img1Display= $("<img>");

    // set text
    day1ForcastDate.text("date: " + day1ForcastDateEL);
    day1ForcastHumidity.text("Humidity: " + day1ForcastHumidityEl + "%");
    day1forcastTemp.text("Temp:" + day1forcastTempEl + "°");
    img1Display.attr("src", img1);

    // append 
    day1.append(day1ForcastDate);
    day1.append(img1Display);// add the image to the 5 day item
    day1.append(day1ForcastHumidity);
    day1.append(day1forcastTemp);
    console.log(day1);


    // DAY 2
    // variables
    var day2ForcastDateEL = response.list[14].dt_txt;
    console.log(day1ForcastDateEL);
    var day2ForcastHumidityEl= response.list[14].main.humidity;
    var day2forcastTempEl= response.list[14].main.temp;
    var img2 = "http://openweathermap.org/img/wn/"+ response.list[14].weather["0"].icon + "@2x.png";

     // set elements
     var day2ForcastDate = $("<p>");
     var day2ForcastHumidity = $("<p>");
     var day2forcastTemp = $("<p>");
     var img2Display= $("<img>");

    // set text
    day2ForcastDate.text("date: " + day2ForcastDateEL);
    day2ForcastHumidity.text("Humidity: " + day2ForcastHumidityEl + "%");
    day2forcastTemp.text("Temp: " + day2forcastTempEl + "°");
    img2Display.attr("src", img2);

    // append 
    day2.append(day2ForcastDate);
    day2.append(img2Display);// add the image to the 5 day item
    day2.append(day2ForcastHumidity);
    day2.append(day2forcastTemp);
    console.log(day2);

   // DAY 3
    // variables
    var day3ForcastDateEL = response.list[21].dt_txt;
    console.log(day1ForcastDateEL);
    var day3ForcastHumidityEl= response.list[21].main.humidity;
    var day3forcastTempEl= response.list[21].main.temp;
    var img3 = "http://openweathermap.org/img/wn/"+ response.list[21].weather["0"].icon + "@2x.png";

     // set elements
     var day3ForcastDate = $("<p>");
     var day3ForcastHumidity = $("<p>");
     var day3forcastTemp = $("<p>");
     var img3Display= $("<img>");

    // set text
    day3ForcastDate.text("date: " + day3ForcastDateEL);
    day3ForcastHumidity.text("Humidity: " + day3ForcastHumidityEl + "%");
    day3forcastTemp.text("Temp: " + day3forcastTempEl + "°");
    img3Display.attr("src", img3);

    // append 
    day3.append(day3ForcastDate);
    day3.append(img3Display);// add the image to the 5 day item
    day3.append(day3ForcastHumidity);
    day3.append(day3forcastTemp);
    console.log(day2);

   // DAY 4
    // variables
    var day4ForcastDateEL = response.list[28].dt_txt;
    var day4ForcastHumidityEl= response.list[28].main.humidity;
    var day4forcastTempEl= response.list[28].main.temp;
    var img4 = "http://openweathermap.org/img/wn/"+ response.list[28].weather["0"].icon + "@2x.png";

     // set elements
     var day4ForcastDate = $("<p>");
     var day4ForcastHumidity = $("<p>");
     var day4forcastTemp = $("<p>");
     var img4Display= $("<img>");

    // set text
    day4ForcastDate.text("date: " + day4ForcastDateEL);
    day4ForcastHumidity.text("Humidity: " + day4ForcastHumidityEl + "%");
    day4forcastTemp.text("Temp: " + day4forcastTempEl + "°");
    img4Display.attr("src", img4);

    // append 
    day4.append(day4ForcastDate);
    day4.append(img4Display);// add the image to the 5 day item
    day4.append(day4ForcastHumidity);
    day4.append(day4forcastTemp);

  // DAY 5
    // variables
    var day5ForcastDateEL = response.list[37].dt_txt;
    var day5ForcastHumidityEl= response.list[37].main.humidity;
    var day5forcastTempEl= response.list[37].main.temp;
    var img5 = "http://openweathermap.org/img/wn/"+ response.list[37].weather["0"].icon + "@2x.png";

     // set elements
     var day5ForcastDate = $("<p>");
     var day5ForcastHumidity = $("<p>");
     var day5forcastTemp = $("<p>");
     var img5Display= $("<img>");

    // set text
    day5ForcastDate.text("date: " + day5ForcastDateEL);
    day5ForcastHumidity.text("Humidity: " + day5ForcastHumidityEl + "%");
    day5forcastTemp.text("Temp: " + day5forcastTempEl + "°");
    img5Display.attr("src", img5);

    // append 
    day5.append(day5ForcastDate);
    day5.append(img5Display);// add the image to the 5 day item
    day5.append(day5ForcastHumidity);
    day5.append(day5forcastTemp);
   


    //remove the Hide class from the entire div. 
    cityForecastEl.removeAttr("class", "hide");
   

  });// closing the .then function
});// closing the search button listener function

// function for the 5 day forcast 

