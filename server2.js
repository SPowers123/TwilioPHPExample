const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const client = twilio('AC485d1de41a8fb1aafd19b737c8e80040', '7903784f8011064ca649737b394b7c8c');

// Parse incoming JSON requests
app.use(bodyParser.json());

// Endpoint for sending a text message
app.post('/send-text', async (req, res) => {
  const { body, to } = req.body;

  try {
    const message = await client.messages.create({
      to,
      from: '<+12013904158>',
      body,
    });

    res.json({ success: true, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error sending message' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
