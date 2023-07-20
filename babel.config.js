module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.json'],
        alias: {
          '@app': './src',
        },
      },
    ],
  ],
};
