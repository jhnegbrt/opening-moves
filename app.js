const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables

app.use(express.static('public'))

app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/search', (request, response) => {
  fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${request.query.symbol}&resolution=${request.query.resolution}&from=${request.query.from}&to=${request.query.to}&token=${request.query.token}`)
  .then((response) => {
      return response.text();
  }).then((body) => {
      let results = JSON.parse(body)
      console.log(results)
      response.send(results)
    });
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`)
})




// app.get('/search', (request, response) => {
//   fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${request.query.symbol}&interval=${request.query.interval}&slice=year1month${request.query.index}&apikey=53VI4OM5S9T1PSSI&datatype=JSON`)
//   .then((response) => {
//       return response.text();
//   }).then((body) => {
//       let rows = body.split(/(?:\r\n|\r|\n)+/).filter(function(row) {return row.length > 0});
//       response.send(rows.slice(1))
//     });
// });