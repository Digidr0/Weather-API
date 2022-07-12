import { getTime, format, addSeconds, fromUnixTime } from "date-fns";

export default function changeBG(icon, zone) {
  const top = document.querySelector(".top");
  const bottom = document.querySelector(".bottom");
  const themcolor = document.querySelector(".theme-color");

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
    switch (code) {
      // clear sky ,  few clouds, scattered clouds, mist
      case "01":
      case "02":
      case "03":
      case "50":
        url = "https://i.imgur.com/I7bPyBV.jpeg";
        break;
      // broken clouds, shower rain, rain
      case "04":
      case "09":
      case "10":
        url = "https://i.imgur.com/iXenAaO.jpeg";
        break;
      // thunderstorm
      case "11":
        url = "https://i.imgur.com/3KumHbz.jpeg";
        break;
      // snow
      case "13":
        url = "https://i.imgur.com/Nvcjewu.jpeg";
        break;
    }
    index = 1;
    themcolor.content = "#b2e4fd";
  }
  // A.M.
  if (hours[1] <= time || time >= hours[2]) {
    switch (code) {
      // clear sky ,  few clouds, scattered clouds, mist
      case "01":
      case "02":
      case "03":
      case "50":
        url = "https://i.imgur.com/OCFBs6T.jpeg";
        break;
      // broken clouds, shower rain, rain
      case "04":
      case "09":
      case "10":
        url = "https://i.imgur.com/IGRMbJL.jpeg";
        break;
      // thunderstorm
      case "11":
        url = "https://i.imgur.com/x79omNw.jpeg";
        break;
      // snow
      case "13":
        url = "https://i.imgur.com/i4RSdEH.jpeg";
        break;
    }
    index = 2;
    themcolor.content = "#463ffe";
  }
  // NOON
  if (hours[2] <= time || time >= hours[3]) {
    switch (code) {
      // clear sky ,  few clouds, scattered clouds, mist
      case "01":
      case "02":
      case "03":
      case "50":
        url = "https://i.imgur.com/q6QW1oX.jpeg";
        break;
      // broken clouds, shower rain, rain
      case "04":
      case "09":
      case "10":
        url = "https://i.imgur.com/TZOzcMe.jpeg";
        break;
      // thunderstorm
      case "11":
        url = "https://i.imgur.com/TRhSWUq.jpeg";
        break;
      // snow
      case "13":
        url = "https://i.imgur.com/i5arIuU.jpeg";
        break;
    }
    index = 3;
    themcolor.content = "#3a1737";
  }
  // P.M.
  if (hours[3] <= time || time >= hours[4]) {
    switch (code) {
      // clear sky ,  few clouds, scattered clouds, mist
      case "01":
      case "02":
      case "03":
      case "50":
        url = "https://i.imgur.com/WAvBvxh.jpeg";
        break;
      // broken clouds, shower rain, rain
      case "04":
      case "09":
      case "10":
        url = "https://i.imgur.com/wLvmVRP.jpeg";
        break;
      // thunderstorm
      case "11":
        url = "https://i.imgur.com/LMl3tB5.jpeg";
        break;
      // snow
      case "13":
        url = "https://i.imgur.com/0KBdL0o.jpeg";
        break;
    }
    index = 4;
    themcolor.content = "#6f0948";
  }
  //sleep for images transition
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
