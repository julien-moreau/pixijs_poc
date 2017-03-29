"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var game_js_1 = require("../lib/application/game.js");
var dockState_js_1 = require("../lib/container/dockState.js");
var resizeType_js_1 = require("../lib/container/resizeType.js");
var Main = (function () {
    function Main() {
    }
    /**
     * Static members
     */
    Main.Run = function () {
        var game = new game_js_1.default();
        var loader = new PIXI.loaders.Loader("./assets");
        loader.add("floor.png");
        loader.add("reflectivity.png");
        loader.add("snow.jpg");
        loader.load(function () {
            var cover = PIXI.Sprite.fromFrame("snow.jpg");
            cover.resizeType = resizeType_js_1.ResizeType.COVER;
            cover.dockState = dockState_js_1.DockState.CENTER_ALL;
            cover.name = "cover";
            game.backStage.addChild(cover);
            var back = PIXI.Sprite.fromFrame("floor.png");
            back.dockState = dockState_js_1.DockState.CENTER_ALL;
            back.name = "back";
            game.stage.addChild(back);
            var child = PIXI.Sprite.fromFrame("reflectivity.png");
            child.dockState = dockState_js_1.DockState.CENTER_ALL;
            child.name = "child";
            back.addChild(child);
            game.start();
        });
        window["game"] = game;
    };
    return Main;
}());
exports.Main = Main;
//# sourceMappingURL=main.js.map