import { client } from "@/sanity/lib/client";
import urlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = urlBuilder(client);

export function imageUrl(source: SanityImageSource){
    return builder.image(source)
}