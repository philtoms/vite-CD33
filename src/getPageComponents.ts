import { Entry } from "contentful";

export const getPageComponents = (
  pageData: Entry<any>
): { [key: string]: any }[] | null => {
  if (!pageData.fields?.content?.fields) return null;

  return Object.values(pageData.fields?.content?.fields as Entry<any>)
    .filter((v) => {
      if (typeof v !== "object") return false;

      if (
        !v?.sys?.contentType?.sys?.id
        // || !v?.sys?.contentType?.sys?.id?.startsWith("Bc")
      ) {
        console.error("Non Beacon content type found!", v);
        return false;
      }
      return typeof v === "object";
    })
    .map((v) => ({
      [v.sys.contentType.sys.id]: v.fields,
    }));
};
