import { useState } from "react";
import "./CityInput.css";

function CityInput(props) {
  const [city, setCityName] = useState("");

  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (/^[a-zA-Z]+$/.test(city)) {
        e.target.classList.add("loading");

        if (await props.ApiCall(city)) e.target.placeholder = "Enter a City...";
        else e.target.placeholder = "City was not found, try again...";
      } else e.target.placeholder = "Please enter a valid city name...";
      e.target.classList.remove("loading");
      e.target.value = "";
    }
  }

  return (
    <div>
      <input
        className="city-input"
        style={{ top: props.city ? "-380px" : "20px" }}
        type="text"
        placeholder="Enter a City"
        onChange={(event) => setCityName(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default CityInput;
