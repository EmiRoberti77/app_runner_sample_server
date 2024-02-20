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

app.post('/post', (req, res) => {
  if (!req.body) {
    res.send({
      status: 404,
      message: 'missing body',
    });
  }
  res.send({
    status: 200,
    message: req.body,
  });
});

app.listen(port, () => {
  console.log('started server');
  console.log(port);
});
