import { defineQuery } from "next-sanity";

export const MATERIALS_QUERY = defineQuery(`
  *[_type == "material"] | order(order asc) {
    _id,
    title,
    description,
    "image": image.asset->{..., metadata},
    order
  }
`);
