const webpack = require("webpack");
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  distDir: 'dist',
  target: 'serverless',
  webpack: config => {
    return config;
  },
  publicRuntimeConfig: {
    // Use the CDN in production and localhost for development.
    assetPrefix: isProd ? 'https://roommates-match.netlify.app/' : '',    
    lokiDatabase: '/tmp/loki-v10.db',
    staticFolder: '/static'
  }
};
