const path = require('path')
const http = require('http')

const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public/')
const app = express()
const server = http.createServer(app)
app.use(express.static(publicPath))

var io = socketIO(server)
io.on('connection', socket => {

    console.log("User connected")

    socket.emit('createMessage', {
        from: "Admin",
        text: "Hello user",
        createAt: new Date()

    })

    socket.on('toServer', (msg) => {
        console.log(msg)
    })

    socket.on('disconnect', () => {
        console.log("User disconnected")
    })
})

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
