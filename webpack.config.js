const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'tvmaze-common-globals': ['@babel/polyfill', './src/js/tvmaze-common-globals.js'],
  },
  output: {
    path: path.resolve(__dirname, './', 'dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'sass-loader'],
      },
      {
        test: /\.(jpg|JPG|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/images"
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].css' })
  ],
  resolve: {
    alias: {
      '@Styles': path.resolve(__dirname, 'src', 'scss'),
      '@Pages': path.resolve(__dirname, 'src', 'js', 'pages'),
      '@Services': path.resolve(__dirname, 'src', 'js', 'services'),
      '@Helpers': path.resolve(__dirname, 'src', 'js', 'helpers'),
    }
  },
  devServer: {
    port: 3000,
  }
};