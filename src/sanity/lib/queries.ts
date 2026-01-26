import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(year desc) {
    _id, 
    title, 
    slug, 
    year, 
    location,
    "heroImage": heroImage.asset->{..., metadata},
    tags
  }
`);

export const PROJECT_DETAIL_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ...,
    "heroImage": heroImage.asset->{..., metadata},
    "gallery": gallery[].asset->{..., metadata}
  }
`);

export const ATELIER_QUERY = defineQuery(`
  *[_type == "piece"] | order(title asc) {
    _id, 
    title, 
    slug, 
    priceDisplay,
    "mainImage": mainImage.asset->{..., metadata},
    shortDescription
  }
`);

export const PIECE_DETAIL_QUERY = defineQuery(`
  *[_type == "piece" && slug.current == $slug][0] {
    ...,
    "mainImage": mainImage.asset->{..., metadata},
    "gallery": gallery[].asset->{..., metadata},
    "relatedFAQs": relatedFAQs[]->{ _id, question, answer },
    "relatedProjects": *[_type == "project" && references(^._id)] {
      _id, 
      title, 
      slug, 
      "heroImage": heroImage.asset->{..., metadata}
    }
  }
`);

export const GLOBAL_FAQ_QUERY = defineQuery(`
  *[_type == "faq"] | order(category asc) {
    _id,
    question,
    answer,
    category
  }
`);
