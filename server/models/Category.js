const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  promotion: {
    type: Schema.Types.ObjectId,
    ref: "Promotion",
  },
  // Promotion price - Maybe a virtual?
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
