// models/User.mjs

import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["seller", "customer"],
    required: true,
  },
  gstNo: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);

// Product Model
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String], // Array of strings to store image URLs or paths
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.every((url) => typeof url === "string");
        },
        message: "Images must be an array of strings",
      },
    },
    availableQty: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    sellerInfo: {
      type: new Schema({
        name: {
          type: String,
          required: true,
          trim: true,
        },
        userId: {
          type: String,
          required: true,
          trim: true,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          trim: true,
        },
      }),
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Product = mongoose.model("Product", productSchema, "products");

const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
  },
  totalQty: {
    type: Number,
    required: true,
  },
  orderTotal: {
    type: Number,
    required: true,
  },
  // userId: {
  //   type: String,
  //   required: true,
  // },
});

export const Order = mongoose.model("Order", orderSchema);