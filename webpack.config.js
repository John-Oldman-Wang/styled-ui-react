const path = require('path');
const cwdDir = process.cwd();
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: path.resolve(cwdDir, './packages/material-ui/test/index.js'),
  output: {
    path: path.resolve(cwdDir, './dist'),
    publicPath: '/',
    filename: '[name]-[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(cwdDir, './packages/material-ui/test/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  mode: 'development',
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    compress: true,
    contentBase: [path.resolve(cwdDir, 'dist'), path.resolve(cwdDir)],
    historyApiFallback: true
  }
};
