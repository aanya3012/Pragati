const PRODUCTION_SITE_URL = "https://pragati-psi.vercel.app";
const DEVELOPMENT_SITE_URL = "http://localhost:3000";

export function getSiteUrl() {
  if (process.env.NODE_ENV === "production") {
    const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    return configuredUrl && !configuredUrl.includes("localhost") ? configuredUrl : PRODUCTION_SITE_URL;
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  return DEVELOPMENT_SITE_URL;
}

export function getOAuthCallbackUrl() {
  return `${getSiteUrl()}/auth/callback?next=/dashboard`;
}
