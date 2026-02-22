import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  // FIX: required hata kar false kar diya taake guest order save ho sakay
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, 
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      color: { type: String },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    },
  ],
  shippingAddress: {
    name: { type: String, required: true },        // Naya Field
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true, default: "Stripe" },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);