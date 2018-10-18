const buildPresets = ({modules = false, debug = false}) => {
  return [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        debug,
        modules,
        targets: {
          browsers: ['chrome >= 59'],
        },
        useBuiltIns: 'usage',
      },
    ],
  ];
};

const buildPlugins = () => {
  return ['@babel/plugin-proposal-object-rest-spread'];
};

module.exports = {
  env: {
    test: {
      plugins: buildPlugins(),
      presets: buildPresets({debug: true, modules: 'commonjs'}),
    },
  },
  plugins: buildPlugins(),
  presets: buildPresets({debug: true, modules: false}),
};
