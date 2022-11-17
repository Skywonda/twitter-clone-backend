const mongoose = require("mongoose")
const config = require("../config/config")

function ConnectToDb() {
    mongoose.connect(config.db_url)

    mongoose.connection.on('connected', () => {
        console.log("Databse connected succesfully!")
    })

    mongoose.connection.on('error', (err) => {
        console.log("An error occured while connecting to the database!")
        console.log(err)
    })
}

module.exports = {
    ConnectToDb
}