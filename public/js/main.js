const socket = io()
socket.on("connect", () => {
    console.log("Connected")
    socket.emit("joinRoom", {
        params: $.deparam(window.location.search)
    })
})

function renderTemplate(msg) {
    let template = $('#message-template').html()
    let html = Mustache.render(template, {
        from: msg.from,
        createAt: moment(msg.createAt).format('hh:mm a'),
        text: msg.text
    })

    return html
}

socket.on('welcome', (msg) => {

    $('#messages').append(renderTemplate(msg))
})

socket.on('intro', (msg) => {
    $('#messages').append(renderTemplate(msg))
})

$('#message-form').on('submit', (e) => {
    e.preventDefault()

    socket.emit('createMessage', {
        from: $.deparam(window.location.search).name,
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
                from: $.deparam(window.location.search).name,
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        })
    }
})

socket.on('newMessage', msg => {
    $('#messages').append(renderTemplate(msg))
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

socket.on('usersInRoom', msg => {
    console.log(msg)

    let ol = $('<ol></ol>')
    msg.text.forEach(user => {
        let li = $('<li></li>')
        li.text(`${user.name}`)
        ol.append(li)
    })

    $('#users').html(ol)
})
