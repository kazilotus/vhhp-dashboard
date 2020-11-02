const express = require('express')
const adminControllers = require('../controllers/adminControllers')

const router = express.Router()

// => /api/v1/admin

router.route('/admin/conferenceRoom').post(adminControllers.setRoomsStatus)
router.route('/admin/conferenceRoom').get(adminControllers.getAllRooms)
router.route('/admin/conferenceRoom/:name').get(adminControllers.getARoomStatus)
router.route('/admin/eventLog').get(adminControllers.getAllLogs)

router.route('/chat/token').post(adminControllers.getChatToken)
router.route('/pusher/token/:id/:context').post(adminControllers.getPusherToken)
router.route('/pusher/token/:id/:context/:prefixx').post(adminControllers.getPusherToken)
router.route('/pusher/token/:id/:context/:prefixx/:name').post(adminControllers.getPusherToken)

module.exports = router
