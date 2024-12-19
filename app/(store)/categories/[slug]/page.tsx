import { ProductsView } from "@/components/ProductsView";
import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import { gettAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";
import Image from "next/image";

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  const categories = await gettAllCategories();

  function getRandomImage(array: Product[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        {/* Parent container for both Image and overlay */}
        <div className="relative w-full h-full rounded-lg overflow-hidden mb-4">
          {/* Image Component */}
          {products.length > 0 ? (
            <Image
              src={imageUrl(getRandomImage(products).image!).url()}
              alt="Hero Image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-[40vh] object-cover"
            />
          ) : (
            <Image
              src="/images/hero.jpg"
              alt="Hero Image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          )}

          {/* Overlay - Matches Image size */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900/90 opacity-50"></div>

          {/* Title */}
          {products.length > 0 ? (
            <div className="absolute flex flex-col justify-center items-center space-x-2 gap-2 mt-6 mb-2 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-center">
              <h1 className="font-extrabold md:text-4xl text-base uppercase text-white">
                {slug
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}{" "}
                Collection
              </h1>
              <p className="text-sm md:text-base text-blue-400 sm:max-w-sm md:max-w-2xl font-semibold">
                Our latest collection, where classic and contemporary styles
                converge in perfect harmony.
              </p>
            </div>
          ) : (
            <div className="absolute flex flex-col justify-center items-center space-x-2 gap-2 mt-6 mb-2 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-center text-white">
              <p className="font-extrabold md:text-2xl text-base capitalize">
                Can&apos;t find any product late to &quot;
                {slug
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                &quot; Category!
              </p>

              <p className="italic">Please choose different category!</p>
            </div>
          )}
        </div>

        {/* Products by Category */}
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}

export default CategoryPage;
