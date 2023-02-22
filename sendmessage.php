<?php
require_once 'path/to/twilio-php/autoload.php';

use Twilio\Rest\Client;

// Your Twilio account SID and auth token
$sid = 'AC485d1de41a8fb1aafd19b737c8e80040';
$token = '7903784f8011064ca649737b394b7c8c';

// The Twilio phone number you want to send the text message from
$fromNumber = '201-390-4158';

// Get the phone number to send the text message to from the request body
$toNumber = $_POST['phoneNumber'];

// Get the message to send from the request body
$message = $_POST['message'];

// Create a new Twilio client
$client = new Client($sid, $token);

// Send the text message
$message = $client->messages->create(
    $toNumber,
    array(
        'from' => $fromNumber,
        'body' => $message
    )
);

// Output the message SID
echo $message->sid;
