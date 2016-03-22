var mongoose = require('mongoose');

var Ticket = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  description: String,
  createdAt: Date
});

var ticket = mongoose.model('supportticket', Ticket);
module.exports = ticket;