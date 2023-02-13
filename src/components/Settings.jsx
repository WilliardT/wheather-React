import React from "react";

import {
  CloseOutlined,
  DeleteOutlined,
  SendOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

// менять местами элементы to do списка react

function Settings({
  cityData,
  setViewSetting,
  onRemove,
  setTargetCity,
  addCity,
  addCityToData,
  sortCities,
}) {

// const onDragCity = () => {
//   window.city.onMouseMove = function (event) {
//     let shiftX = event.clientY - window.city.getBoundingClientRect().left;
//     let shiftY = event.clientY - window.city.getBoundingClientRect().top;

//     window.city.style.position = "absolute";
//     window.city.style.zIndex = 1000;
//     document.body.append(window.city);
//     moveAt(event.pageX, event.pageY);

//     function moveAt(pageX, pageY) {
//       window.city.style.top = pageX - shiftX / 2 + "px";
//       window.city.style.top = pageY - shiftY / 2 + "px";
//     }

//     function onMouseMove(event) {
//       moveAt(event.pageX, event.pageY);
//     }

//     document.addEventListener("onMouseMove", onMouseMove);

//     window.city.onMouseUp = function () {
//       document.removeEventListener("onMouseMove", onMouseMove);
//       window.city.onmouseup = null;
//     };

//     window.city.onDragStart = function() {
//       return false;
//     };
//   };
// }


  

  return (
    <div className="settingsWrapper">
      <div className="settingHeader">
        <p>настройки:</p>
        <CloseOutlined onClick={() => setViewSetting(false)} />
      </div>
      <div className="cities">
        {cityData
          ? cityData.map((obj, index) => (
              <div
                key={index}
                className="city"
                onClick={() => setTargetCity(index)}
                draggable="true"
                
              >
                <div className="left">
                  <UnorderedListOutlined
                    style={{ marginRight: 20 }}
                    sortCities={() => {}}
                  />
                  <p>{obj.city}</p>
                </div>
                <DeleteOutlined onClick={() => onRemove(index)} />
              </div>
            ))
          : "добавьте город"}
      </div>
      <div className="addCity">
        <p>Добавить город:</p>
        <div className="searchWrapper">
          <Input
            placeholder="введите город..."
            style={{ margin: 2 }}
            onChange={(e) => addCity(e)}
          />
          <SendOutlined onClick={addCityToData} />
        </div>
      </div>
    </div>
  );
}

export default Settings;
