const path = require('path')
const http = require('http')

const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('../utils/message')

const publicPath = path.join(__dirname, '../public/')
const app = express()
const server = http.createServer(app)
app.use(express.static(publicPath))

var io = socketIO(server)
io.on('connection', socket => {

    console.log("User connected")
    socket.on("joinRoom", msg => {
        const {name, room} = msg.params
        socket.join(room)
        
        socket.to(room).emit('welcome', 
        generateMessage('Admin', 'Welcome to the chatapp')
    )

        socket.broadcast.to(room).emit('intro',
            generateMessage('Admin', 'New user joined')
        )    
        
        socket.on('createMessage', msg => {
            io.to(room).emit('newMessage', 
                generateMessage(msg.from, msg.text))
        })
    
        socket.on('createLocationMesssage', msg => {
            io.to(room).emit('newLocationMessage',
                generateLocationMessage(msg.from, msg.lat,msg.lng))
        })
    
        socket.on('disconnect', () => {
            console.log("User disconnected")
        })
    })
})

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
