const passport = require("passport")
// const ExtractJwt = require("passport-jwt").ExtractJwt
const JwtStrategy = require("passport-jwt").Strategy

const userModel = require("../models/user")
const config = require("../../config/config")

const cookieExtractor = function (req) {
    var token = null
    if (req && req.cookies) {
        token = req.cookies['jwt_token']
        return token
    }
}
const opts = {}

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = config.secret

exports.jwtStrategy = passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await userModel.findById(jwt_payload.id)
    if (!user) {
        return done(null, false)
    }
    return done(null, user)

}))

exports.verifyUser = passport.authenticate('jwt', { session: false })