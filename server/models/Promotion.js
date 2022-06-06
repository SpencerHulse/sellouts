const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DateTime } = require("luxon");

const promotionSchema = new Schema({
  percentage: {
    type: Number,
    required: true,
  },
  ends: {
    type: String,
    required: true,
    default: DateTime.now()
      .plus({ days: 30 })
      .toLocaleString(DateTime.DATE_SHORT),
  },
  // Set up for potential memberships
  membersOnly: {
    type: Boolean,
    default: false,
  },
});

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
