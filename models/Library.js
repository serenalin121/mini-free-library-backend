const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const librarySchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

const Library = model("Library", librarySchema);

module.exports = Library;
