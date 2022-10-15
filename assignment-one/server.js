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
