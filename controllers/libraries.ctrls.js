const db = require("../models");
const mongoose = require("mongoose");

const index = (req, res) => {
  db.Library.find({}, (err, libraries) => {
    if (err) return res.status(400).json({ err: err.message });

    return res.status(200).json(libraries);
  });
};

const myLibrary = (req, res) => {
  //TODO: use passport
  const owner = mongoose.Types.ObjectId(req.session.passport?.user?._id);
  console.log("check myLibrary" + owner);
  db.Library.find({ owner }, (err, libraries) => {
    if (err) return res.status(400).json({ err: err.message });
    console.log("check myLibrary" + libraries);
    return res.status(200).json(libraries);
  });
};

const create = (req, res) => {
  //TODO: use passport
  req.body.owner = req.session.passport.user._id;
  db.Library.create(req.body, (err, createdLibrary) => {
    if (err) return res.status(400).json({ err: err.message });

    return res.status(200).json(createdLibrary);
  });
};

const update = (req, res) => {
  db.Library.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (err, updatedLibrary) => {
      if (err) return res.status(400).json({ err: err.message });

      return res.status(200).json(updatedLibrary);
    }
  );
};

const destroy = (req, res) => {
  db.Library.findByIdAndDelete(req.params.id, (err, deletedLibrary) => {
    if (err) return res.status(400).json({ err: err.message });

    return res.status(200).json({
      message: `Library ${deletedLibrary.location} deleted successfully!`,
    });
  });
};

module.exports = {
  index,
  myLibrary,
  create,
  update,
  destroy,
};
