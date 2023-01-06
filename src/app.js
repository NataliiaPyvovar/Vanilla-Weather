//Current Date and Time
function showDate() {
    let now = new Date();
  
    let date = now.getDate();
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[now.getDay()];
  
       let month = now.toLocaleString("en", { month: "long" });
    let year = now.getFullYear();
    let h3 = document.querySelector("h3");
    h3.innerHTML = `${date}, ${month},  ${year}`;
  
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let time = document.querySelector("h4");
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    // console.log( hours, minutes);
    if (hours < 10) {
      hours = `0${hours}`;
    }
    // console.log(hours, minutes);
    time.innerHTML = `${day}, ${hours}:${minutes}`;
  }
  showDate();
  // 2
  
  function search(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("#city-input");
    cityElement.innerHTML = cityInput.value;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  
  
  // Search Engine
  let form = document.querySelector(".search-form");
  form.addEventListener("submit", citySubmit);
  
  function citySubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchCity(city) {
    let apiKey = "f8edd982a4a7077051d3a896edb21fe6";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayAttributes);
  }
  
  function displayAttributes(response) {
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windELement = document.querySelector("#windspeed");
    let iconELement = document.querySelector("#icon");
    let temperatureElement = document.querySelector("#temperature");
  
    
    humidityElement.innerHTML = response.data.main.humidity + `%`;
    windELement.innerHTML = Math.round(response.data.wind.speed) + ` km/h`;
    descriptionElement.innerHTML = response.data.weather[0].description;
    document.querySelector("#city").innerHTML = response.data.name;
    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);


 iconELement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt", response.data.weather[0].description); 
    }
  
  
  // Current location
  function getCurrentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let apiKey = "f8edd982a4a7077051d3a896edb21fe6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayAttributes);
  }
  
  function getPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  }
  
  let getCurrentCity = document.querySelector("#get-current-city");
  getCurrentCity.addEventListener("click", getPosition);


//  Celcius and Fahrenheit
function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
  }
  
  
  function convertToCelsius(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
 let celsiusTemperature = null;
 
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);

  searchCity("Kyiv");
  