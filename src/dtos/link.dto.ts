import { ComponentProps } from "react";
import {
  IBcLink,
  IBcLinkImageSetContent,
  IBcLinkStringContent,
  IImageSet,
} from "../../@types/generated/contentful";
import { BcLink } from "@2k-web/bc-link-react";
import { imageSetDto } from "./imageSet.dto";
import { ImgSrc } from "@2k-web/bc-image-react";

export const linkDto = (objIn: IBcLink): ComponentProps<typeof BcLink> => {
  const instanceOfBcLinkStringContent = (
    data: any
  ): data is IBcLinkStringContent => data.type === "string";
  const instanceOfBcLinkImageSetContent = (
    data: any
  ): data is IBcLinkImageSetContent => data.type === "imageSet";

  const content = objIn.fields.content.fields;

  let value;
  if (instanceOfBcLinkStringContent(content)) value = content.value;
  else if (instanceOfBcLinkImageSetContent(content))
    value = imageSetDto(content.value as IImageSet);
  else
    value = {
      src: "",
    } as ImgSrc;

  return {
    ...objIn.fields,
    content: {
      type: content.type ?? "string",
      // @ts-ignore come back to it
      value,
    },
  };
};
