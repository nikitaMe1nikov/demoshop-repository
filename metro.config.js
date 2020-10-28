/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');

module.exports = {
  projectRoot:  path.resolve(__dirname, './apps/demoshop-native'),
  resolver: {
    useWatchman: false,
  },
  watchFolders: [
    path.resolve(__dirname, './node_modules'),
    path.resolve(__dirname, './libs'),
  ],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
