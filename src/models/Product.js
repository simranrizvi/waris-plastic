import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  category: { type: String, required: true },
  images: [{ type: String }], // Array of URLs
  public_ids: [{ type: String }], // Future mein delete karne ke liye zaroori hai
  stock: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);