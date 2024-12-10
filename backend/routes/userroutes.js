const express = require('express')
const protectRoute = require('../middleware/protectroute')
const userForSideBar = require('../controller/usercontroller')

const router = express.Router()

router.post('/',protectRoute,userForSideBar)

module.exports = router