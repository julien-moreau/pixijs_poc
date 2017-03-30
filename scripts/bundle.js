var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('./', './system.config.js');

builder.buildStatic('./lib/pixigame.js.js', './dist/pixigame.js', {
    minify: false,
    sourceMaps: true,
    externals: ['pixi.js']
});
