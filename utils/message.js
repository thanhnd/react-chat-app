const generateMessage = (from, text) => {
    return {
        from, text, createAt: new Date()
    }
}

const generateLocationMessage = (from, lat, lng) => {
    return {
        from, 
        url: `http://www.google.com/maps?q=${lat},${lng}`,
        createAt: new Date()
    }
}

module.exports = {generateMessage, generateLocationMessage}