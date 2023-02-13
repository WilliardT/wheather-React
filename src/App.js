import React, { useEffect, useState } from "react";
import axios from "axios";

import Settings from "./components/Settings";
import City from "./components/City";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { SettingOutlined } from "@ant-design/icons";

// 1f1469c9e470edf779ea1cbf392d8bad
// https://openweathermap.org/current
// https://openweathermap.org/current#data

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=1f1469c9e470edf779ea1cbf392d8bad&units=metric&lang=ru - шаблон
// https://api.openweathermap.org/data/2.5/weather?lat=51.5073219&lon=-0.1276474&appid=1f1469c9e470edf779ea1cbf392d8bad - лондон
// https://api.openweathermap.org/data/2.5/weather?lat={55.7504461}&lon={37.6174943}&appid=1f1469c9e470edf779ea1cbf392d8bad&units=metric&lang=ru - москва

const dataCity = [
  { city: "London" },
  { city: "Moscow, RU", lon: 37.6174943, lat: 55.7504461 },
  { city: "Antaliya, TU" },
];

function App() {
  const [dataWeather, setDataWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [speed, setSpeed] = useState("");
  const [pressure, setPressure] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [viewSetting, setViewSetting] = useState(true); //false
  const [cityData, setCityData] = useState(dataCity || []);
  const [targetCity, setTargetCity] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    try {
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?lat=55.7504461&lon=37.6174943&appid=1f1469c9e470edf779ea1cbf392d8bad&units=metric&lang=ru"
        )
        .then((obj) => {
          setDataWeather(obj.data);
          setTemperature(Math.round(obj.data.main.temp));
          setFeelsLike(Math.round(obj.data.main.feels_like));
          setWeatherDescription(obj.data.weather[0].description);
          setSpeed(Math.round(obj.data.wind.speed));
          setPressure(obj.data.main.pressure);
          setHumidity(obj.data.main.humidity);
          setVisibility(Math.round(obj.data.visibility / 1000));
        });
    } catch (error) {
      console.warn(error);
    }
  }, []);

  const handleViewSetting = () => {
    setViewSetting(true);
  };

  const onRemove = (index) => {
    if (window.confirm("удалить этот город?")) {
      setCityData([...cityData.slice(0, index), ...cityData.slice(index + 1)]);
    }
  };

  const sortCities = () => {
    setCityData((prev) => prev.sort((obj) => obj.id === targetCity));
  };

  const addCity = (e) => {
    setInputValue(e.target.value);
  };

  const addCityToData = () => {
    const newCity = {
      city: inputValue,
    };
    setCityData([newCity, ...cityData]);
  };

  return (
    <div className="App">
      <Card style={{ width: "18rem", marginTop: "10%", marginLeft: "40%" }}>
        <Card.Body>
          <Card.Img
            variant="top"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRyQEtUUzYEZagjCIK3Lb5t8iVcCPmFrVykA&usqp=CAU"
            alt="pic"
          />
          {!viewSetting && (
            <SettingOutlined
              style={{ marginLeft: "14.8em" }}
              onClick={handleViewSetting}
            />
          )}
          {viewSetting && (
            <Settings
              sortCities={sortCities}
              setTargetCity={setTargetCity}
              setViewSetting={setViewSetting}
              cityData={cityData}
              onRemove={onRemove}
              addCity={addCity}
              addCityToData={addCityToData}
            />
          )}
          {dataWeather ? (
            <City
              name={dataWeather.name}
              temperature={temperature}
              speed={speed}
              feelsLike={feelsLike}
              weatherDescription={weatherDescription}
              pressure={pressure}
              humidity={humidity}
              visibility={visibility}
            />
          ) : (
            "добавьте хотя бы один город"
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
