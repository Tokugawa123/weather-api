import "./MainWeatherWindow.css";

function MainWeatherWindow(props) {
  const Title = props.city ? null : <h1 className="title">Weather Forecast</h1>;

  return (
    <div className="main">
      <div className="inner-main">
        {Title}
        <img
          src={
            props.data
              ? require(`../images/${props.data.icon}.svg`)
              : require("../images/01d.png")
          }
          alt="sun"
          style={{
            visibility: props.city ? "visible" : "hidden",
            opacity: props.city ? "1" : "0",
          }}
        />

        <div
          className="today"
          style={{
            visibility: props.city ? "visible" : "hidden",
            opacity: props.city ? "1" : "0",
          }}
        >
          <h3>Today</h3>
          <h1>{props.city}</h1>
          <p>
            Temperature: {props.data ? Math.round(props.data.temp - 273.15) : 0}
            °C
          </p>
          <p>{props.data ? props.data.weather_desc.toLowerCase() : ""}</p>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default MainWeatherWindow;
