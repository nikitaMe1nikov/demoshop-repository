module.exports = {
  name: 'demoshop',
  preset: ['../../jest.config.js', 'react-native'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/node_modules/react-native/jest/setup.js', '<rootDir>/test/setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-native|@react-navigation|@storybook|@react-native-community)',
  ],
};
