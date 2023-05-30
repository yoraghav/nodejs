

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path')

module.exports = {
    entry:'./src/server/index.js',
    mode:'development',
    output:{
        path:path.resolve(__dirname,'webpacked')
    },
    module: {
        rules: [
          { test: /\.css$/, use: 'css-loader' },
          { test: /\.html$/, use: 'html-loader' },
        ],
    },
    plugins: [
		new NodePolyfillPlugin()
	],
    resolve: {
        fallback: {
          "fs": false,"tls": false,'aws-sdk':false,
          "mock-aws-s3": false,'child_process':false,"async_hooks":false,
          "npm": false,"node-gyp": false,'net':false,"nock":false
        } 
      }
}