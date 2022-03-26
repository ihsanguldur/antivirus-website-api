const express = require("express");
const {createMembership, getAllMembership} = require("../controllers/membershipController");

const router = express.Router();

router.post("/new", createMembership);
router.get("/", getAllMembership);

module.exports = router;