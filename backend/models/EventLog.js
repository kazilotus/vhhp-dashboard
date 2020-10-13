const mongoose = require('mongoose')

const eventLogSchema = new mongoose.Schema({
  name: String,
  event: String,
  data: String,
  time: { type : Date, default: Date.now }
})

const EventLog = mongoose.model('EventLog', eventLogSchema)

module.exports = EventLog
