import hostname from "./host";

export const appInfo = {
  appName: "SuperTokens Next.js demo app",
  apiDomain: hostname, // tells SuperTokens where the APIs are exposed from
  websiteDomain: hostname,
  apiBasePath: "/api/auth", // the path at which the backend SDK exposes all its API
  websiteBasePath: "/auth" // the path where the frontend SDK will add its routes
};
