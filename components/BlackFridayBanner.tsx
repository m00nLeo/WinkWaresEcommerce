import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

  if (!sale?.isActive) return null;

  return (
    <div className="bg-gradient-to-r from-red-700/90 to-black text-white p-6 mx-4 mt-4 rounded-lg shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex-1">
          {/* Title */}
          <h2 className="text-xl sm:text-3xl font-extrabold text-left mb-4">
            {sale.title}
          </h2>

          {/* Description */}
          <p className="text-left text-lg sm:text-xl font-semibold mb-6">
            {sale.description}
          </p>

          {/* Coupon code && Discount Amount */}
          <div className="flex">
            <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
              <span className="font-bold text-base sm:text-lg">
                Use Code:
                <span className="text-red-600 ml-1">{sale.couponCode}</span>
              </span>
              <span className="ml-2 font-bold text-base sm:text-lg">
                for {sale.discountAmount}% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlackFridayBanner;
