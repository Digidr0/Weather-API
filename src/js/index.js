import "..//css/style.css";
import "..//css/header.css";
import "..//css/background.css";
import "..//css/load.css";
import "..//css/main.css";

import checkDirection from "./checkDirection";
import changeBG from "./changeBG";
import {format, fromUnixTime,  utcToZonedTime} from "date-fns";

const searchInput = document.querySelector(".search.input");
const searchBtn = document.querySelector(".search.btn");
const responseTime = document.querySelector(".response-time");

const load = document.querySelector(".lds-ellipsis");
const city = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const temperatureMin = document.querySelector(".temperature-min");
const temperatureMax = document.querySelector(".temperature-max");
const wetatherStatus = document.querySelector(".weather-status");
const wetatherStatusIcon = document.querySelector(".weather-status-icon");

const feels = document.querySelector(".feels > span");
const wind = document.querySelector(".wind > span");
const windGust = document.querySelector(".wind-gust > span");
const pressure = document.querySelector(".pressure > span");
const visibility = document.querySelector(".visibility > span");
const humidity = document.querySelector(".humidity > span");
const sunrise = document.querySelector(".sunrise .stats");
const sunset = document.querySelector(".sunset .stats");

const KEY = "5943486d8d5be825b7f2cf0cc6b9375d";
let params = new URLSearchParams({
  APPID: KEY,
  units: "metric",
  lang: "ru",
});

Object.prototype.capFstLtr = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function setLocalStorage(item) {
  localStorage.setItem("city", JSON.stringify(item));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("city")) || "";
}

async function getWeather(req) {
  try {
    load.classList.remove("transparent");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${params}+&q=${req}`,
      { mode: "cors" }
    );
    load.classList.add("transparent");
    displayData(await response.json());
  } catch (err) {
    console.error("DATA HAS NOT RECIVED!\n", err);
    displayError();
  }
}

function displayData(data) {
  console.log(data);

  city.textContent = `${data.name}, ${data.sys.country.toLowerCase()}`;
  temperature.textContent = `${data.main.temp.toFixed(1)}°`;
  temperatureMin.textContent = `${data.main.temp_min.toFixed(1)}°`;
  temperatureMax.textContent = `${data.main.temp_max.toFixed(1)}°`;
  wetatherStatus.textContent = `${data.weather[0].description.capFstLtr()}`;
  wetatherStatusIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  changeBG(data.weather[0].icon, data.timezone);

  feels.textContent = `${data.main.feels_like.toFixed(1)}°`;
  wind.textContent = `${data.wind.speed} м/с, ${checkDirection(data.wind.deg)}`;
  windGust.textContent = `${data.wind.gust} м/с`;
  pressure.textContent = ` ${data.main.pressure} гПа`;
  visibility.textContent = `${(data.visibility / 1000).toFixed(1)} км`;
  humidity.textContent = `${data.main.humidity}%`;

  sunrise.textContent = format(fromUnixTime(data.sys.sunrise), "hh:mm aa");
  sunset.textContent = format(fromUnixTime(data.sys.sunset), "hh:mm aa");

  responseTime.innerText = format(new Date(), "HH:mm");
}

function displayError() {
  temperature.textContent = "Incorrect city";
  wetatherStatus.textContent = "Please, enter correct city name";
}

searchBtn.addEventListener("click", () => {
  setLocalStorage(searchInput.value);
  getWeather(getLocalStorage("cities"));
});

searchInput.addEventListener("keyup", function (key) {
  key.preventDefault();
  if (key.keyCode === 13) {
    setLocalStorage(searchInput.value);
    getWeather(getLocalStorage("cities"));
  }
});

window.onload = () => {
  getWeather(getLocalStorage("cities"));
};
