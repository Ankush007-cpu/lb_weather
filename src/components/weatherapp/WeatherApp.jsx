import "./weatherapp.css";
import { useState, useRef, useEffect } from "react";


import Windicon from "../../Img_icons/wind.png";
import Humiicon from "../../Img_icons/w3.png";
import Rainicon from "../../Img_icons/w5.png";


import Snow from "../../assets/extremlysnow.png";
import Foogy from "../../assets/foogychilly.png";
import CPresent from "../../assets/cloudypresent.png";
import CWarn from "../../assets/cloudywarn.png";
import Sun from "../../assets/sun.png";


import rainyBG from "../../assets/rainy-background.jpg";
import sunnyBG from "../../assets/sunny-background.jpg";
import nightBG from "../../assets/night-background.jpg";
import defaultBG from "../../assets/default-background.jpg";

const weatherImg = [Snow, Foogy, CPresent, CWarn, Sun];

function WeatherApp() {
  let inputRef = useRef(null);
  const [userValue, setUserValue] = useState(""); // Stores the searched location
  const [weatherVal, setWeatherVal] = useState({}); // Stores weather data
  const [currentLocation, setCurrentLocation] = useState({}); // Stores current location
  const [bgImage, setBgImage] = useState(defaultBG); // Background image state

  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCurrentLocation({ lat, lon });

          
          fetchWeather(lat, lon);
        },
        (error) => {
          console.error("Location permission denied:", error);
          alert("Location access is required for real-time weather updates.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  
  const fetchWeather = (lat, lon) => {
    let apiKey = "ea43d1193aeb47378b494822251702";
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) => {
        let cityName = data.location.name;
        let temperature = Math.round(data.current.temp_c);
        let wCondition = data.current.condition.text;
        let wind = Math.round(data.current.wind_kph);
        let humidity = Math.round(data.current.humidity);
        let rain = Math.round(
          data.forecast.forecastday[0].day.daily_chance_of_rain
        );

        
        setBackgroundImage(wCondition);

        
        setWeatherVal({
          cityName,
          temperature,
          wCondition,
          wind,
          humidity,
          rain,
        });
      })
      .catch((error) => console.error(`Error fetching weather: ${error}`));
  };

  
  const setBackgroundImage = (condition) => {
    const currentTime = new Date().getHours();

    if (condition.includes("Rain")) {
      setBgImage(rainyBG);
    } else if (condition.includes("Clear") && currentTime > 6 && currentTime < 18) {
      setBgImage(sunnyBG);
    } else if (condition.includes("Clear") && (currentTime < 6 || currentTime > 18)) {
      setBgImage(nightBG);
    } else {
      setBgImage(defaultBG);
    }
  };

  
  const userInput = () => {
    setUserValue(inputRef.current.value);
  };

  
  useEffect(() => {
    if (userValue) {
      fetchWeather(userValue);
    }
  }, [userValue]);

  return (
    <div className="Weather-main" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="input-div">
        <input type="text" id="input" ref={inputRef} placeholder="Search city..." />
        <i className="fas fa-search" onClick={userInput}></i>
      </div>

      {weatherVal.cityName ? (
        <div className="allinfo-about-input-value">
          <h2>{weatherVal.cityName}</h2>
          <h1>{weatherVal.temperature}°C</h1>
          <p>{weatherVal.wCondition}</p>
        </div>
      ) : (
        <h3>Fetching weather...</h3>
      )}

      <div className="weatherinfo-allofthes">
        <div className="spped-box" id="wind-box">
          <img src={Windicon} alt="Wind Speed Icon" />
          <h2>{weatherVal.wind} km/h</h2>
          <p>Wind</p>
        </div>
        <div className="spped-box" id="Humidity-box">
          <img src={Humiicon} alt="Humidity Icon" />
          <h2>{weatherVal.humidity}%</h2>
          <p>Humidity</p>
        </div>
        <div className="spped-box" id="Rain-box">
          <img src={Rainicon} alt="Rain Icon" />
          <h2>{weatherVal.rain}%</h2>
          <p>Rain</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
