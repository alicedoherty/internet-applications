// https://learnsyntax.com/creating-a-weather-app-in-node-js-express-js-using-openweather-api

"use strict";

const express = require('express')
const app = express()
const port = 3000

const path = require("path")
let publicPath= path.resolve(__dirname,"public") 
app.use(express.static(publicPath))

app.get('/random/:min/:max', sendRandom)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function sendRandom(req, res) {
	let min = parseInt(req.params.min);
	let max = parseInt(req.params.max);
	if (isNaN(min) || isNaN(max)) {
		res.status(400);
		res.json( {error : "Bad Request."});
		return;
	}
	let result = Math.round( (Math.random() * (max - min)) + min); 
	// Return result is a JSON object
	res.json( { result : result });
}