const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
const app = express()
const dotenv = require('dotenv').config()
if (dotenv.error) {
    throw dotenv.error
}
const geoNamesUserName = process.env.GEONAMES_USER_NAME
const pixabayApiKey = process.env.PIXABAY_API_KEY
const weatherBitApiKey = process.env.WEATHERBIT_API_KEY

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('dist'))
const port = 8081
const listening = () => {
    console.log(`Server running on localhost: ${port}`)
}
app.listen(port, listening())


const getImageData = async (query) => {
    try {
        const encodedQuery = encodeURI(query)
        const reqURL = `https://pixabay.com/api?q=${encodedQuery}&category=places&image_type=photo&per_page=3&key=${pixabayApiKey}`
        const req = await fetch(reqURL)
        const res = await req.json()
        return res
    } catch(err) {
        console.error(err)
    }
}

const getPlaceNameData = async (destination) => {
    try {
        const encodedDestination = encodeURI(destination)
        const reqURL = `http://api.geonames.org/postalCodeSearchJSON?placename=${encodedDestination}&maxRows=1&username=${geoNamesUserName}`
        const req = await fetch(reqURL)
        const res = await req.json()
        return res
    } catch(err) {
        console.error(err)
    }
}

const getWeatherData = async (latitude, longitude) => {
    try {
        const reqURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&units=I&days=16&key=${weatherBitApiKey}`
        const req = await fetch(reqURL)
        const res = await req.json()
        return res
    } catch(err) {
        console.error(err)
    }
}

const processWeatherData = (weatherData) => {
    let weather = []
    try {
        for (let i = 0; i < weatherData.data.length; i++) {
            const dailyWeather = {
                'description': weatherData.data[i].weather.description,
                'iconSource': `https://www.weatherbit.io/static/img/icons/${weatherData.data[i].weather.icon}.png`,
                'minTemp': weatherData.data[i].min_temp,
                'maxTemp': weatherData.data[i].max_temp,
                'dateTime': weatherData.data[i].datetime
            }
            weather.push(dailyWeather)
        }
        return weather
    } catch(err) {
        console.error(err)
    }
}

app.get('/', function (req, res) {
    res.sendFile('/dist/index.html', )
})

app.post('/trip', async function (req, res) {
    let tripData = req.body
    console.log({'request': '/trip', 'body': tripData})
    try {
        const imageData =  getImageData(tripData.destination)
        const placeNameData = await getPlaceNameData(tripData.destination)
        try {
            if (placeNameData.postalCodes.length > 0) {
                const weatherData = getWeatherData(placeNameData.postalCodes[0].lat, placeNameData.postalCodes[0].lng)
                Promise.all([weatherData, imageData])
                .then(([weatherData, imageData])=>{
                    try {
                        if (imageData.totalHits > 0) {
                            tripData.imageSource = imageData.hits[0].webformatURL
                        } else {
                            tripData.imageSource = 'images/default.jpeg'
                        }
                        tripData.weather = processWeatherData(weatherData)
                        console.log(tripData)
                        res.send(tripData)
                    } catch(err) {
                        console.error({'response': 500, 'body': err})
                        res.status(500).send('Internal Server Error')
                    }
                })
                .catch((err) => {
                    console.error({'response': 500, 'body': err})
                    res.status(500).send('Internal Server Error')
                })
            } else {
                console.error({'response': 404, 'body': `${tripData.destination} Not Found`})
                res.status(404).send('Destination Not Found')
            }
        } catch(err) {
            console.error({'response': 500, 'body': err})
            res.status(500).send('Internal Server Error')
        }
    } catch(err) {
        console.error({'response': 500, 'body': err})
        res.status(500).send('Internal Server Error')
    }
})

module.exports = app
