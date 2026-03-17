import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(year desc) {
    _id, 
    title, 
    slug, 
    year, 
    location,
    curatorNote,
    "heroImage": heroImage.asset->{..., metadata},
    tags
  }
`);

export const LATEST_PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(year desc)[0...3] {
    _id, 
    title, 
    slug, 
    year, 
    location,
    curatorNote,
    "heroImage": heroImage.asset->{..., metadata},
    tags
  }
`);

export const PROJECT_DETAIL_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ...,
    "heroImage": heroImage.asset->{..., metadata},
    "video": video.asset->{playbackId, assetId},
    "gallery": gallery[]{
        ...,
        "asset": asset->{..., metadata}
    },
    "linkedPieces": linkedPieces[]->{
      _id,
      title,
      slug,
      priceDisplay,
      shortDescription,
      "mainImage": mainImage.asset->{..., metadata}
    },
    "neighbors": *[_type == "project"] | order(year desc) { "slug": slug.current, title }
  }
`);
