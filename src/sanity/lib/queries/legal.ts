import { defineQuery } from "next-sanity";

export const LEGAL_PAGE_QUERY = defineQuery(`
  *[_type == "legal" && slug.current == $slug][0] {
    title,
    lastUpdated,
    content
  }
`);
