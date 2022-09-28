const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: { type: String },
    username: { type: String },
    password: { type: String },
    email: { type: String },
    tel: { type: String },
    role: { type: String }

  }
);

module.exports = mongoose.model("Client", userSchema);
