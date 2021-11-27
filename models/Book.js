const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ISBN: {
    type: Number,
    required: true,
  },
  locationID: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "locationType",
  },
  locationType: {
    type: String,
    required: true,
    enum: ["Library", "User"],
  },
});

const Book = model("Book", bookSchema);

module.exports = Book;
