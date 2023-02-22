const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const client = twilio('AC485d1de41a8fb1aafd19b737c8e80040', '7903784f8011064ca649737b394b7c8c');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
  const { message, to } = req.body;

  try {
    const twilioResponse = await client.messages.create({
      to,
      from: '+2013904158',
      body: message,
    });
    res.json({ success: true, response: twilioResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error sending message' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});



