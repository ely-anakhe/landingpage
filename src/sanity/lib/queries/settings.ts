import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings"][0] {
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
    socialLinks[]{
      platform,
      url
    },
    philosophyImage {
      ...,
      asset->{..., metadata}
    },
    philosophyText,
    founderText,
    artistImage {
      ...,
      asset->{..., metadata}
    },
    aboutText,
    aboutPoem,
    aboutPortrait {
      ...,
      asset->{..., metadata}
    },
    aboutInteriorImage {
      ...,
      asset->{..., metadata}
    }
  }
`);
