// Implementing Server Actions
"use server";

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { BasketItem } from "@/store/store";

// `interface` without an explicit index signature does not allow additional properties beyond what is explicitly declared. When Stripe expects MetadataParam (which is essentially { [key: string]: string }), it allows any key-value pairs as long as the key is a string and the value is a string.
// export interface Metadata {
//   orderNumber: string;
//   customerName: string;
//   customerEmail: string;
//   clerkUserId: string;
//   [key: string]: string; // Add this to support additional keys, but not recommended
// }

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    // Check if any grouped items dont have a price
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    //  Search for existing customer by email
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`;

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`; // Redirect the user after they're succeeded the payment && {CHECKOUT_SESSION_ID} will be pre-filled from stripe, so no need to make it dynamic

    const cancelUrl = `${baseUrl}/basket`; // Opposite with success_url

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd", // `gbp` for Euro and `usd` for US$
          unit_amount: Math.round(item.product.price! * 100), // Sub currency
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: `Product Id: ${item.product._id}`,
            metadata: {
              // IMPORTANT: need ID to connect to inside of Sanity's DB
              id: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })), // What is actual being buy
    });

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
