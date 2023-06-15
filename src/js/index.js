import "..//css/style.css";
import "..//css/header.css";
import "..//css/background.css";
import "..//css/load.css";
import "..//css/main.css";
import displayData from "./displayData";
import displayForecast from "./displayForecast";
import cities from "./cities.json";

const searchInput = document.querySelector(".search.input");
const searchBtn = document.querySelector(".search.btn");
const load = document.querySelector(".lds-ellipsis");

const temperature = document.querySelector(".temperature");
const wetatherStatus = document.querySelector(".weather-status");

//request parametrs
let params = new URLSearchParams({
  APPID: "5943486d8d5be825b7f2cf0cc6b9375d",
  units: "metric",
  lang: "ru",
});
Object.prototype.capFstLtr = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
//set city name in local storage (null if u 1st tiem visit page)
function setLocalStorage(item) {
  localStorage.setItem("city", JSON.stringify(item));
}
//get city from localstorage
function getLocalStorage() {
  return JSON.parse(localStorage.getItem("city")) || "Moscow";
}
//create new weather request to openWeatherMap using parametrs
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
//create new forecast request to openWeatherMap using parametrs
async function getForecast(req) {
  try {
    load.classList.remove("transparent");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${params}+&q=${req}`,
      { mode: "cors" }
    );
    load.classList.add("transparent");
    displayForecast(await response.json());
  } catch (err) {
    console.error("DATA HAS NOT RECIVED!\n", err);
    displayError();
  }
}
//display err in console
function displayError() {
  temperature.textContent = "Incorrect city";
  wetatherStatus.textContent = "Please, enter correct city name";
}
//search button event
searchBtn.addEventListener("click", () => {
  setLocalStorage(searchInput.value);
  getWeather(getLocalStorage("cities"));
});
//autocomplete input event
searchInput.addEventListener("keyup", function (key) {
  removeElements();
  for (let i of cities) {
    if (
      i.toLowerCase().startsWith(searchInput.value.toLowerCase()) &&
      searchInput.value != "" && document.querySelectorAll(".list-items")?.length < 10
    ) {
      let listItem = document.createElement("li");

      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.onclick = function () {
        searchInput.value = i;
        removeElements();
        startRequest();
      };

      let word = "<b>" + i.substr(0, searchInput.value.length) + "</b>";
      word += i.substr(searchInput.value.length);
      listItem.innerHTML = word;
      document.querySelector(".list").appendChild(listItem);
    }
  }
});
function displayNames(value) {
  searchInput.value = value;
}
function removeElements() {
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
}
//"Enter" keyup event
searchInput.addEventListener("keyup", function (key) {
  key.preventDefault();
  if (key.keyCode === 13) startRequest()
});
function startRequest(){
  setLocalStorage(searchInput.value);
  getWeather(getLocalStorage("cities"));
  getForecast(getLocalStorage("cities"));
}
//on load get request and display data
window.onload = () => {
  getWeather(getLocalStorage("cities"));
  getForecast(getLocalStorage("cities"));
};
