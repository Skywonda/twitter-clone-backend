const { tweetModel, subTweetModel } = require("../models/tweet")

async function createTweet(req, res) {
    const { content, image_url } = req.body
    const owner = req.user.id
    const tweet = await tweetModel.create({ content, image_url, owner })
    res.status(201).send({
        msg: "Tweet created successfully!",
        tweet
    })
}

async function getAllTweet(req, res) {
    const tweets = await tweetModel.find({}).limit(5)
    if (tweets.length == 0) {
        return res.status(404).json({
            msg: "no record found!"
        })
    }
    res.status(200).json({
        msg: "Tweets found!",
        tweets
    })
}

async function getSingleTweet(req, res) {
    const tweet = await tweetModel.findById(req.params.id)
    if (!tweet) {
        return res.status(404).json({
            msg: "Tweet with this id not found!"
        })
    }
    res.status(200).json({
        msg: "Tweet found!",
        tweet
    })
}

async function updateTweet(req, res) {
    const { content } = req.body
    const tweetToUpdate = await tweetModel.findByIdAndUpdate(req.params.id, { content }, { new: true })
    if (!tweetToUpdate) {
        return res.status(404).json({
            msg: "Tweet with this is not found!"
        })
    }
    res.json({
        msg: "Tweet update successfully!",
        tweetToUpdate
    })
}

async function deleteTweet(req, res) {
    const tweet = await tweetModel.findByIdAndDelete(req.params.id)
    if (!tweet) {
        return res.status(404).json({
            msg: "Tweet with this is not found!",
        })
    }
    res.json({
        msg: "Tweet deleted succesfully!"
    })
}

module.exports = {
    createTweet,
    getAllTweet,
    getSingleTweet,
    updateTweet,
    deleteTweet
}

