const express = require("express");
const userRouter = require("./userRouter.js");
const membershipRouter = require("./membershipRouter.js")
const faqRouter = require("./faqRouter.js");
const memberRouter = require("./memberRouter.js")
const supportRouter = require("./supportRouter.js");

const router = express.Router();

router.use("/user", userRouter);
router.use("/membership", membershipRouter);
router.use("/faq", faqRouter);
router.use("/member", memberRouter);
router.use("/support",supportRouter);

module.exports = router;