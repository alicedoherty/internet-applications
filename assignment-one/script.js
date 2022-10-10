// https://learnsyntax.com/creating-a-weather-app-in-node-js-express-js-using-openweather-api

"use strict";

const express = require('express')
const https = require('https')

const app = express()
const port = 4000

app.get('/', (req, res) => {
    res.render('index', {data: ''})
}

app.get('https://api.openweathermap.org/data/2.5/weather?lat=53.12&lon=52.12&appid=4fda716a357f34ff51ad31191ff68603', (req, res) =>
    res.send('temp')
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))