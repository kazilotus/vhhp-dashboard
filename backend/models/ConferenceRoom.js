const mongoose = require('mongoose')

const conferenceRoomSchema = new mongoose.Schema({
  name: String,
  event: String,
  data: String,
})

const ConferenceRoom = mongoose.model('ConferenceRoom', conferenceRoomSchema)

module.exports = ConferenceRoom
