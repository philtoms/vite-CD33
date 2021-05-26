import { ComponentProps } from "react";
import { BcFeaturedTilesSection } from "@2k-web/bc-featured-tiles-section-react";
import { BcNewsTile } from "@2k-web/bc-news-tile-react";

export const courtsideReports: ComponentProps<typeof BcFeaturedTilesSection> = {
  layoutType: "carousel",
  featuredContentSectionProps: {
    layoutDirectionMobile: "column",
    layoutDirectionDesktop: "column",
    primaryBlock: {
      heading: "COURTSIDE REPORTS",
      body: "Lorem ipsum dolor sit amet, consectetur adip iscing elit. Etiam risus turpis, pharetra luretta vulputate ipsum sed, tempus iaculis metus.",
    },
  },
  items: [
    {
      is: "BcNewsTile",
      link: {
        href: `https://mafiagame.com/news/slug`,
        type: "button",
        content: {
          type: "string",
          value: "READ THIS REPORT",
        },
      },
      thumb: {
        src: "https://cdn.2kgames.com/2021/05/19/60a55834897242k21_Courtside_Report-Thumb_CG.png",
      },
      slug: "nba-report-slug",
      title: "REPORT #1 HEADLINE",
      summary: "Read Time: 3.0m",
    },
    {
      is: "BcNewsTile",
      link: {
        href: `https://mafiagame.com/news/slug`,
        type: "button",
        content: {
          type: "string",
          value: "READ THIS REPORT",
        },
      },
      thumb: {
        src: "https://cdn.2kgames.com/2021/05/10/609973e2ecc2e2k21_Courtside_Report-NG-PatchUpdate8.jpg",
      },
      slug: "nba-report-slug",
      title: "REPORT #2 HEADLINE",
      summary: "Read Time: 1.5m",
    },
    {
      is: "BcNewsTile",
      link: {
        href: `https://mafiagame.com/news/slug`,
        type: "button",
        content: {
          type: "string",
          value: "READ THIS REPORT",
        },
      },
      thumb: {
        src: "https://cdn.2kgames.com/2021/05/05/60932e94a17982k21_Courtside_Report-NG-S7.jpg",
      },
      slug: "nba-report-slug",
      title: "REPORT #3 HEADLINE",
      summary: "Read Time: 2.5m",
    },
  ],
};
