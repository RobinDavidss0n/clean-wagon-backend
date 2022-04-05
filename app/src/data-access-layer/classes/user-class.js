module.exports = class User {
    email
    password
    first_name
    last_name

    constructor(email, password, first_name, last_name) {
        this.email = email
        this.password = password
        this.first_name = first_name
        this.last_name = last_name
    }
}