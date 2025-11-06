import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  discountedPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required:true
  },
  shipping: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

// ❗️Use regular function for `this` binding
productSchema.pre("save", function (next) {
  if (this.discountPercentage > 0) {
    this.discountedPrice = this.price - (this.price * this.discountPercentage) / 100;
  } else {
    this.discountedPrice = this.price;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
