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
    "video": video.asset->{playbackId, assetId},
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
    "video": video.asset->{playbackId, assetId},
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

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings"][0] {
    siteTitle,
    seo{
      title,
      description
    },
    announcementBar{
      enabled,
      text,
      link
    },
    mainNavigation[]{
      label,
      href
    },
    footerContact,
    socialLinks[]{
      platform,
      url
    }
  }
`);
