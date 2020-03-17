const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});
const CompressionPlugIn = require("compression-webpack-plugin");

module.exports = withBundleAnalyzer({
  webpack(config) {
    const prod = process.env.NODE_ENV === "production";
    const plugins = [...config.plugins];
    if (prod) {
      plugins.push(new CompressionPlugIn());
    }
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
      plugins
    };
  }
});
