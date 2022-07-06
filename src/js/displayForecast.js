import changeBG from "./changeBG";
import checkDirection from "./checkDirection";
import { format, fromUnixTime } from "date-fns";
import Chart from "chart.js/auto";

let used = false;
let myChart;

export default function displayForecast(data) {
  console.log("Forecast data:\n", data);

  let hours = [];
  let temps = [];
  
  const valuesMaxNumber = 17; //max 40 // 1 day = 8
  const sampling = 2;

  function getArray() {
    for (
      let i = 0;
      i < data.list.length - (data.list.length - valuesMaxNumber);
      i = i + sampling
    ) {
      hours.push(data.list[i].dt_txt.slice(11, 16));
      temps.push(data.list[i].main.temp.toFixed(1));
    }
  }
  getArray();

  if (!used) {
    used = true;
    let canvas = document.getElementById("chart");
    let chart = canvas.getContext("2d");
    canvas.width = window.innerWidth;

    Chart.defaults.color = "#FFF8";
    Chart.defaults.font.size = 14;
    Chart.defaults.font.family = "Helvetica";
    Chart.defaults.color = "#FFF8";
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.elements.point.radius = 5;
    Chart.defaults.elements.point.hitRadius = 40;
    Chart.defaults.elements.point.pointStyle = "crossRot";
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0)';


    myChart = new Chart(chart, {
      type: "line",
      data: {
        labels: hours,
        datasets: [
          {
            label: "Temp",
            data: temps,
            backgroundColor: "#FFF",
            borderColor: "#FFF",
            borderWidth: "1",
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        },
      },
    });
  }
  function refreshData() {
    myChart.data.labels = hours;
    myChart.data.datasets[0].data = temps;
    myChart.update();
  }
  refreshData();
}
