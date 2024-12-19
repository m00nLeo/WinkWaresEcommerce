import { ProductsView } from "@/components/ProductsView";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { gettAllCategories } from "@/sanity/lib/products/getAllCategories";
import BlackFridayBanner from "@/components/BlackFridayBanner";
import Image from "next/image";

// Cause NextJS 15 always doesn't cache by default, for that make it dynaimic
export const dynamic = "force-static";
export const revalidate = 60; // revalidate (xác nhận một lần nữa) / Update at every most 60 seconds

const Home = async () => {
  const products = await getAllProducts();
  const categories = await gettAllCategories();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sale Banner */}
      <BlackFridayBanner />

      {/* Hero */}
      <div className="p-4 relative hidden sm:block md:h-[50vh] ">
        {/* Parent container for both Image and overlay */}
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          {/* Image Component */}
          <Image
            src="/images/hero.jpg"
            alt="Hero Image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          {/* Overlay - Matches Image size */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-blue-900/90 opacity-50"></div>

          {/* Text Overlay */}
          <div className="relative container mx-auto">
            <div className="hidden sm:block text-white absolute bottom-20 left-4 max-w-xs md:max-w-2xl">
              <h3 className="uppercase font-bold text-xl md:text-2xl lg:text-4xl mb-4">
                Wink autumn collection
              </h3>
              <p className="text-sm md:text-base lg:text-lg">
                Find out our best autumn collection. Offering our best quality
                product in a Wink Autumn Collection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Render all the products */}
      <div className="flex flex-col items-center justify-top container mx-auto p-4 pb-8">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
};

export default Home;
