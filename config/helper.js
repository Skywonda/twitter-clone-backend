const { verify } = require("argon2")
const jwt = require("jsonwebtoken")
const config = require("../config/config")
const userModel = require("../src/models/user")

function generateToken(payload) {
    return jwt.sign(payload, config.secret, { expiresIn: 3600 })
}


async function validateCredential(identity, password) {
    let user = await userModel.findOne({ username: identity }).select('+password')
    console.log(identity)
    if (!user) {
        user = await userModel.findOne({ email: identity }).select('+password')
    }
    if (!user) {
        return false
    }
    const validatePassword = await verify(user.password, password)
    if (!validatePassword) {
        return false
    }
    return user

}

module.exports = {
    generateToken,
    validateCredential
}