//Express Used for the Server Side
//Nodemon used for not restarting Nodejs server again and again

//importing express
const express = require('express')
const app = express()
const http = require('http').createServer(app)

//For Deployment
const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
//Nodejs Does not know url for that we have used 
app.use(express.static(__dirname + '/public'))

//Requesting Indexfile on main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket Server

//For http Server
const io = require('socket.io')(http)

//When Client Gets Connected it will be on
io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})