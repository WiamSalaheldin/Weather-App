// identify the click 
//selecting the form using its id
// once submit the form call function to perform the search 

$(document).ready(function() {
  $("#form-sub").submit(function(event) { 
      performSearch(event); });
});

// make the call
// function to send the data to the API
function performSearch(event) {
  var request;
  event.preventDefault(); // to desplay the result in the same  page
  $("#city-name").text("Let us get it for you  ...");
  $("#city-temp").text("");
  $("img").attr('src', "");
  $("#city-weather").text("");
  
 // Send the request using ajax
  request = $.ajax({ 
      url: 'https://api.openweathermap.org/data/2.5/weather',
      type: "GET",
      data: { q: $("#city").val(), //to select the value to our input 
              appid: '128b2a70fd3d8d83854ae6d95ec1a1eb',
              units: 'metric'} // to get the temb in C not F
  });
// once the request done 
//performe a function to formate the result 
  request.done(function (response){
      formatSearchResults(response);
  });

}
// receiving the data using json 
// present the result 
function formatSearchResults(jsonObject) {
  
  var city_name = jsonObject.name;
  city_name = city_name + ", " + jsonObject.sys.country;
  var city_weather = jsonObject.weather[0].main;
  var city_temp = jsonObject.main.temp;
  var imgurl  = 'http://openweathermap.org/img/wn/' + jsonObject.weather[0].icon + '@2x.png';
  $("img").attr('src', imgurl);
  $("#city-name").text(city_name);
  $("#city-weather").text(city_weather);
  $("#city-temp").text(city_temp+" C°");  
}

