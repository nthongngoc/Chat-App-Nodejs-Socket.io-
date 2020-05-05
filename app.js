const express = require('express')
const path = require('path')
const app = express()

const APP_PORT = 5555

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

const server = app.listen(APP_PORT, () => {
  console.log('App running on port: ', APP_PORT)
})

const io = require('socket.io').listen(server)

// server listen event name 'socket'( or other name) from client and log string: 'a user connected'
io.on('connection', function(socket) {
  socket.on('ngoc', function(message) {
    console.log('message ' + message)
    io.emit('ngoc', message)
  })
})

