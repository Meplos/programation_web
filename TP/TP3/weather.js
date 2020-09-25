const API_URL = "https://www.prevision-meteo.ch/services/json/";
const CITY_PARAM = "nom_ville";
const container = document.querySelector("#data");
document.querySelector("#submit").addEventListener("click", getCityWeather);

function getCityWeather() {
  const city = document.querySelector("#city").value;
  if (city != "") {
    fetch(new Request(encodeURI(`${API_URL}${city}`)), { mode: "cors" })
      .then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            setName(data.city_info.name);
            const current_condition = data.current_condition;
            setCondition(current_condition.condition);
            unsetIcon();
            setIcon(current_condition.icon_big);
            setTemperature(current_condition.tmp);
            setHumidity(current_condition.humidity);
            setWindDir(current_condition.wnd_dir);
            setWindSpeed(current_condition.wnd_spd);
          });
        }
      })
      .catch((err) => console.log(err));
  }

  console.log(city);
}

function setWindDir(dir) {
  container.querySelector("#windDir").innerHTML = dir;
}

function setWindSpeed(speed) {
  container.querySelector("#windSpeed").innerHTML = speed;
}
function setHumidity(humidity) {
  container.querySelector("#humidity").innerHTML = humidity;
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
  container.querySelector("#temperature").innerHTML = tmp;
}
function setIcon(src) {
  document.querySelector("#icon").src = src;
}

function unsetIcon() {
  document.querySelector("#icon").innerHTML = "";
}
