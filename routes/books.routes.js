const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

router.get("/:libId", ctrls.books.index);
// router.post("/:libId", ctrls.books.create);
router.put("/:id", ctrls.books.update);
router.delete("/:id", ctrls.books.destroy);

router.post("/:libId", ctrls.books.addNewBook);
// for user
router.put("/checkout/:id", ctrls.books.checkout);
router.put("/return/:bookId/:libId", ctrls.books.returnBook);

module.exports = router;
