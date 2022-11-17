const { validateCredential, generateToken } = require("../../config/helper")
const userModel = require("../models/user")

async function createUser(req, res) {
    const { firstname, lastname, username, email, password } = req.body

    let userExist = await userModel.findOne({ email })
    if (!userExist) {
        userExist = await userModel.findOne({ username })
    }
    if (userExist) {
        return res.status(409).send({
            msg: "This user already exist!"
        })
    }
    const user = await userModel.create({ firstname, lastname, username, email, password })
    user.password = ""
    res.status(201).json({
        msg: "User created successfully!",
        user
    })
}

async function loginUser(req, res) {
    const { identity, password } = req.body;
    const user = await validateCredential(identity, password)
    if (!user) {
        return res.status(401).send("Invalid Credential!")
    }
    const token = generateToken({ id: user.id })
    res.cookie("jwt_token", token, {
        httpOnly: true,
    }).status(200).json({
        msg: "Login successful! 😊 👌"
    })

}

async function logoutUser(req, res) {
    res.clearCookie('jwt_token').status(200).json({
        msg: "logout successfull!"
    })
}

async function getAllUser(req, res) {
    const users = await userModel.find({}).skip(0).limit(10)
    if (!users) {
        return res.sen("No user record exist!")
    }
    res.status(200).json({
        msg: "User found!",
        users
    })
}

async function getOneUser(req, res) {
    const user = await userModel.findById(req.params.id)
    if (!user) {
        return res.status(404).send("User with this id does not exist!")
    }
    res.json({
        msg: "User found",
        user
    })
}

async function updateUserById(req, res) {
    const { firstname, lastname, username } = req.body
    const user = await userModel.findByIdAndUpdate(req.params.id, { firstname, lastname, username }, { new: true })
    if (!user) {
        return res.status(404).send("User to update not found!")
    }
    res.status(200).json({
        msg: "User updated successfully!",
        user
    })
}

async function updatePassword(req, res) {
    const { password } = req.body
    const user = await userModel.findById(req.params.id)
    if (!user) {
        return res.status(404).send("User to update not found!")
    }
    user.password = password
    await user.save()
    res.status(200).json({
        msg: "password updated successfully!",
        user
    })
}

async function deleteUser(req, res) {
    const user = await userModel.findByIdAndDelete(req.params.id)
    if (!user) {
        return res.status(404).send("User to delete not found!")
    }
    res.status(200).send("User deleted successfull!")
}




module.exports = {
    createUser,
    getAllUser,
    getOneUser,
    updateUserById,
    deleteUser,
    updatePassword,
    loginUser,
    logoutUser
}