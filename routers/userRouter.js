const express = require("express");
const {createUser, login, sendResetEmail, resetPassword} = require("../controllers/userController.js");
const {updateUser} = require("../controllers/userController");

const router = express.Router();

router.post("/new", createUser);
router.post("/login", login);
router.post("/password/forgot",sendResetEmail);
router.put("/password/reset",resetPassword);
router.put("/update/:id",updateUser);

module.exports = router;