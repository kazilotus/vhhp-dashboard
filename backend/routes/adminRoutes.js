const express = require('express')
const adminControllers = require('../controllers/adminControllers')

const router = express.Router()

// => /api/v1/admin

router.route('/conferenceRoom').post(adminControllers.setRoomsStatus)
router.route('/conferenceRoom').get(adminControllers.getAllRooms)
router.route('/conferenceRoom/:name').get(adminControllers.getARoomStatus)

router.route('/eventLog').get(adminControllers.getAllLogs)

module.exports = router
