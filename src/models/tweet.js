const mongoose = require("mongoose")
const extend = require("mongoose-extend-schema")

const Schema = mongoose.Schema

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    image_url: {
        type: String
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
})

const sub_tweet = extend(tweetSchema, {
    root_tweet: {
        type: mongoose.Types.ObjectId,
        ref: "Tweet"
    }
})

const tweetModel = mongoose.model("Tweet", tweetSchema)
const subTweetModel = mongoose.model("SubTweet", sub_tweet)

module.exports = { tweetModel, subTweetModel }