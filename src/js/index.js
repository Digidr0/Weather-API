import "..//css/style.css";
import "..//css/header.css";
import "..//css/background.css";
import "..//css/load.css";
import "..//css/main.css";
import displayData from "./displayData";

const searchInput = document.querySelector(".search.input");
const searchBtn = document.querySelector(".search.btn");
const load = document.querySelector(".lds-ellipsis");

const temperature = document.querySelector(".temperature");
const wetatherStatus = document.querySelector(".weather-status");

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
