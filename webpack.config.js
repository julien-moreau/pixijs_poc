/*
{
    entry: "./lib/application/game.js",
    output: {
        filename: "./dist/bundle.js",
        path: "./dist"
    }
}
*/

const webpack = require('webpack');

module.exports = function(env) {
  return {
    entry: './lib/application/game.js',
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },
    externals: {
        'pixi.js': {
            commonjs: 'pixi.js',
            root: 'PIXI'
        }
    }
  };
}