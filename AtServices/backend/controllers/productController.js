const Product = require("../e-commerceSchema/productSchema");

const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find();
    res.status(201).json({ products: products });
  } catch (err) {
    console.log("Error in getting all the products", err);
    res.status(500).json({ message: "Server error" });
  }
};

// get Single Product
const getProduct = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(400).json({ message: "No ID provided" });
  }
  const product = await Product.findById(productId);
  //checking if the product exists or not
  if (!product) {
    return res
      .status(404)
      .json({ message: "The product with given ID was not found." });
  }
  res.status(200).json(product);
};

//update product
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;
  if (!productId || !updates) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(409).send("There was a conflict creating the user");
  }
};
//add product in array form
// const addToCart = async (req, res) => {
//     const cartItem = {
//         ...req.body,
//         quantity: Number(req.body.quantity),
//         };

const addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.log("Error in saving new product", err);
  }
};
module.exports = {
  getAllProducts,
  getProduct,
  updateProduct,
  addProduct,
};
