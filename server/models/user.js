const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  accessToken: String,
  isVerified: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
