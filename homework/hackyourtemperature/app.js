import express from 'express';
import {keys} from './sources/keys.js';
import fetch from 'node-fetch';

const app = express()

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!')
});




app.post('/weather', async (req, res)=>{
    let cityName = req.body.cityName;
    // console.log(cityName);
    
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}`);
    const data = await response.json();
    const city = data.name;
    const temp = Math.floor(data.main.temp-273.15);
    res.json({weatherText: `${city} is ${temp} Celcius Degree` })


    }catch(err){
      res.status(400).json({ weatherText: "City is not found!" });
    }

});

export default app;