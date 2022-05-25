const express = require("express");
const {createClassicSupportRequest, updateClassicSupportRequest} = require("../controllers/supportController");

const router = express.Router();

router.post("/", createClassicSupportRequest);
router.put("/", updateClassicSupportRequest);


module.exports = router;