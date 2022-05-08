var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET users listing. */
router.get('/', async function (request, response, next) {
  console.log(request.query.url);
  if (request.query.url) {
    const res = await fetch(`https://data.alexa.com/data?cli=10&dat=s&url=${request.query.url}`);
    const data = await res.text();
    response.type('application/xml');
    response.send(data);
  } else {
    response.status(404).json({ error: 'url not found' });
  }
});

module.exports = router;
