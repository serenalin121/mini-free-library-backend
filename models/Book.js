const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  name: {
    type: String,
  },
  ISBN: {
    type: Number,
    required: true,
  },
  locationID: {
    type: Schema.Types.ObjectId,
    refPath: "locationType",
  },
  locationType: {
    type: String,
    enum: ["Library", "User"],
  },
});

const Book = model("Book", bookSchema);

module.exports = Book;
