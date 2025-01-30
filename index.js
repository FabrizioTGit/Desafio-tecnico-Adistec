const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

//Clase Forecast con su constructor
class Forecast {
    constructor(date, temperature, description, humidity) {
        this.date = date;
        this.temperature = temperature;
        this.description = description;
        this.humidity = humidity;
    }
}

app.use(express.static('public'));

app.get('/api/forecast', async (req, res) => {
    //Recibe la ciudad del front
    const city = req.query.city;

    try {

        //Get a la API con sus parametros
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'es',
            },
        });

        //Uso del constructor para mapear la informacion de la API
        const forecasts = response.data.list.map(item => new Forecast(
            item.dt_txt,
            item.main.temp,
            item.weather[0].description,
            item.main.humidity,
        ));

        //Envia la respuesta al front en formato json
        res.json({
            city: response.data.city.name,
            country: response.data.city.country,
            forecasts: forecasts,
        });
    //Capturamos el error en caso de que exista
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el pronóstico.' });
    }
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));