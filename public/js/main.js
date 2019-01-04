const socket = io()
socket.on("connect", () => {
    console.log("Connected")
})

socket.on('welcome', (msg) => {
    let li = $('<li></li>')
    li.text(`${msg.from}: ${msg.text}`)
    $('#messages').append(li)
})

socket.on('intro', (msg) => {
    let li = $('<li></li>')
    li.text(`${msg.from}: ${msg.text}`)
    $('#messages').append(li)
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

socket.on('newMessage', msg => {
    let li = $('<li></li>')
    li.text(`${msg.from}: ${msg.text}`)
    $('#messages').append(li)
})
