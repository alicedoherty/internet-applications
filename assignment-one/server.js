"use strict";

// Load API keys from .env into process.env
// Source: https://www.npmjs.com/package/dotenv
require("dotenv").config();

const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

const path = require("path");
let publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.listen(port, () => console.log(`Listening on port ${port}!`));

// Open Weather API 5 day / 3 hour forecast data (https://openweathermap.org/forecast5)
// Note: Although 4 day forecast is available, it is not free. On the client side I just take the next 4 days.
app.get("/weather/:city", (req, res) => {
  let city = req.params.city;
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;

  sendData(res, url);
});

// Open Weather API 5 day air pollution forecast data (https://openweathermap.org/api/air-pollution)
app.get("/airpollution/:lat/:lon", (req, res) => {
  let lat = req.params.lat;
  let lon = req.params.lon;
  let url = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

  sendData(res, url);
});

// Google Maps Geocoding API (https://developers.google.com/maps/documentation/geocoding)
app.get("/location/:location", (req, res) => {
  let location = req.params.location;
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  sendData(res, url);
});

// Teleport API Urban Area Scores (https://developers.teleport.org/api/reference/#!/urban_areas/getUrbanAreaScores)
app.get("/cityscores/:city", (req, res) => {
  let city = req.params.city;
  let url = `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`;

  sendData(res, url);
});

function sendData(res, url) {
  https
    .get(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        const finalData = JSON.parse(data);
        res.json(finalData);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}
