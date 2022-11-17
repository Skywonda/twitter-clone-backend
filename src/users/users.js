var express = require('express');
const { createUser, getAllUser, getOneUser, updateUserById, deleteUser, updatePassword, loginUser, logoutUser } = require('./userController');
var router = express.Router();
const { mongoIdValidation } = require("../middleware/validateReqParam");
const { validateUser, validate } = require('../middleware/validateUser');
const authenticate = require("../middleware/authenticate")

router
  .route("/")
  .post(validateUser(), validate, createUser)

  .get(getAllUser)

router
  .route("/login")
  .post(loginUser)

router
  .route('/logout')
  .post(logoutUser)

router
  .route("/password/:id")
  .put(mongoIdValidation, updatePassword)

router
  .route("/:id")
  .get(mongoIdValidation, getOneUser)
  .put(mongoIdValidation, updateUserById)
  .delete(mongoIdValidation, deleteUser)

module.exports = router;