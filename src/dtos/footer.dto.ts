import { ComponentProps } from "react";
import { IBcFooter } from "../../@types/generated/contentful";
import { BcFooter } from "@2k-web/bc-footer-react";
import { linkDto } from "./link.dto";
import { imageSetDto } from "./imageSet.dto";

export const footerDto = (
  objIn: IBcFooter
): ComponentProps<typeof BcFooter> => {
  const fields = objIn.fields;

  return {
    layoutType: fields.layoutType,
    displayCookieSettings: fields.displayCookieSettings,
    cookieSettingsOrder: fields.cookieSettingsOrder,
    legalText: fields.legalText,
    legalLinks: {
      ...fields.legalLinks.fields,
      links: fields.legalLinks.fields.links.map(linkDto),
    },
    socialLinks: {
      ...fields.socialLinks.fields,
      links: fields.socialLinks.fields.links.map(linkDto),
    },
    publisherLinks: {
      ...fields.publisherLinks.fields,
      links: fields.publisherLinks.fields.links.map(linkDto),
    },
    publisherImages: fields.publisherImages?.map(imageSetDto),
    ratingImages: fields.ratingImages?.map(imageSetDto),
    developerImages: fields.developerImages?.map(imageSetDto),
    platformImages: fields.platformImages?.map(imageSetDto),
  };
};
