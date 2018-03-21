const express = require('express');
const fetch = require('node-fetch');
const querystring = require('querystring');

const baseUrl = 'http://partners.api.skyscanner.net/apiservices';

const app = express();
const port = process.env.PORT || 5000;
const apiKey = process.env.API_KEY || 'prtl6749387986743898559646983194';

app.get('/api/hello/', (req, res) => {
  const data = req.query;
  let url = baseUrl;

  for (const key in data) url += ("/" + data[key]);

  url += "?apikey=" + apiKey;

  let minPrice;

  fetch(url)
    .then(response => {
      response.json().then(json => {
        minPrice = json.Quotes[0].MinPrice;
        res.send({ price: 'Minimum prices is ' + minPrice });
      })
    })
    .catch(error => {
      console.log(error);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
