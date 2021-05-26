// @ts-ignore
import { createClient } from "contentful/dist/contentful.browser.min.js";
import * as Cookies from "js-cookie";
import { Entry } from "contentful";

const PREVIEW_ENV = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || "master";
const PREVIEW_SPACE = import.meta.env.VITE_PREVIEW_SPACE;
const PREVIEW_ACCESS_TOKEN = import.meta.env.VITE_PREVIEW_ACCESS_TOKEN;

const CDN_ENV = import.meta.env.VITE_CDN_ENV || "master";
const CDN_SPACE = import.meta.env.VITE_CDN_SPACE;
const CDN_ACCESS_TOKEN = import.meta.env.VITE_CDN_ACCESS_TOKEN;

// Called from clientside
export const getContentFromContentful = <T extends object>(
  entryId: string
): Promise<T> => {
  if (!entryId) throw new Error("You need to provide entryId.");

  const isPreview = true; // TODO: Bring it back Cookies.get("contentType") === "preview";

  const environment = isPreview ? PREVIEW_ENV : CDN_ENV;
  const space = isPreview ? PREVIEW_SPACE! : CDN_SPACE!;
  const accessToken = isPreview ? PREVIEW_ACCESS_TOKEN! : CDN_ACCESS_TOKEN!;
  if (isPreview)
    console.log(
      `Getting Contentful data using Preview keys from "${environment}" environment`
    );
  else
    console.log(
      `Getting Contentful data using Live CDN keys from "${environment}" environment`
    );

  const client = createClient({
    environment,
    space,
    accessToken,
    host: isPreview ? "preview.contentful.com" : undefined,
  });

  return client.getEntry(entryId, { include: 10 }).catch((e: Error) => {
    console.log(e);
    return { fields: null } as T;
  }) as Promise<T>;
};
