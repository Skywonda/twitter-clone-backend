const { body, validationResult } = require("express-validator")

function validateUser() {
    return [
        body("firstname").notEmpty().withMessage("username must not be empty!"),
        body("lastname").notEmpty().withMessage("lastname must not be empty"),
        body("username").notEmpty().withMessage("username must not be empty"),
        body("email").notEmpty().isEmail().withMessage("invalid email!"),
        body("password").isLength({ min: 6 }).withMessage("Password is not valid!")
    ]
}

function validate(req, res, next) {
    const error = validationResult(req)
    if (error.isEmpty()) {
        return next()
    }
    const displayError = []
    error.array().map((err) => displayError.push({ [err.param]: err.msg }))

    return res.status(422).json({
        error: displayError
    })
}

module.exports = {
    validateUser, validate
}