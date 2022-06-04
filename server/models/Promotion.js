const mongoose = require("mongoose");
const { Schema } = mongoose;

const promotionSchema = new Schema({
  percentage: {
    type: Number,
    required: true,
  },
  ends: {
    type: Date,
    required: true,
  },
  membersOnly: {
    type: Boolean,
    default: false,
  },
});

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
