const express = require('express')
const adminControllers = require('../controllers/adminControllers')

const router = express.Router()

// => /api/v1/admin

router.route('/conferenceRoom').post(adminControllers.setRoomStatus)
router.route('/conferenceRoom/:name').get(adminControllers.getARoomStatus)

module.exports = router
