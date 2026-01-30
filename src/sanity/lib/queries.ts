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

export const MATERIALS_QUERY = defineQuery(`
  *[_type == "material"] | order(order asc) {
    _id,
    title,
    description,
    "image": image.asset->{..., metadata},
    order
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
    "gallery": gallery[].asset->{..., metadata},
    "neighbors": *[_type == "project"] | order(year desc) { "slug": slug.current, title }
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

export const FEATURED_PIECES_QUERY = defineQuery(`
  *[_type == "piece"] | order(title asc)[0...3] {
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
    },
    "neighbors": *[_type == "piece"] | order(title asc) { "slug": slug.current, title }
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
    heroContent[]{
      _type,
      _type == 'image' => {
        ...,
        asset->{..., metadata}
      },
      _type == 'mux.video' => {
        ...,
        asset->{playbackId, assetId}
      }
    },
    seo{
      title,
      description,
      favicon {
        asset->{
            url
        }
      }
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
    },
    philosophyImage {
      ...,
      asset->{..., metadata}
    },
    materialsImage {
      ...,
      asset->{..., metadata}
    },
    artistImage {
      ...,
      asset->{..., metadata}
    },
    atelierHeroImage {
      ...,
      asset->{..., metadata}
    },
    aboutPortrait {
      ...,
      asset->{..., metadata}
    }
  }
`);

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

export const LEGAL_PAGE_QUERY = defineQuery(`
  *[_type == "legal" && slug.current == $slug][0] {
    title,
    lastUpdated,
    content
  }
`);
