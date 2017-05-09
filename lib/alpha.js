var PIXI;
(function (PIXI) {
    var AlphaDemo = (function () {
        // Constructor
        function AlphaDemo(game) {
            this.game = game;
            this.stage = game.stage;
            this.renderer = game.renderer;
        }
        AlphaDemo.prototype.run = function () {
            var _this = this;
            this.game.clear();
            // Load
            var loader = new PIXI.loaders.Loader("./assets");
            loader.add("snow.jpg");
            loader.add("flowerTop.png");
            loader.add("floor.png");
            loader.load(function () {
                var cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = PIXI.Resize.COVER;
                _this.stage.addChild(cover);
                var flower = PIXI.Sprite.fromFrame("flowerTop.png");
                flower.dock = PIXI.Dock.CENTER_ALL;
                flower.interactive = true;
                flower.pivot.set(flower.width / 2, flower.height / 2);
                _this.stage.addChild(flower);
                var mask = PIXI.Sprite.fromFrame("floor.png");
                mask.pivot.set(mask.width / 2, mask.height / 2);
                flower.addChild(mask);
                flower.mask = mask;
                flower.on("tap", function () {
                    debugger;
                });
                var time = 0;
                _this.renderer.on('prerender', function () {
                    mask.rotation = Math.cos(time);
                    flower.rotation = Math.sin(time);
                    time += 0.02;
                });
                _this.game.start();
                _this.game.resize();
            });
        };
        return AlphaDemo;
    }());
    PIXI.AlphaDemo = AlphaDemo;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=alpha.js.map