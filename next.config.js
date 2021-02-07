const webpack = require("webpack");
const isProd = process.env.NODE_ENV === 'production'
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

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
    staticFolder: '/static',
    cloudinaryCloudName: cloudinaryCloudName,
    cloudinaryUploadPreset: cloudinaryUploadPreset
  }
};
