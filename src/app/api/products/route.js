import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 1. GET: Saare products ya Category wise products mangwana (Aapka Original Logic)
export async function GET(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const filter = category ? { category: category } : {};
    
    const products = await Product.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      count: products.length, 
      data: products 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 2. POST: Naya Product Add Karna (Multiple Images with Cloudinary)
export async function POST(req) {
  try {
    await connectDB();

    // Admin Security Check
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ 
        success: false, 
        message: "Unauthorized: Sirf Admin product add kar sakta hai" 
      }, { status: 403 });
    }

    const formData = await req.formData();
    
    // Form fields nikalna
    const name = formData.get("name");
    const price = formData.get("price");
    const category = formData.get("category");
    const description = formData.get("description");
    const discount = formData.get("discount");
    const stock = formData.get("stock");
    
    // Multiple images pakarna (Frontend field name 'images' hona chahiye)
    const files = formData.getAll("images"); 

    // Validation
    if (!name || !price || !category || files.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: "Name, Price, Category aur kam az kam 1 image lazmi hai" 
      }, { status: 400 });
    }

    // --- CLOUDINARY MULTIPLE UPLOAD LOGIC ---
    const uploadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { 
            folder: "warisplastic_products", 
            resource_type: "auto" 
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
    });

    // Saari uploads ka ek sath wait karna
    const uploadResults = await Promise.all(uploadPromises);

    // URLs aur Public IDs ke arrays banana
    const imageUrls = uploadResults.map(res => res.secure_url);
    const publicIds = uploadResults.map(res => res.public_id);

    // Database mein Save karna
    const product = await Product.create({
      name,
      price: Number(price),
      description,
      category,
      discount: Number(discount) || 0,
      stock: Number(stock) || 0,
      images: imageUrls, // Array of URLs
      public_ids: publicIds // Array of IDs
    });
    
    return NextResponse.json({ 
      success: true, 
      message: `${files.length} images ke sath product add ho gaya!`,
      data: product 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}