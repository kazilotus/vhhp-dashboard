const mongoose = require('mongoose')

const conferenceRoomSchema = new mongoose.Schema({
  roomName: String,
  currentStatus: String,
  link: String,
  textInput: String,
})

const ConferenceRoom = mongoose.model('ConferenceRoom', conferenceRoomSchema)

module.exports = ConferenceRoom
