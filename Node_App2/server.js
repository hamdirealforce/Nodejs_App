'use strict';

const express = require('express');

// Constants
const PORT = 8082;
const HOST = '0.0.0.0';
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const subscriptionNameOrId = 'my-sub';
const timeout = 60;

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();
function listenForMessages() {
  // References an existing subscription
  const subscription = pubSubClient.subscription(subscriptionNameOrId);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);

  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

listenForMessages();
// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World I am app2');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
