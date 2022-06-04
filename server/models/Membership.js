const mongoose = require("mongoose");
const { Schema } = mongoose;

const membershipSchema = new Schema(
  {
    tier: {
      type: String,
      default: free,
    },
    ends: {
      type: Date,
      default: Date.now(),
      // Might or might not work - also Date.now() might need to be new Date()
      get: (endsVal) => endsVal.setDate(endsVal.getDate() + 30),
    },
  },
  { toJSON: { getters: true } }
);

const Membership = mongoose.model("Membership", membershipSchema);

module.exports = Membership;
