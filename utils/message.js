const generateMessage = (from, text) => {
    return {
        from, text, createAt: new Date()
    }
}

module.exports = {generateMessage}