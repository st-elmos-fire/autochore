const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const pathsPlugin = new TsconfigPathsPlugin({
  configFile: path.resolve(__dirname, '../tsconfig.json')
});

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../components/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
    'storybook-dark-mode'
  ],
  staticDirs: [
    { from: '../public', to: '/public' },
    { from: '../lib/mocks', to: '/mocks' }
  ],
  features: {
    postcss: false
  },
  webpackFinal: async (config) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(pathsPlugin);
    } else {
      config.resolve.plugins = [pathsPlugin];
    }
    config.module.rules.push(
      {
        test: /\.md$/,
        use: [
          {
            loader: 'markdown-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/assets/',
              publicPath: 'static/assets/'
            }
          }
        ]
      },
      {
        test: /\.module.scss|scss$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? require.resolve('style-loader')
            : MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: 'c-[hash:base64:5]__[folder]--[local]'
              }
            }
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
              sourceMap: false,
              additionalData: `
                @use '/theme/vars' as *;
                @use '/theme/breakpoints' as *;
                @use '/theme/utilities' as utils;
              `,
              sassOptions: {
                outputStyle:
                  process.env.NODE_ENV !== 'production'
                    ? 'expanded'
                    : 'compressed',
                indentWidth: 4
              }
            }
          }
        ],
        include: path.resolve(__dirname, '../')
      }
    );
    config.resolve.extensions.push('.ts', '.tsx', '.md');
    return config;
  }
};
