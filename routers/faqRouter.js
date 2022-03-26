const express = require("express");
const {getFaqs} = require("../controllers/faqController.js")

const router = express.Router();

router.get("/", getFaqs);

module.exports = router;
