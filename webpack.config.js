const ExtensionReloader = require('webpack-extension-reloader');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const contentScripts = {
  content: './content/index.js'
}
const extensionPages = {
  jquery: './lib/jquery.min.js',
  popup: './popup/index.js',
}

let config = {
  mode: process.env.NODE_ENV,
  context: __dirname + '/src'
};

let ExtensionConfig = Object.assign({}, config, {
  entry: {
    ...contentScripts,
    ...extensionPages
  },
  output: {
    path: __dirname + '/extension/dist/',
    filename: '[name].dist.js',
  },
  plugins: [
    new ExtensionReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: Object.keys(contentScripts),
        extensionPage: Object.keys(extensionPages),
        background: 'background'
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './icons/*',
          to: __dirname + '/extension/dist/',
        },
        {
          from: './popup/index.html',
          to: __dirname + '/extension/dist/popup.html',
        },
        {
          from: './popup/index.css',
          to: __dirname + '/extension/dist/popup.css',
        },
        {
          from: './content/index.css',
          to: __dirname + '/extension/dist/content.css',
        },
      ]
    }),
  ]
});

module.exports = [
  ExtensionConfig,
];
