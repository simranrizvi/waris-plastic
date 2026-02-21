import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart"; // Ensure karein aapke paas Cart model hai
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET: Login user ka cart dhoondna
export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // User ki ID se cart nikalna
    const userCart = await Cart.findOne({ userId: session.user.id });

    return NextResponse.json({ 
      success: true, 
      data: userCart ? userCart.items : [] 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Cart sync karna (Aapka pehle wala code)
export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false }, { status: 401 });

    const { items } = await req.json();
    
    // Upsert logic: Agar cart hai to update, warna naya create
    await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { items },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, message: "Cart synced" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}