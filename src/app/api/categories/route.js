import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    
    // MongoDB aggregation use karke categories aur counts nikalna
    const categoryData = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Alphabetical order
    ]);

    return NextResponse.json({ success: true, data: categoryData });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}