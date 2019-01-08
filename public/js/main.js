const socket = io()
socket.on("connect", () => {
    console.log("Connected")
    socket.emit("joinRoom", {
        params: $.deparam(window.location.search)
    })
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

$('#send-location').on('click', () => {
    if(!navigator.geolocation) {
        alert("Old browser not suppot")
    } else {
        navigator.geolocation.getCurrentPosition(position => {
            socket.emit('createLocationMesssage', {
                from: "user",
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        })
    }
})

socket.on('newMessage', msg => {
    let li = $('<li></li>')
    // li.text(`${msg.from}  ${moment(msg.createAt).format('hh:mm a')}: ${msg.text}`)
    // $('#messages').append(li)

    let template = $('#message-template').html()
    let html = Mustache.render(template, {
        from: msg.from,
        createAt: moment(msg.createAt).format('hh:mm a'),
        text: msg.text
    })

    $('#messages').append(html)
})

socket.on('newLocationMessage', msg => {
    // let li = $('<li></li>')
    // let a = $('<a target="_brank">My Location</a>')
    // a.attr('href', msg.url)
    // li.text(`${msg.from} ${moment(msg.createAt).format('hh:mm a')}: `)
    // li.append(a)
    
    // $('#messages').append(li)

    let template = $('#location-message-template').html()
    let html = Mustache.render(template, {
        from: msg.from,
        createAt: moment(msg.createAt).format('hh:mm a'),
        url: msg.url
    })

    $('#messages').append(html)
})

console.log($.deparam(window.location.search))
