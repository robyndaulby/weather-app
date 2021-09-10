function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = ``;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
                        <div>
                      <ul>
                        <li class="results">
                          <div class="row">
                            <div class="col-4 future-day">${day}</div>
                            <div class="col-4 future-temp" >30°C
                          </div>
                          <div class="col-4 future-icon" ><i class="fas fa-sun"></i></div>
                        </li>
                       
                      </ul>
                      </div>
                      </div>`;
  });

  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temp");
  celsiusTemp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = celsiusTemp;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = `Last updated ${formatDate(response.data.dt * 1000)}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  // let city = "Toronto";
  let apiKey = "3d9fc9302f2e9be4c97538b2fa4f9483";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 4 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = celsiusTemp;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemp = null;

let form = document.querySelector(".input-group");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celcius-link");
celsiusLink.addEventListener("click", showCelciusTemp);

search("Manchester");
displayForecast();
