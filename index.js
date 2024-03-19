function eventHandler(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}
let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", eventHandler);

function searchCity(city) {
  let apiKey = "te41005c6ao302b3034af61b1f22f9a7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherForecast);
}

function weatherForecast(response) {
  let temperatureElement = document.querySelector(".current-temperature-value");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windspeedElement = document.querySelector("#wind-speed");
  windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
      "sunday",
      "monday",
      "tuesday",
      "wendesday",
      "thusday",
      "friday",
      "satarday",
    ];
    let day = days[date.getDay()];
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${day} ${hours}: ${minutes}`;
  }

  let iconElement = document.querySelector(".current-temperature-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
}
searchCity("paris");
