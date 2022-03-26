const express = require("express");
const {createUser, login, sendResetEmail, resetPassword} = require("../controllers/userController.js");

const router = express.Router();

router.post("/new", createUser);
router.post("/login", login);
router.post("/password/forgot",sendResetEmail);
router.put("/password/reset",resetPassword);

module.exports = router;