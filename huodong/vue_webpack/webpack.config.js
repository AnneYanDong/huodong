const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'), // 建议绝对路径
    publicPath: '/static/'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                use: 'css-loader'
              }),
              less: ExtractTextPlugin.extract({
                use: ['css-loader', 'less-loader']
              })
            }
          }
        }
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'less-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: 'images/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: "fonts/[name].[hash:7].[ext]"
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: 'css/style.css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html'
      // template: 'index.html'
    }),
    new FriendlyErrorWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}