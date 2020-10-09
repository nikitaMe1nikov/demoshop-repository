// const path = require('path');

// const libs = path.resolve(__dirname, '../../libs');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {},
  },
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-optional-catch-binding'],
    // [
    //   'module-resolver',
    //   {
    //     root: ['.'],
    //     alias: {
    //       '^@demo/(.+)': libs + '/\\1/src',
    //     },
    //   },
    // ],
  ],
};
