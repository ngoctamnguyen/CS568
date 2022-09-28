const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: { type: String },
    detail: { type: String },
    rating: { type: Number },
    price: { type: Number },
    discount: {type: Number, default: 0},
    photo: {type: String},
    review: { type: Array },
    isDelete: {type: Boolean, default: false}
  }
);

module.exports = mongoose.model("Meal", userSchema);
