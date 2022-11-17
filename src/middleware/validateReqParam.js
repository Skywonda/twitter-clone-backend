const mongoose = require("mongoose")
const objectId = mongoose.isValidObjectId

async function mongoIdValidation(req, res, next) {
    console.log(req.params)
    if (objectId(req.params.id)) {
        return next()
    }
    res.status(400).json({
        msg: "Invalid param value",
    })
}

module.exports = {
    mongoIdValidation
}