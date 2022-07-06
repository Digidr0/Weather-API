import { getTime, format, addSeconds, fromUnixTime } from "date-fns";

export default function changeBG(icon, zone) {
  const top = document.querySelector("#cf2 > .top");
  const bottom = document.querySelector("#cf2 > .bottom");

  let date = new Date();
  let GMT = new Date(
    date.getUTCDate(),
    date.getUTCMonth(),
    date.getUTCDay(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  let time = format(addSeconds(GMT, zone), "H"); //return Hour
  time = parseFloat(time);

  let code = icon.slice(0, 2);
  let url = "";
  let index = 0;
  const hours = [0, 6, 10, 18, 23];

  // MIDNIGHT
  if (hours[0] <= time || time >= hours[1]) {
    switch(code){
    case "01": url = "https://i.imgur.com/I7bPyBV.jpeg"; break; // clear sky
    case "02": url = "https://i.imgur.com/I7bPyBV.jpeg"; break; // few clouds
    case "03": url = "https://i.imgur.com/I7bPyBV.jpeg"; break; // scattered clouds
    case "04": url = "https://i.imgur.com/iXenAaO.jpeg"; break; // broken clouds
    case "09": url = "https://i.imgur.com/iXenAaO.jpeg"; break; // shower rain
    case "10": url = "https://i.imgur.com/iXenAaO.jpeg"; break; // rain
    case "11": url = "https://i.imgur.com/3KumHbz.jpeg"; break; // thunderstorm
    case "13": url = "https://i.imgur.com/Nvcjewu.jpeg"; break; // snow
    case "50": url = "https://i.imgur.com/I7bPyBV.jpeg"; break; // mist
    }
    index = 1;
  }
  // A.M.
  if (hours[1] <= time || time >= hours[2]) {
    switch(code){
    case "01": url = "https://i.imgur.com/OCFBs6T.jpeg"; break; // clear sky
    case "02": url = "https://i.imgur.com/OCFBs6T.jpeg"; break; // few clouds
    case "03": url = "https://i.imgur.com/OCFBs6T.jpeg"; break; // scattered clouds
    case "04": url = "https://i.imgur.com/IGRMbJL.jpeg"; break; // broken clouds
    case "09": url = "https://i.imgur.com/IGRMbJL.jpeg"; break; // shower rain
    case "10": url = "https://i.imgur.com/IGRMbJL.jpeg"; break; // rain
    case "11": url = "https://i.imgur.com/x79omNw.jpeg"; break; // thunderstorm
    case "13": url = "https://i.imgur.com/i4RSdEH.jpeg"; break; // snow
    case "50": url = "https://i.imgur.com/OCFBs6T.jpeg"; break; // mist
    }
    index = 2;
  }
  // NOON
  if (hours[2] <= time || time >= hours[3]) {
    switch(code){
    case "01": url = "https://i.imgur.com/q6QW1oX.jpeg"; break; // clear sky
    case "02": url = "https://i.imgur.com/q6QW1oX.jpeg"; break; // few clouds
    case "03": url = "https://i.imgur.com/q6QW1oX.jpeg"; break; // scattered clouds
    case "04": url = "https://i.imgur.com/TZOzcMe.jpeg"; break; // broken clouds
    case "09": url = "https://i.imgur.com/TZOzcMe.jpeg"; break; // shower rain
    case "10": url = "https://i.imgur.com/TZOzcMe.jpeg"; break; // rain
    case "11": url = "https://i.imgur.com/TRhSWUq.jpeg"; break; // thunderstorm
    case "13": url = "https://i.imgur.com/i5arIuU.jpeg"; break; // snow
    case "50": url = "https://i.imgur.com/q6QW1oX.jpeg"; break; // mist
    }
    index = 3;
  }
  // P.M.
  if (hours[3] <= time || time >= hours[4]) {
    switch(code){
    case "01": url = "https://i.imgur.com/WAvBvxh.jpeg"; break; // clear sky
    case "02": url = "https://i.imgur.com/WAvBvxh.jpeg"; break; // few clouds
    case "03": url = "https://i.imgur.com/WAvBvxh.jpeg"; break; // scattered clouds
    case "04": url = "https://i.imgur.com/wLvmVRP.jpeg"; break; // broken clouds
    case "09": url = "https://i.imgur.com/wLvmVRP.jpeg"; break; // shower rain
    case "10": url = "https://i.imgur.com/wLvmVRP.jpeg"; break; // rain
    case "11": url = "https://i.imgur.com/LMl3tB5.jpeg"; break; // thunderstorm
    case "13": url = "https://i.imgur.com/0KBdL0o.jpeg"; break; // snow
    case "50": url = "https://i.imgur.com/WAvBvxh.jpeg"; break; // mist
    }
    index = 4;
  }

  async function delay() {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    bottom.src = url;
    top.classList.add("transparent");
    document.documentElement.style.setProperty(
      "color",
      `var( --wallpaper-color-${index})`
    );

    await sleep(1000);
    top.src = url;
    top.classList.remove("transparent");
  }
  delay();
}
