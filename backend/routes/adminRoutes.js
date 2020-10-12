const express = require('express')
const adminControllers = require('../controllers/adminControllers')

const router = express.Router()

// => /api/v1/admin

router.route('/conferenceRoom').post(adminControllers.setRoomStatus)

module.exports = router
