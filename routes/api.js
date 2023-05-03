const express = require('express');
const router = express.Router();

const { getWeather } = require('../controllers/api');

router.get("/weather/:id", getWeather);


module.exports = router;