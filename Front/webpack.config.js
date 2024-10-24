const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'serve-static': false,  // Ignore 'serve-static'
    },
    fallback: {
      "fs": false,  // Disable 'fs' because it's not needed in browser environments
      "path": require.resolve("path-browserify"),  // Polyfill 'path'
      "crypto": require.resolve("crypto-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "net": false,  // Disable 'net'
      "url": require.resolve("url/"),
      "util": require.resolve("util/"),
      "buffer": require.resolve("buffer/"),
    },
  },
  // Additional configurations (entry, output, etc.)
};
