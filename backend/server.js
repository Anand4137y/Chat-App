const express = require('express')
const dotenv = require('dotenv')
const authroutes = require('./routes/authroutes')
const messageroutes = require('./routes/messageroutes')
const userroutes = require('./routes/userroutes')
const MongooseConnect = require('./db/connectdb')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const { app, server } = require('./socket/socket')

const port = process.env.PORT || 5000
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieparser())

app.use('/api/auth', authroutes)
app.use('/api/messages', messageroutes)
app.use('/api/users', userroutes)

server.listen(port, () => {
    MongooseConnect()
    console.log("server running " + port)
}
) 