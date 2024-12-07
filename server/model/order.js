const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  // You can add additional fields such as snapshot of price, image, and other details relevant at the time of the order.
});

module.exports = mongoose.model("Order", orderSchema);
