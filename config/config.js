require("dotenv").config()

module.exports = {
    'db_url': process.env.DB_URL,
    'secret': process.env.SECRET
}