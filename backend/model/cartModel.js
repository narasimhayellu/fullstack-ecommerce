const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      id: String,
      name: String,
      image: String,
      qty: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);

