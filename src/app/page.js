import BestSellingProducts from "@/components/home/BestSellingProducts";
import ShopByCategory from "@/components/home/Category";
import ClientTestimonials from "@/components/home/ClientTestimonials";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import FeaturesBanner from "@/components/home/FeaturesBanner";
import HeroSection from "@/components/home/HeroSection";
import HotCategories from "@/components/home/HotCategories";
import ProductShowcase from "@/components/home/ProductShowcase";

import React from "react";

const page = () => {
  return (
    <div>
      <main className="overflow-visible">
        {" "}
        {/* Ensure overflow is visible here */}
        <HeroSection />
        {/* Product Showcase Section */}
        <div className="md:relative md:z-10 md:-mt-32">
          <ProductShowcase />
        </div>
        <ShopByCategory />
        <FeaturedProductsSection />
        <FeaturesBanner />
        <BestSellingProducts />
        <ClientTestimonials />
        <HotCategories />
      </main>
    </div>
  );
};

export default page;
