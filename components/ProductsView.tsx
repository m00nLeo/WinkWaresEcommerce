"use client";

import { Category, Product } from "@/sanity.types";
import { ProductGrid } from "./ProductGrid";
import CategorySelectorComponent from "./ui/category-selector";
import { usePathname } from "next/navigation";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

export const ProductsView = ({ products, categories }: ProductsViewProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      {/* Categories */}
      <div className="w-full sm:w-[200px] mt-2">
        <CategorySelectorComponent categories={categories} />
      </div>

      {/* Title */}
      {pathname === "/" && (
        <div className="flex flex-col justify-center items-center space-x-2 gap-2 mt-6 mb-2">
          <h2 className="font-extrabold md:text-4xl text-base uppercase">
            New collection
          </h2>
          <p className="text-sm md:text-base text-blue-400 sm:max-w-sm md:max-w-2xl font-semibold text-center">
            Our latest collection, where classic and contemporary styles
            converge in perfect harmony.
          </p>
        </div>
      )}

      {/* Products */}
      <div className="flex-1">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};
