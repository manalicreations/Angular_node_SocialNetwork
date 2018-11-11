const express = require('express')
const app = express()

const auth = require('./auth')
const user = require('./user')
const friend = require('./friend')
const notification = require('./notification')
const upload = require('./upload')
const status = require('./status')
const message = require('./message')

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/friend', friend)
app.use('/api/notification', notification)
app.use('/api/upload', upload)
app.use('/api/status', status)
app.use('/api/message', message)

module.exports = app;
