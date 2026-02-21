import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { orderItems, shippingAddress, totalPrice, userId } = body;

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ message: "No order items" }, { status: 400 });
    }

    // Naya order create ho rha hai
    const order = new Order({
      user: userId, // Auth setup ke baad ye session se aayega
      orderItems,
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();
    return NextResponse.json({ success: true, data: createdOrder }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Checkout Error", error: error.message }, { status: 500 });
  }
}