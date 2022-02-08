const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// In dev mode if env.NODE_ENV is developer //
const devMode = process.env.NODE_ENV === 'development';

const plugins = [
  new webpack.ProvidePlugin({
    React: 'react',
  }),
  // Will implement after refactoring code to React //
  //   new HtmlWebpackPlugin({
  //     template: 'src/index.html',
  //   }),
];

// Enable MiniCss in production only //
if (!devMode) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'scripts/style.css',
    }),
  );
}

module.exports = {
  mode: devMode ? 'development' : 'production',

  entry: './index.js',

  output: {
    filename: 'scripts/index.js',
    path: path.resolve(__dirname, 'public/scripts'),
    clean: true,
  },

  plugins,
  resolve: {
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          //If we're in dev-mode, use inline-styles, else extract to separate css file
          devMode
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
              },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  devServer: {
    hot: true,
    port: 8080,
  },

  devtool: 'cheap-module-source-map',
};
