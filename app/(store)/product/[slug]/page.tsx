import AddToBasketButton from "@/components/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 60;

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Slug is like a product ID, use for router in Next
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden  w-full h-[60vh] flex justify-end items-center ${isOutOfStock ? "opacity-50" : ""}`}
        >
          {/* Product Image */}
          {product.image && (
            <Image
              className="object-cover w-2/3 h-full transition-transform duration-300 group-hover:scale-105 rounded-lg shadow-md"
              src={imageUrl(product.image).url()}
              alt={product.name || "Product Image"}
              width={0}
              height={0}
              sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Out of stock Notification */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of stock</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between w-2/3">
          <div className="">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Price */}
            <div className="mb-4 text-xl font-semibold">
              ${product.price?.toFixed(2)}
            </div>

            {/* Description */}
            {/* prose is belong to tailwindcss-typography (official plugin for Tailwind CSS), which helps you slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document */}
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>

          {/* Add to Basket button */}
          <div className="mt-6">
            {/* Choose quantity */}
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
