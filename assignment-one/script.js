// https://learnsyntax.com/creating-a-weather-app-in-node-js-express-js-using-openweather-api
// Using 3-hour Forecast 5 days because it's in free tier: https://openweathermap.org/price
// https://openweathermap.org/forecast5

"use strict";

const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({
	extended: true
  }))

const path = require("path")
let publicPath= path.resolve(__dirname,"public") 
app.use(express.static(publicPath))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// app.get('/random/:min/:max', sendRandom)

// function sendRandom(req, res) {
// 	let min = parseInt(req.params.min);
// 	let max = parseInt(req.params.max);
// 	if (isNaN(min) || isNaN(max)) {
// 		res.status(400);
// 		res.json( {error : "Bad Request."});
// 		return;
// 	}
// 	let result = Math.round( (Math.random() * (max - min)) + min); 
// 	// Return result is a JSON object
// 	res.json( { result : result });
// }


app.get('/weather/:lat/:lon', sendWeatherData)
//app.get("api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey, sendWeatherData)

function sendWeatherData(req, res) {
	let lat = parseFloat(req.params.lat);
	let lon = parseFloat(req.params.lon);
	console.log(lat, lon)
	let apiKey = "4fda716a357f34ff51ad31191ff68603"

	// if (isNaN(lat) || isNaN(lon)) {
	// 	res.status(400);
	// 	res.json( {error : "Bad Request."});
	// 	return;
	// }

	const url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
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
	  })
	})

	// fetch(url)
	// 	.then(function(response) { return response.json(); })
	// 	.then(function(data) { 
	// 		console.log (data); 
	// 		res.json(data);
	// 	})
	// https.get(url, (response) =>  {
	// 	let weatherData = "";
	// 	response.on("data", (data) => {
	// 		weatherData += data;
	// 	})
	// 	res.json( { result: weatherData });
	// })
}