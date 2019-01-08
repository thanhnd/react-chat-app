class Users {
    constructor() {
        this.listOfUsers = []
    }

    addUser(id, name, room) {
        const user = {id, name, room}
        this.listOfUsers.push(user)
    }

    findUserById(id) {
        return this.listOfUsers.filter(user => user.id === id)[0]
    }

    removeUserById(id) {
        const user = this.findUserById(id)
        this.listOfUsers = this.listOfUsers.filter(user => user.id !== id)

        return user
    }

    findUsersByRoom(room) {
        return this.listOfUsers.filter(user => user.room === room)
    }


}

module.exports = Users