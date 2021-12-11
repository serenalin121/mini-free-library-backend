const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

router.post("/signup", ctrls.admins.signup);
router.post("/signin", ctrls.admins.signin);
router.delete("/signout", ctrls.admins.signout);
router.post("/renew", ctrls.admins.renew);

module.exports = router;
