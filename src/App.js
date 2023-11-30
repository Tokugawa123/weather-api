import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import CityInput from "./components/CityInput";
import WeatherBox from "./components/WeatherBox";
import MainWeatherWindow from "./components/MainWeatherWindow";

function App() {
  const [inputcity, setInputcity] = useState(undefined);
  const [days, setDays] = useState([]);

  //const [api_data, setApi_data] = useState([]);
  const [weather, setWeather] = useState([]);

  function updateState(data) {
    const city = data.city.name;
    let weather1 = [];
    const dayIndices = getDayIndices(data);
    days.length = 0;
    for (let i = 0; i < 5; i++) {
      days.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: data.list[dayIndices[i]].main.temp,
      });
      weather1.push(data.list[dayIndices[i]].weather[0].description);
    }
    setWeather(weather1);
    setInputcity(data.city.name);
    setDays(days);
  }

  // useEffect(() => {
  //   makeApiCall(inputcity);
  // }, []);

  // tries to make an API call with the given city name and triggers state update
  async function makeApiCall(city) {
    const api_data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
    ).then((resp) => resp.json());
    if (api_data?.cod === "200") {
      updateState(api_data);
    }
    // else return false;
  }

  // returns array with Indices of the next five days in the list
  // from the API data (every day at 12:00 pm)
  function getDayIndices(data) {
    let dayIndices = [];
    dayIndices.push(0);

    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== "15"
      ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  }

  function WeatherBoxes() {
    const weatherBoxes = days.slice(1).map((day) => (
      <li>
        <WeatherBox {...day} />
        {/* <p>{day.icon}</p> */}
      </li>
    ));

    return <ul className="weather-box-list">{weatherBoxes}</ul>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <MainWeatherWindow data={days[0]} city={inputcity}></MainWeatherWindow>
        {/* <h1>The Weather Information</h1>
            <p className="cityname">City Name: {inputcity}</p>
            <p>{weather}</p> */}
        <CityInput city={inputcity} ApiCall={makeApiCall} />

        <WeatherBoxes />
      </header>
    </div>
  );
}

export default App;
