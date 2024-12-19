import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export default async function searchProductsByName(searchParam: string) {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
        *[
            _type == "product"
            && name match $searchParam
        ] | order(name asc)
        `);

  try {
    // Use sanityFetch to send the query and pass the search parameter with a wildcard
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}*`, // Append wildcard for partial match
      },
    });

    // Return the list of products, or an emty array if none are found
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by name:", error);
    return [];
  }
}
