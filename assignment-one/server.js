"use strict";

const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

const path = require("path");
let publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/weather/:city", sendWeatherData);
app.get("/airpollution/:lat/:lon", sendAirPollutionData);

function sendWeatherData(req, res) {
  let city = req.params.city;

  // Add to a private files
  let apiKey = "4fda716a357f34ff51ad31191ff68603";

  let url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";

  console.log(url);

  https.get(url, (response) => {
    let weatherData = "";
    response.on("data", (data) => {
      weatherData += data;
    });
    response.on("end", () => {
      const finalWeatherData = JSON.parse(weatherData);
      console.log(finalWeatherData);
      res.json(finalWeatherData);
    });
  });
}

function sendAirPollutionData(req, res) {
  let lat = parseInt(req.params.lat);
  let lon = parseInt(req.params.lon);

  if (isNaN(lat) || isNaN(lon)) {
    res.status(400);
    res.json({ error: "Bad Request." });
    return;
  }

  // Add to a private files
  let apiKey = "4fda716a357f34ff51ad31191ff68603";

  let url =
    "https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;

  console.log(url);

  https.get(url, (response) => {
    let airPollutionData = "";
    response.on("data", (data) => {
      airPollutionData += data;
    });
    response.on("end", () => {
      const finalAirPollutionData = JSON.parse(airPollutionData);
      res.json(finalAirPollutionData);
    });
  });
}

function getInnovativeFeature(req, res) {
  let city = req.params.city;

  let url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";

  console.log(url);

  https.get(url, (response) => {
    let innovativeData = "";
    response.on("data", (data) => {
      innovativeData += data;
    });
    response.on("end", () => {
      const finalInnovativeData = JSON.parse(innovativeData);
      console.log(innovativeData);
      res.json(innovativeData);
    });
  });
}
