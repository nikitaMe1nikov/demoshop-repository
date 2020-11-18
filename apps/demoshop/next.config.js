const bundleAnalyzer = require('@next/bundle-analyzer');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = (phase, defaultConfig) => {
  return withBundleAnalyzer(Object.assign(defaultConfig));
};
