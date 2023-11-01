const { createContentlayerPlugin } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
});

module.exports = withContentlayer(nextConfig);
