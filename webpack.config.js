const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const commons = [
  /node_modules/,
  /store\.js$/
];

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    sub: './src/sub.js',
  },
  output: {
    path: path.resolve('./dist'), // 出力先のパス
    filename: '[name].bundle.js' // 出力先のファイル名
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }  
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        common: {
          test: function(module) {
            return commons.reduce((memo, pattern) => memo || pattern.test(module.resource), false);
          },
          name: 'common',
          chunks: 'initial',
        }
      }
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
