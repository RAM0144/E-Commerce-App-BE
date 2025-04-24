import express from "express";
import { Product } from "../DB-utilis/models.js";
import jwt from "jsonwebtoken";
const productRouter = express.Router();

// 1. Get all the products which are available
productRouter.get("/available", async (req, res) => {
  try {
    const products = await Product.find({ availableQty: { $gt: 0 } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

productRouter.get("/available/:sku", async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get all the products of a particular seller irrespective of availability
productRouter.get("/seller/:sellerId", async (req, res) => {
  try {
    const products = await Product.find({
      "sellerInfo.userId": req.params.sellerId,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Create a new product
productRouter.post("/", async (req, res) => {
  try {
    const userInfo = jwt.verify(
      req.headers["authorization"],
      process.env.JWT_SECRET
    );

    if (userInfo.userType === "seller") {
      const productBody = {
        ...req.body,
        sellerInfo: {
          ...userInfo,
        },
      };

      const newProduct = new Product(productBody);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } else {
      res.status(400).json({ msg: "Only a seller can do the action" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Update an existing product
productRouter.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. Delete an existing product
productRouter.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default productRouter;