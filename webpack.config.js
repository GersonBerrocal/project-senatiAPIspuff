const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build/static'),
    filename: '[name][contenthash].js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@media': path.resolve(__dirname, 'src/assets/media/')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/[hash][ext]'
        }
      },
      {
        test: /\.(ttf|woff)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: '../index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          globOptions: {
            ignore: ['**/index.html']
          },
          to: '../'
        }
      ]
    })
  ]
}
