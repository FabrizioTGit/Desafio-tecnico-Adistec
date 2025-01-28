const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';