const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

// for user
router.put("/checkout/:id", ctrls.books.checkout);
router.put("/return/:bookId/:libId", ctrls.books.returnBook);
router.get("/myBook", ctrls.books.getCheckoutBooks);

router.get("/:libId", ctrls.books.index);
router.post("/:libId", ctrls.books.create);
router.put("/:id", ctrls.books.update);
router.delete("/:id", ctrls.books.destroy);

module.exports = router;
