const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');

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

app.post('/post', async (req, res) => {
  if (!req.body) {
    res.send({
      status: 404,
      message: 'missing body',
    });
  }
  const queParams = {
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/432599188850/emi_que',
    MessageBody: JSON.stringify(req.body),
  };
  var response;
  try {
    const queClient = new SQSClient({ region: 'us-east-1' });
    response = await queClient.send(new SendMessageCommand(queParams));
  } catch (err) {
    console.error(err);
    res.send({
      status: 500,
      error: err.message,
      response,
    });
    return;
  }

  res.send({
    status: 200,
    response,
    message: req.body,
  });
});

app.listen(port, () => {
  console.log('started server');
  console.log(port);
});
