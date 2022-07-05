import changeBG from "./changeBG";
import checkDirection from "./checkDirection";
import {format, fromUnixTime} from "date-fns";

export default function displayData(data) {
  const title = document.querySelector("title");
  const favicon = document.querySelector("link[rel~='icon']");

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
  console.log(data);

  title.innerText = `Weather in ${data.name} ${data.main.temp.toFixed(1)}°`;

  city.textContent = `${data.name}, ${data.sys.country.toLowerCase()}`;
  temperature.textContent = `${data.main.temp.toFixed(1)}°`;
  temperatureMin.textContent = `${data.main.temp_min.toFixed(1)}°`;
  temperatureMax.textContent = `${data.main.temp_max.toFixed(1)}°`;
  wetatherStatus.textContent = `${data.weather[0].description.capFstLtr()}`;
  wetatherStatusIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  changeBG(data.weather[0].icon, data.timezone);
  favicon.href = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

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
