const path = require('path');
const loaders = require('./webpack/loaders.js');
const plugins = require('./webpack/plugins.js');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    blog: './source/javascripts/blog.js',
    serviceProviders: './source/javascripts/serviceProviders.js',
    members: './source/javascripts/members.js',
    consent: './source/javascripts/consent.js',
    ga: './source/javascripts/ga.js',
    homepage: './source/stylesheets/homepage.scss',
    application: './source/stylesheets/application.scss',
    doi: './source/stylesheets/doi.scss',
    datacite: './source/stylesheets/datacite.scss',
  },
  module: {
    rules: [
      loaders.JSLoader,
      loaders.ESLintLoader,
      loaders.CSSLoader,
      loaders.FileLoader,
    ]
  },
  plugins: [
    plugins.MiniCssExtractPlugin,
  ],
  output: {
    filename: 'javascripts/[name].js',
    path: path.resolve(__dirname, '.tmp/dist')
  }
};
