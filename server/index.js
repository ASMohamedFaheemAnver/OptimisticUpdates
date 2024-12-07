const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/product");
const Order = require("./model/order");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const pid = process.pid;

const closeDBConnection = () => {
  console.log(`Closing db connection with pid : ${process.pid}`);
  mongoose.connection.close();
  process.exit();
};

process.on("SIGINT", closeDBConnection);

app.post("/create", async (req, res) => {
  // Cleaning up db documents
  await Product.deleteMany();
  await Order.deleteMany();
  // Create fresh product
  const product = new Product({ name: req.query.name, stock: 1000 });
  await product.save();
  return res.json(product);
});

app.get("/get", async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.query.name }).select({
      name: 1,
      stock: 1,
    });
    return res.json(product);
  } catch (e) {
    res.json({ error: e?.message });
  }
});

app.get("/versioning", async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.query.name });
    if (product.stock <= 0) throw new Error("Product is out of stock");
    // Create a new order
    const order = new Order({ product });
    // Update the product stock and push the order using version control
    const updateResult = await Product.updateOne(
      { _id: product._id, __v: product.__v }, // Version control using __v
      {
        $push: { orders: order._id },
        $inc: { __v: 1, stock: -1 },
      }
    );
    if (updateResult.modifiedCount === 0) {
      throw new Error("Race failed, please try again.");
    }
    await order.save();
    return res.json(product);
  } catch (e) {
    console.log(e);
    res.json({ error: e?.message });
  }
});

app.get("/noob", async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.query.name });
    if (product.stock <= 0) throw new Error("Product is out of stock");
    const order = new Order({ product });
    const updateResult = await Product.updateOne(
      { _id: product._id },
      {
        $inc: { stock: -1 },
        $push: { orders: order._id },
      }
    );
    await order.save();
    return res.json(updateResult);
  } catch (e) {
    console.log(e);
    // Close transaction
    res.json({ error: e?.message });
  }
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then((_) => {
    app.listen(PORT, () => {
      console.log(`Server running with pid : ${pid} on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log({ err });
  });
