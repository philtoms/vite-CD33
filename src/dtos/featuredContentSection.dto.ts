import { ComponentProps } from "react";
import { BcFeaturedContentSection } from "@2k-web/bc-featured-content-section-react";
import { IBcFeaturedContentSection } from "../../@types/generated/contentful";
import { copyBlockDto } from "./copyBlock.dto";

export const featuredContentSectionDto = (
  objIn: IBcFeaturedContentSection
): ComponentProps<typeof BcFeaturedContentSection> => {
  const fields = objIn.fields;
  return {
    layoutDirectionDesktop: fields.layoutDirectionDesktop,
    layoutDirectionMobile: fields.layoutDirectionMobile,
    primaryBlock: copyBlockDto(fields.primaryBlock), // TODO: Remove casting when types are fixed for feat. content section
  };
};
