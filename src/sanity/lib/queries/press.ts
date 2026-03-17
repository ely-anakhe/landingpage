import { defineQuery } from "next-sanity";

export const PRESS_QUERY = defineQuery(`
  *[_type == "press"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    publication,
    publishedAt,
    url,
    "image": image.asset->{..., metadata}
  }
`);
