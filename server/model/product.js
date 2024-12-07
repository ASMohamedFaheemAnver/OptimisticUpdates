const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("Product", productSchema);
