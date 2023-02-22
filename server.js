const http = require('http');
const url = require('url');
const qs = require('querystring');
const twilio = require('twilio');

const accountSid = 'AC485d1de41a8fb1aafd19b737c8e80040';
const authToken = '7903784f8011064ca649737b394b7c8c';
const client = twilio(accountSid, authToken);

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;
  const { message, to } = qs.parse(parsedUrl.query);

  if (pathname === '/send-message' && message && to) {
    client.messages
      .create({
        body: message,
        from: '+12013904158',
        to,
      })
      .then(() => {
        res.statusCode = 200;
        res.end('Message sent!');
      })
      .catch((err) => {
        console.error(err);
        res.statusCode = 500;
        res.end('Error sending message');
      });
  } else {
    res.statusCode = 400;
    res.end('Invalid request');
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
