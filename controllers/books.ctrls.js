const db = require("../models");

const index = (req, res) => {
  db.Book.find({ locationID: req.params.libId }, (err, books) => {
    if (err) return res.status(400).json({ err: err.message });

    return res.status(200).json(books);
  });
};

const create = (req, res) => {
  db.Book.create(req.body, (err, createdBook) => {
    if (err) return res.status(400).json({ err: err.message });

    return res.status(200).json(createdBook);
  });
};

const update = (req, res) => {
  db.Book.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (err, updatedBook) => {
      if (err) return res.status(400).json({ err: err.message });

      return res.status(200).json(updatedBook);
    }
  );
};

const destroy = (req, res) => {
  db.Book.findByIdAndDelete(req.params.id, (err, deletedBook) => {
    if (err) return res.status(400).json({ err: err.message });

    return res.status(200).json({
      message: `Book ${deletedBook.name} deleted successfully!`,
    });
  });
};

const checkout = (req, res) => {
  db.Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        locationID: "userID",
        locationType: "User",
      },
    },
    { new: true },
    (err, updatedBook) => {
      if (err) return res.status(400).json({ err: err.message });

      return res.status(200).json(updatedBook);
    }
  );
};

const returnBook = (req, res) => {
  db.Book.findByIdAndUpdate(
    req.params.bookId,
    {
      $set: {
        locationID: req.params.libId,
        locationType: "Library",
      },
    },
    { new: true },
    (err, updatedBook) => {
      if (err) return res.status(400).json({ err: err.message });

      return res.status(200).json(updatedBook);
    }
  );
};

module.exports = {
  index,
  create,
  update,
  destroy,
  checkout,
  returnBook,
};
