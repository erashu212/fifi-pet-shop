var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var chalk = require('chalk');
var autoprefixer = require('autoprefixer');

var helpers = require('./helpers');

var METADATA = {
  title: 'Fifi Pet Shop',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

if (METADATA.isDevServer) {
  METADATA.apiServer = 'https://fifi-pet-shop-api.herokuapp.com';
} else {
  METADATA.apiServer = '';
}

module.exports = {
  metadata: METADATA,
  postcss: [ autoprefixer ],
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: [ '', '.ts', '.js' ]
  },

  module: {
    loaders: [
      { test: /.js$/, loader: 'imports?define=>false' },
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [ helpers.root('src/index.html') ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [ 'raw-loader', 'sass-loader?sourceMap' ]
      },
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'file-loader' },
      // Bootstrap 4
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: [ 'app', 'vendor', 'polyfills' ]
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),

    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      "Tether": 'tether',
      "window.Tether": "tether",
      Tether: "tether",
      "window.Tether": "tether",
      Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
      Alert: "exports?Alert!bootstrap/js/dist/alert",
      Button: "exports?Button!bootstrap/js/dist/button",
      Carousel: "exports?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports?Modal!bootstrap/js/dist/modal",
      Popover: "exports?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports?Util!bootstrap/js/dist/util",
    }),

    new ProgressBarPlugin({
      format: '  build ' + chalk.blue.bold(':bar') + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'CORS': JSON.stringify(process.env.CORS) || JSON.stringify("erashu212"),
        'process.env.VERSION': JSON.stringify(process.env.WB_VERSION) || JSON.stringify("1.0.0")
      }
    })
  ],
  node: { global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false }
};