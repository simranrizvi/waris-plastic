import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();
        
        // 1. Database se user find karein
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found with this email");

        // 2. Password match karein
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) throw new Error("Incorrect password");

        // 3. VIP: Sirf wo data return karein jo zaroori hai (Password ko return mat karein)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role, // Yahan role return karna zaroori hai
        };
      },
    }),
  ],
  callbacks: {
    // JWT mein id aur role save karna
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Role ko token mein daal diya
      }
      return token;
    },
    // Session mein role aur id ko frontend ke liye available karna
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role; // Session mein role set kar diya
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Production ke liye JWT strategy best hai
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };