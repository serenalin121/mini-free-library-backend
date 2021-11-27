const db = require("../models");

const index = (req, res) => {
  db.Library.find({}, (err, libraries) => {
    if (err) return res.status(400).json({ err: err.message });

    return res.status(200).json(libraries);
  });
};

const create = (req, res) => {
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
  create,
  update,
  destroy,
};
