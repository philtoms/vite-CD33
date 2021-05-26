import { ComponentProps } from "react";
import { IBcCopyBlock, IImgSrcFields } from "../../@types/generated/contentful";
import { BcCopyBlock } from "@2k-web/bc-copy-block-react";
import { linkDto } from "./link.dto";

export const copyBlockDto = (
  objIn?: IBcCopyBlock
): ComponentProps<typeof BcCopyBlock> | undefined => {
  if (!objIn) return undefined;
  const fields = objIn.fields;

  const instanceOfImgSrc = (data: any): data is IImgSrcFields => "src" in data;

  return {
    heading: instanceOfImgSrc(fields.heading?.fields)
      ? {
          ...fields.heading?.fields,
          src: fields.heading?.fields.src.fields.file.url ?? "",
        }
      : fields.heading?.fields.value,
    subheading: fields?.subheading,
    body: fields?.body,
    links: fields?.links?.map(linkDto),
  };
};
