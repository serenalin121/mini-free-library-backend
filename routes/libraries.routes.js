const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

router.get("/", ctrls.libraries.index);
router.get("/myLibrary", ctrls.libraries.myLibrary);
router.post("/", ctrls.libraries.create);
router.put("/:id", ctrls.libraries.update);
router.delete("/:id", ctrls.libraries.destroy);

module.exports = router;
