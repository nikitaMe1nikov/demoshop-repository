const path = require('path');
const fs = require('fs');
const bundleAnalyzer = require('@next/bundle-analyzer');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const FRONTEND_SCOPE_PREFIX = '@frontend/';

const commonPackages = fs
  .readdirSync(path.join(process.cwd(), '../common'))
  .map((name) => FRONTEND_SCOPE_PREFIX + name);

const withTM = require('next-transpile-modules')([...commonPackages]);

module.exports = (phase, defaultConfig) => {
  return withBundleAnalyzer(withTM(Object.assign(defaultConfig)));
};
