'use strict';

const express = require('express');


const bodyParser = require('body-parser');
const app = express();
// Constants
const PORT = 8081;
const HOST = '0.0.0.0';
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
 const topicNameOrId = 'my-topic';
 const data = JSON.stringify({foo: 'bar'});

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();
// App

async function publishMessage() {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);

  try {
    const messageId = await pubSubClient
      .topic(topicNameOrId)
      .publishMessage({data: dataBuffer});
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}

publishMessage();
app.get('/', (req, res) => {
  res.send('Hello World I am app1');
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
