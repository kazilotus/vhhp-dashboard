const ConferenceRoom = require('../models/ConferenceRoom')

exports.setRoomStatus = async (req, res) => {
  try {

    const { roomName, currentStatus } = req.body

    // Checking if the room is previously exists
    const room = await ConferenceRoom.findOne({ roomName })

    // If NO room found then create a new room and add status for it
    let roomStatus
    if (!room) {
      roomStatus = await ConferenceRoom.create(req.body)
    } else {
      // if room found then update the given status to the room
      roomStatus = await ConferenceRoom.findOneAndUpdate(
        { roomName },
        { currentStatus }
      )
    }
    res.status(201).json({
      status: 'success',
      data: {
        roomStatus,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }
}
