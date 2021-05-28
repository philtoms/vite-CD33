import { IImageSet, IImgSrc } from "../../@types/generated/contentful";
import { BcImageSet } from "@2k-web/bc-image-set-react";
import { imageSrcDto } from "./imageSrc.dto";
import { ComponentProps } from "react";

export const imageSetDto = (
  objIn: IImageSet
): ComponentProps<typeof BcImageSet> => {
  return {
    ...objIn.fields,
    imageDesktop: imageSrcDto(objIn.fields.imageDesktop)!,
    imageTablet: imageSrcDto(objIn.fields.imageTablet),
    imageMobile: imageSrcDto(objIn.fields.imageMobile),
  };
};
