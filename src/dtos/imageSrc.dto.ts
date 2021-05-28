import { IImgSrc } from "../../@types/generated/contentful";
import { ImgSrc } from "@2k-web/bc-image-react";

export const imageSrcDto = (objIn?: IImgSrc): ImgSrc | undefined => {
  if (!objIn) return undefined;

  return {
    ...objIn.fields,
    src: objIn.fields.src.fields.file.url,
  };
};
