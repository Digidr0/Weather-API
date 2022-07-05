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
    case "01": url = "https://i.imgur.com/I7bPyBV.jpeg"; // clear sky
    case "02": url = "https://i.imgur.com/I7bPyBV.jpeg"; // few clouds
    case "03": url = "https://i.imgur.com/I7bPyBV.jpeg"; // scattered clouds
    case "04": url = "https://i.imgur.com/iXenAaO.jpeg"; // broken clouds
    case "09": url = "https://i.imgur.com/iXenAaO.jpeg"; // shower rain
    case "10": url = "https://i.imgur.com/iXenAaO.jpeg"; // rain
    case "11": url = "https://i.imgur.com/3KumHbz.jpeg"; // thunderstorm
    case "13": url = "https://i.imgur.com/Nvcjewu.jpeg"; // snow
    case "50": url = "https://i.imgur.com/I7bPyBV.jpeg"; // mist
    }
    index = 1;
  }
  // A.M.
  if (hours[1] <= time || time >= hours[2]) {
    switch(code){
    case "01": url = "https://i.imgur.com/OCFBs6T.jpeg"; // clear sky
    case "02": url = "https://i.imgur.com/OCFBs6T.jpeg"; // few clouds
    case "03": url = "https://i.imgur.com/OCFBs6T.jpeg"; // scattered clouds
    case "04": url = "https://i.imgur.com/IGRMbJL.jpeg"; // broken clouds
    case "09": url = "https://i.imgur.com/IGRMbJL.jpeg"; // shower rain
    case "10": url = "https://i.imgur.com/IGRMbJL.jpeg"; // rain
    case "11": url = "https://i.imgur.com/x79omNw.jpeg"; // thunderstorm
    case "13": url = "https://i.imgur.com/i4RSdEH.jpeg"; // snow
    case "50": url = "https://i.imgur.com/OCFBs6T.jpeg"; // mist
    }
    index = 2;
  }
  // NOON
  if (hours[2] <= time || time >= hours[3]) {
    switch(code){
    case "01": url = "https://i.imgur.com/q6QW1oX.jpeg"; // clear sky
    case "02": url = "https://i.imgur.com/q6QW1oX.jpeg"; // few clouds
    case "03": url = "https://i.imgur.com/q6QW1oX.jpeg"; // scattered clouds
    case "04": url = "https://i.imgur.com/TZOzcMe.jpeg"; // broken clouds
    case "09": url = "https://i.imgur.com/TZOzcMe.jpeg"; // shower rain
    case "10": url = "https://i.imgur.com/TZOzcMe.jpeg"; // rain
    case "11": url = "https://i.imgur.com/TRhSWUq.jpeg"; // thunderstorm
    case "13": url = "https://i.imgur.com/i5arIuU.jpeg"; // snow
    case "50": url = "https://i.imgur.com/q6QW1oX.jpeg"; // mist
    }
    index = 3;
  }
  // P.M.
  if (hours[3] <= time || time >= hours[4]) {
    switch(code){
    case "01": url = "https://i.imgur.com/WAvBvxh.jpeg"; // clear sky
    case "02": url = "https://i.imgur.com/WAvBvxh.jpeg"; // few clouds
    case "03": url = "https://i.imgur.com/WAvBvxh.jpeg"; // scattered clouds
    case "04": url = "https://i.imgur.com/wLvmVRP.jpeg"; // broken clouds
    case "09": url = "https://i.imgur.com/wLvmVRP.jpeg"; // shower rain
    case "10": url = "https://i.imgur.com/wLvmVRP.jpeg"; // rain
    case "11": url = "https://i.imgur.com/LMl3tB5.jpeg"; // thunderstorm
    case "13": url = "https://i.imgur.com/0KBdL0o.jpeg"; // snow
    case "50": url = "https://i.imgur.com/WAvBvxh.jpeg"; // mist
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
