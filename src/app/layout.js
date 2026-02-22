import "./globals.css";
import Header from "../components/navbar/Header";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext"; //
import AuthProvider from "@/components/AuthProvider"; // NextAuth Session ke liye
import Footer from "@/components/Footer";

export const metadata = {
  title: "warisplastic | Premium Furniture Store",
  description: "Modern furniture for home and office",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* VIP: Auth aur Cart providers ko yahan wrap karna lazmi hai */}
        <AuthProvider>
          <CartProvider>
            {" "}
            {/* */}
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster position="top-center" richColors />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
