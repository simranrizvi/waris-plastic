import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// 1. GET Single Product Detail
export async function GET(req, { params }) {
  try {
    await connectDB();
    
    // VIP Fix: Params ko await karna lazmi hai latest Next.js mein
    const { id } = await params; 

    console.log("Searching for ID:", id); // Terminal mein check karein ID aa rahi hai?

    const product = await Product.findById(id);

    if (!product) {
      return Response.json({ message: "Product not found in DB" }, { status: 404 });
    }

    return Response.json({ success: true, data: product });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 2. UPDATE Product (Admin use karega)
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true, // Updated data wapis bhejne ke liye
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// 3. DELETE Product (Admin use karega)
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}