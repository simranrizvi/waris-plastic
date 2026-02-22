import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },    // <--- Name save karne ke liye
      price: { type: Number, required: true },   // <--- Price save karne ke liye
      image: { type: String, required: true },   // <--- Image URL save karne ke liye
      color: { type: String, default: "Default" }, // <--- Selected color ke liye
      quantity: { type: Number, default: 1 },
      category: { type: String }
    }
  ],
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);