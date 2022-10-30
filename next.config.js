const ghPages = process.env.DEPLOY_TARGET === "gh-pages";

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
module.exports = withMDX({
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  pageExtensions: ["js", "jsx", "mdx"],
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: ghPages ? "/blog/" : "",
  assetPrefix: ghPages ? "/blog/" : "",
});
