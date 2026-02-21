import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// 1. GET: Saare products ya Category wise products mangwana
export async function GET(req) {
  try {
    await connectDB();
    
    // URL se category search parameter nikalna
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // Agar category di gayi hai to filter karein, warna saare dikhayein
    const filter = category ? { category: category } : {};
    
    const products = await Product.find(filter).sort({ createdAt: -1 }); // Newest first

    return NextResponse.json({ 
      success: true, 
      count: products.length, 
      data: products 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 2. POST: Naya Product Add Karna (Sirf Admin ke liye)
export async function POST(req) {
  try {
    await connectDB();

    // VIP: Security Check - Kya request bhejne wala Admin hai?
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ 
        success: false, 
        message: "Unauthorized: Sirf Admin product add kar sakta hai" 
      }, { status: 403 });
    }

    const body = await req.json();

    // Backend validation: Check karein ke zaroori fields mojood hain
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ 
        success: false, 
        message: "Name, Price, aur Category lazmi hain" 
      }, { status: 400 });
    }

    const product = await Product.create(body);
    
    return NextResponse.json({ 
      success: true, 
      message: "Product successfully add ho gaya!",
      data: product 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}