export const SITE_URL = "https://www.shreegauli.com";
export const SITE_NAME = "Shree Krishna Gauli";
export const BRAND_NAME = "Shree Gauli";
export const BUSINESS_NAME = "Shree Krishna Gauli Consulting";
export const SITE_PHONE_E164 = "+1-409-995-2521";
export const SITE_EMAIL = "hello@shreegauli.com";
export const SITE_LOCATION = {
  city: "Dallas",
  region: "TX",
  country: "US",
} as const;

export function absoluteUrl(path = "/") {
  const normalizedPath =
    path === "/"
      ? ""
      : path.startsWith("/")
        ? path
        : `/${path}`;

  return `${SITE_URL}${normalizedPath}`;
}
