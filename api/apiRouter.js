const express = require('express')
const app = express()

const auth = require('./auth')
const user = require('./user')
const friend = require('./friend')
const notification = require('./notification')

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/friend', friend)
app.use('/api/notification', notification)

module.exports = app;
