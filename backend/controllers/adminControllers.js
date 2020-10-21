const Twilio = require('twilio')
const chance = new require('chance')()

const ConferenceRoom = require('../models/ConferenceRoom')
const EventLog = require('../models/EventLog')

const AccessToken = Twilio.jwt.AccessToken
const ChatGrant = AccessToken.ChatGrant

exports.setRoomsStatus = async (req, res) => {
  try {

    req.body.map(async r => {

      // Checking if the room is previously exists
      const room = await ConferenceRoom.findOne({ name: r.name })
  
      // If NO room found then create a new room and add status for it
      let status

      if (!room) {
        status = await ConferenceRoom.create(r)
      } else {
        // if room found then update the given status to the room
        status = await ConferenceRoom.findOneAndUpdate({ name: r.name }, r)
      }

      await EventLog.create(r)

      // console.log(status)
      // return status

      res.status(201).json({
        status: 'success',
        data: {
          status,
        },
      })
      
    })

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    })
  }
}

// Get all info of a ROOM by its name
exports.getARoomStatus = async (req, res) => {
  try {
    const room = await ConferenceRoom.findOne({ roomName: req.params.name })

    if (!room) {
      res.status(204).json({
        status: 'failed',
        message: 'No room found',
      })
    } else {
      res.status(201).json({
        status: 'success',
        data: {
          room,
        },
      })
    }
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    })
  }
}

// Get all info of all ROOMS
exports.getAllRooms = async (req, res) => {
  try {
    const room = await ConferenceRoom.find({})

    if (!room) {
      res.status(204).json({
        status: 'failed',
        message: 'No room found',
      })
    } else {
      res.status(201).json({
        status: 'success',
        data: {
          room,
        },
      })
    }
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    })
  }
}

// Get all info of all ROOMS
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await EventLog.find({})

    if (!logs) {
      res.status(204).json({
        status: 'failed',
        message: 'No room found',
      })
    } else {
      res.status(201).json({
        status: 'success',
        data: {
          ...logs
        },
      })
    }
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    })
  }
}

// Get all info of all ROOMS
exports.getChatToken = async (req, res) => {
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
  )

  token.identity = chance.name()
  token.addGrant(new ChatGrant({
    serviceSid: process.env.TWILIO_CHAT_SERVICE_SID
  }))

  res.send({
    identity: token.identity,
    jwt: token.toJwt()
  })
}