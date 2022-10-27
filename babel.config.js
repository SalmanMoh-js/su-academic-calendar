module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            'react-toastify': '@jamsch/react-native-toastify',
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
      },
    },
  };
};
