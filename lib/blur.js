var PIXI;
(function (PIXI) {
    var BlurDemo = (function () {
        // Constructor
        function BlurDemo(game) {
            this.game = game;
            this.renderer = game.renderer;
        }
        BlurDemo.prototype.run = function () {
            var _this = this;
            this.game.clear();
            // Load
            var loader = new PIXI.loaders.Loader("./assets");
            loader.add("snow.jpg");
            loader.add("flowerTop.png");
            loader.load(function () {
                var cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = PIXI.Resize.COVER;
                _this.game.stage.addChild(cover);
                var flower = PIXI.Sprite.fromFrame("flowerTop.png");
                flower.dock = PIXI.Dock.CENTER_ALL;
                flower.interactive = true;
                _this.game.stage.addChild(flower);
                flower.on("tap", function () { return _this.game.alpha.run(); });
                flower.on("click", function () { return _this.game.alpha.run(); });
                var blurFilter1 = new PIXI.filters.BlurFilter();
                var blurFilter2 = new PIXI.filters.BlurFilter();
                cover.filters = [blurFilter1];
                flower.filters = [blurFilter2];
                var time = 0;
                _this.renderer.on('prerender', function () {
                    blurFilter1.blurX = Math.max(5 * Math.cos(time), 0);
                    blurFilter1.blurY = Math.max(5 * Math.cos(time), 0);
                    blurFilter2.blurX = Math.max(5 * Math.sin(time), 0);
                    blurFilter2.blurY = Math.max(5 * Math.sin(time), 0);
                    time += 0.02;
                });
                _this.game.start();
                _this.game.resize();
            });
        };
        return BlurDemo;
    }());
    PIXI.BlurDemo = BlurDemo;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=blur.js.map