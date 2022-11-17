const { createTweet, getAllTweet, getSingleTweet, updateTweet, deleteTweet } = require("./tweetController")

const authenticate = require("../middleware/authenticate")
const express = require("express")
const { mongoIdValidation } = require("../middleware/validateReqParam")
const router = express.Router()

router
    .route("/")
    .post(authenticate.verifyUser, createTweet)
    .get(getAllTweet)

router
    .route("/:id", mongoIdValidation)
    .get(getSingleTweet)
    .put(updateTweet)
    .delete(deleteTweet)


module.exports = router;