System.config({
    defaultJSExtensions: true,
    baseURL:"./",
    map:{
        "pixi.js": "./node_modules/pixi.js/dist/pixi.js"
    },
    meta: {
        "./node_modules/pixi.js/dist/pixi.js": {
            format: "global"
        }
    }
});