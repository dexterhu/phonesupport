var express = require('express');
var router = express.Router();
var twilio = require('twilio');

// POST /calls/connect
router.post('/connect', twilio.webhook({ validate: false }), function(req, res, next) {
  console.log(req.body);
  var phoneNumber = req.body.phoneNumber;
  var callerId = process.env.TWILIO_PHONE_NUMBER;
  var twiml = new twilio.TwimlResponse();

  var numberDialer = function(dial) {
    dial.number(phoneNumber);
  };

  var clientDialer = function(dial) {
    dial.client("support_agent");
  };

  if (phoneNumber != null) {
    twiml.dial({ callerId: callerId }, numberDialer);
  } else {
    //twiml.dial({ callerId: callerId }, clientDialer);
    twiml.play('https://s3.amazonaws.com/antsquare-www/ringtone/land_on_mars.mp3');
    twiml.dial(callerId, { record: true, callerId: callerId });
  }

  res.send(twiml.toString());
});

module.exports = router;