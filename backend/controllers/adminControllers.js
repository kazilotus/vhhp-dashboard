const Twilio = require('twilio')
const chance = new require('chance')()

const ConferenceRoom = require('../models/ConferenceRoom')
const EventLog = require('../models/EventLog')

const AccessToken = Twilio.jwt.AccessToken
const ChatGrant = AccessToken.ChatGrant

const Pusher = require('pusher');
const axios = require('axios');

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
  
  const vhhpUser = req.body
  
  console.log(vhhpUser)

  token.identity = vhhpUser.email || chance.name()
  
  token.addGrant(new ChatGrant({
    serviceSid: process.env.TWILIO_CHAT_SERVICE_SID
  }))

  res.send({
    identity: token.identity,
    jwt: token.toJwt()
  })
}

exports.getPusherToken = async (req, res) => {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,  
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
  });
  
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;

  const user_id = req.params.id;
  const user_context = req.params.context;
  const context_prefix = req.params.prefixx || null;
  const name = req.params.name || '';
  
  let presenceData = {}
  
  // if (context_prefix == "v3weasffrwderwer_") {
    
    presenceData = {
      user_id: user_id,
      user_info: {
        id: user_id,
        name: decodeURI(name),
        context: user_context
      }
    };
  
  // } else {
    
  //   let url = 'https://b.virtualhabitathouseparty.org/api/users/' + user_id
  
  //   if (context_prefix == 'prodsldkghd_' || context_prefix == null) {
  //     url = 'https://www.virtualhabitathouseparty.org/api/users/' + user_id
  //   }
    
  //   const response = await axios.get(url)
    
  //   const user = response && response.data || null;
    
  //   console.log(user)
    
  //   presenceData = { 
  //     user_id: user_id,
  //     user_info: {
  //       ...user,
  //       context: user_context
  //     }
  //   };
    
  // }

  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
}