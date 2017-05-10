var PIXI;
(function (PIXI) {
    var FullscreenDemo = (function () {
        // Constructor
        function FullscreenDemo(game) {
            this.game = game;
            this.stage = game.stage;
            this.renderer = game.renderer;
        }
        FullscreenDemo.prototype.run = function () {
            var _this = this;
            this.game.clear();
            this.game.resize();
            // Load
            var loader = new PIXI.loaders.Loader("./assets");
            loader.add("snow.jpg");
            loader.load(function () {
                var cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = PIXI.Resize.COVER;
                cover.name = "cover";
                _this.stage.addChild(cover);
                _this.game.start();
            });
        };
        return FullscreenDemo;
    }());
    PIXI.FullscreenDemo = FullscreenDemo;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=fullscreen.js.map