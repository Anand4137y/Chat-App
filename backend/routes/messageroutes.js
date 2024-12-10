const express = require('express')
const router = express.Router()
const {sendMessage,getMessage} = require('../controller/messagecontroller')
const protectRoute = require('../middleware/protectroute')

router.post('/:id',protectRoute,getMessage)
router.post('/send/:id',protectRoute,sendMessage)

module.exports = router

