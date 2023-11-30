import { useState } from "react";
import "./WeatherBox.css";
// import mySVG from "../images/01d.svg";

function WeatherBox(props) {
  function getDay(date) {
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[new Date(date).getDay()];
  }

  return (
    <div className="weather-box">
      <h1>{props.date ? getDay(props.date) : ""}</h1>

      <img
        src={
          props.icon
            ? require(`../images/${props.icon}.svg`)
            : require("../images/01d.png")
        }
        alt="Sun"
      ></img>
      <span className="temp">{Math.round(props.temp - 273.15)}°C</span>
    </div>
  );
}

export default WeatherBox;
