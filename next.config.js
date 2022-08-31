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
    unoptimized: true,
  },
});
