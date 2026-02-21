import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    // 1. Check karein ke user pehle se to nahi hai
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    // 2. Password hashing (Security ke liye)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Naya user create karein (Default role: "user")
    await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      role: "user" // VIP: Is se aapka 2-role system start hoga
    });

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}