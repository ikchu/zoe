module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            importNames: ['SafeAreaView'],
            message: 'Import SafeAreaView from react-native-safe-area-context instead',
          },
          {
            name: 'react-native-safe-area-view',
            importNames: ['SafeAreaView'],
            message: 'Import SafeAreaView from react-native-safe-area-context instead',
          },
        ],
      },
    ],
  },
};
