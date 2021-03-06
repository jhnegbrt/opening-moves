const express = require('express')
const app = express()
//do i need these unused imports?
const path = require('path')
const fetch = require('node-fetch');
const { response } = require('express');
const PORT = process.env.PORT || 8000;
const requestCSV = require('request')
const csv = require('csvtojson')

app.use(express.static('public'))

app.get('/alphaVantage', (request, response) =>{
  
  let {symbol, interval, slice } = request.query
  
  csv()
  .fromStream(requestCSV.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${symbol}&interval=${interval}&slice=${slice}&apikey=53VI4OM5S9T1PSSI`))
  .then((results)=>{
    response.send(results)
  })
})

app.get('/search', (request, response) => {
  fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${request.query.symbol}&resolution=${request.query.resolution}&from=${request.query.from}&to=${request.query.to}&token=${request.query.token}`)
  .then(response => response.text())
  .then((body) => {
      let results = JSON.parse(body)
      response.send(results)
    })
  .catch((err)=>{
  });
});

app.get('/news', (request, response) =>{
  fetch(`https://finnhub.io/api/v1/company-news?symbol=${request.query.symbol}&from=${request.query.from}&to=${request.query.to}&token=${request.query.token}`)
  .then((response) =>{
    return response.text()
  })
  .then((body)=>{
    let results = JSON.parse(body)
    response.send(results)
  })
  .catch(err=>{
    
  })
})

app.get('/symbols', (req, res)=>{
  fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c23h2raad3ieeb1lcqf0')
  .then(response => response.text())
  .then((body)=>{
    let results = JSON.parse(body)
    res.send(results)
  })
})

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`)
})

