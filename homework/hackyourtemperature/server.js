const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!')
});

app.post('/weather', (req, res)=>{
    let cityName = req.body.cityName;
    console.log(cityName);
    res.send(cityName);
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})