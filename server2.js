const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const client = twilio('AC6c34169ebe5707f71a1d0bc38c665eda', '08ebdb356c1c1522fc368bde677e7730');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
  const { message, to } = req.body;

  try {
    const twilioResponse = await client.messages.create({
      to,
      from: '+18333851193',
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



