import { DashboardOutlined, FullscreenOutlined } from "@ant-design/icons";
import React from "react";

function City({ name, temperature, speed, feelsLike, weatherDescription, pressure, humidity, visibility }) {
  return (
    <div className="informationWrapper">
      <div className="firstWrapper">
        <span>{name}</span>
      </div>
      <div className="secondWrapper">
        <img
          src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
          alt="pic"
        />
        <h2>{temperature}°C</h2>
      </div>
      <p>
        {" "}
        По ощущениям: {feelsLike}°C, {weatherDescription}
      </p>
      <div className="thirdWrapper">
        <div className="wind">
          <FullscreenOutlined />
          <p>ветер: {speed} м/с</p>
        </div>
        <div className="pressure">
          <DashboardOutlined />
          <p>{pressure} hPa</p>
        </div>
      </div>
      <div className="other">
        <p>влажность: {humidity}%</p>
        <p>видимость: {visibility}км</p>
      </div>
    </div>
  );
}

export default City;
