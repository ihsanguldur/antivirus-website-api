const express = require("express");
const {getMember, createMember} = require("../controllers/memberController");

const router = express.Router();

router.get("/:user", getMember);
router.post("/new", createMember);

module.exports = router;