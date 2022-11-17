const mongoose = require("mongoose")
const argon2 = require("argon2")

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    userType: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    var user = this
    if (!user.isModified("password")) return next()
    const hash = await argon2.hash(this.password)
    this.password = hash
    next()
})

const User = mongoose.model("User", userSchema)
module.exports = User