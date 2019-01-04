const socket = io()
socket.on("connect", () => {
    console.log("Connected")
})

socket.on('welcome', (msg) => {
    console.log(msg)
})

socket.on('intro', (msg) => {
    console.log(msg)
})

socket.on('newMessage', msg => {
    console.log(msg)
})

socket.on("disconnect", () => {
    console.log("Disconneted")
})


$('#message-form').on('submit', (e) => {
    e.preventDefault()

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val(),
        createAt: new Date()
    })

    $('[name=message]').val("")
})