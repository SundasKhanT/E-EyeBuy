const mongoose = require("mongoose");

const typeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    }
  },
  {
    timeStamps: true
  }
);

module.exports = mongoose.model("Type", typeSchema);
