"use strict";

// Load API keys from .env into process.env
require("dotenv").config();

const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

const path = require("path");
let publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.listen(port, () => console.log(`Listening on port ${port}!`));

// Open Weather API 5 day / 3 hour forecast data
app.get("/weather/:city", sendWeatherData);

// Open Weather API 5 day air pollution forecast data
app.get("/airpollution/:lat/:lon", sendAirPollutionData);

// Google Maps Geocoding API (https://developers.google.com/maps/documentation/geocoding)
app.get("/location/:location", sendLocationData);

// Teleport API Urban Area Scores (https://developers.teleport.org/api/reference/#!/urban_areas/getUrbanAreaScores)
app.get("/cityscores/:city", sendCityScoresData);

function sendWeatherData(req, res) {
  let city = req.params.city;
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;

  https.get(url, (response) => {
    let weatherData = "";
    response.on("data", (data) => {
      weatherData += data;
    });
    response.on("end", () => {
      const finalWeatherData = JSON.parse(weatherData);
      res.json(finalWeatherData);
    });
  });
}

function sendAirPollutionData(req, res) {
  let lat = parseInt(req.params.lat);
  let lon = parseInt(req.params.lon);
  let url = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

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

function sendLocationData(req, res) {
  let location = req.params.location;

  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  https.get(url, (response) => {
    let locationData = "";
    response.on("data", (data) => {
      locationData += data;
    });
    response.on("end", () => {
      const finalLocationData = JSON.parse(locationData);
      console.log(finalLocationData);
      res.json(finalLocationData);
    });
  });
}

function sendCityScoresData(req, res) {
  let city = req.params.city;
  let url = `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`;

  https.get(url, (response) => {
    let cityScoresData = "";
    response.on("data", (data) => {
      cityScoresData += data;
    });
    response.on("end", () => {
      const finalCityScoresData = JSON.parse(cityScoresData);
      res.json(finalCityScoresData);
    });
  });
}
