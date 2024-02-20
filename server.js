const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const port = process.env.port || 8080;

const app = express();

app.use(bodyParser.json(), cors());
app.get('/', (req, res) => {
  res.send('Welcome to Emi APIs');
});

app.get('/send', (req, res) => {
  res.send('email sent');
});

app.listen(port, () => {
  console.log('started server');
  console.log(port);
});
