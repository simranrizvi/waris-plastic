import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params; 

    // Logic: Agar ID "67b867-next-js-t-shirt" hai, to "-" se split karke pehla part (ID) lein
    const actualId = id.includes("-") ? id.split("-")[0] : id;

    // Check karein ke ID valid MongoDB format mein hai ya nahi
    const product = await Product.findById(actualId);

    if (!product) {
      return Response.json({ message: "Product not found in DB" }, { status: 404 });
    }

    return Response.json({ success: true, data: product });
  } catch (error) {
    return Response.json({ success: false, error: "Invalid Product ID or Format" }, { status: 500 });
  }
}

// PUT aur DELETE mein bhi 'await params' lazmi karein
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const actualId = id.includes("-") ? id.split("-")[0] : id;
    const body = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(actualId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) return NextResponse.json({ message: "Product not found" }, { status: 404 });
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