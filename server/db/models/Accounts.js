const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      // required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      spares: true
    }
  },
  {strict: false}
)

module.exports = Account = mongoose.model("accounts", AccountSchema);