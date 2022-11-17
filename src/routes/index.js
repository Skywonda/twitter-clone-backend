var express = require('express');
var router = express.Router();
const userRouter = require("../users/users")
const tweetRouter = require("../tweets/tweets")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter)
router.use('/tweets', tweetRouter)

module.exports = router;
