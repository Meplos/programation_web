const API_URL = "https://www.prevision-meteo.ch/services/json/";
const container = document.querySelector("#data");

document.querySelector("#submit").addEventListener("click", getCityWeather);

function getCityWeather() {
  const city = document.querySelector("#city").value;
  if (city != "") {
    fetch(new Request(encodeURI(`${API_URL}${city}`)), { mode: "cors" })
      .then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            if (data.city_info) {
              container.querySelector("#container").style.display = "none";
              printWeather(data);
            } else {
              printError();
            }
          });
        }
      })
      .catch((err) => console.log(err));
  }

  console.log();
}

function setDateTime(date, time) {
  container.querySelector("#dateTime").innerHTML = `${date} ${time}`;
}
function setWindDir(dir) {
  container.querySelector("#windDir").innerHTML = "Direction du vent : " + dir;
}

function setWindSpeed(speed) {
  container.querySelector("#windSpeed").innerHTML =
    "Vitesse du vent : " + speed + " km/h";
}
function setHumidity(humidity) {
  container.querySelector("#humidity").innerHTML =
    "Humidité : " + humidity + "%";
}

function setName(name) {
  container.querySelector("#cityName").innerHTML = name;
}

function setCondition(condition) {
  container.querySelector(
    "#condition"
  ).innerHTML = `il fait actulement ${condition}`;
}

function setTemperature(tmp) {
  container.querySelector("#temperature").innerHTML =
    "Temperature : " + tmp + "°C";
}
function setIcon(src) {
  document.querySelector("#icon").src = src;
}

function getWeatherWithPos(lat, long) {
  fetch(new Request(encodeURI(`${API_URL}lat=${lat}lng=${long}`)), {
    mode: "cors",
  }).then((res) => {
    if (res.status == 200) {
      res.json().then((data) => {
        if (data.city_info) printWeather(data);
        else {
          printError();
        }
      });
    }
  });
}

function printWeather(data) {
  const current_condition = data.current_condition;
  console.log(data);
  setName(data.city_info.name);
  setDateTime(current_condition.date, current_condition.hour);
  setCondition(current_condition.condition);
  setIcon(current_condition.icon_big);
  setTemperature(current_condition.tmp);
  setHumidity(current_condition.humidity);
  setWindDir(current_condition.wnd_dir);
  setWindSpeed(current_condition.wnd_spd);
}

function printError() {
  container.querySelector(
    "#err_msg"
  ).innerHTML = `Error. Please enter a French city`;
  container.querySelector("#container").style.display = "none";
}
