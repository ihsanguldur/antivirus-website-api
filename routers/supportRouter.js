const express = require("express");
const {createClassicSupportRequest, updateClassicSupportRequest, getPendingSupportRequests} = require("../controllers/supportController");

const router = express.Router();

router.post("/", createClassicSupportRequest);
router.put("/", updateClassicSupportRequest);
router.get("/",getPendingSupportRequests);

module.exports = router;