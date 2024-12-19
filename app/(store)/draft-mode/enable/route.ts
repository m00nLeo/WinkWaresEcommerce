/**
 * This file is used to allow Presentation to set the app in Draft Mode, which will load Visal Editing
 * and query draft content and preview the content as it will appear once everything is published
 * Docs: https://www.sanity.io/docs/preview-url-secret
 * Endpoint `enable` and `disable`, which are authorized to give admin a specical Draft-token to allows them to enter Presentation mode
 */

// Set the viewer token
import { client } from "@/sanity/lib/client";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const clientWithToken = client.withConfig({
  // Required, otherwise the URL preview secret can't be validated
  token: process.env.SANITY_API_READ_TOKEN,
});

export async function GET(req: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    req.url
  );

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  (await draftMode()).enable();

  redirect(redirectTo);
}
