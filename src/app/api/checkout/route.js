import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { orderItems, shippingAddress, totalPrice, userId, paymentMethod } = body;

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ message: "No order items" }, { status: 400 });
    }

    // Naya order create ho rha hai
    const order = new Order({
      // FIX: Agar userId null hai to field ko null hi rehne dein (Guest handle ho jayega)
      user: userId ? userId : null, 
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod: paymentMethod || "Stripe"
    });

    const createdOrder = await order.save();
    return NextResponse.json({ 
      success: true, 
      message: userId ? "Order placed by user" : "Guest order placed", 
      data: createdOrder 
    }, { status: 201 });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ message: "Checkout Error", error: error.message }, { status: 500 });
  }
}