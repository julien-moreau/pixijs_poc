var PIXI;
(function (PIXI) {
    var PerformanceDemo = (function () {
        // Constructor
        function PerformanceDemo(game) {
            this.game = game;
            this.stage = game.stage;
            this.renderer = game.renderer;
        }
        PerformanceDemo.prototype.run = function () {
            var _this = this;
            this.game.clear();
            // Load
            var loader = new PIXI.loaders.Loader("./assets");
            loader.add("flowerTop.png");
            loader.add("snow.jpg");
            loader.load(function () {
                var cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = PIXI.Resize.COVER;
                cover.name = "cover";
                _this.stage.addChild(cover);
                // Create multiple sprites
                var sprites = [];
                var count = 500;
                for (var i = 0; i < count; i++) {
                    var sprite = PIXI.Sprite.fromImage("flowerTop.png");
                    sprite.x = _this.renderer.width * Math.random();
                    sprite.y = _this.renderer.height * Math.random();
                    sprite.pivot.x = sprite.width / 2;
                    sprite.pivot.y = sprite.height / 2;
                    _this.stage.addChild(sprite);
                    sprites.push(sprite);
                }
                var time = 0;
                var inverse = 1.0;
                _this.renderer.on('prerender', function () {
                    for (var i = 0; i < count; i++) {
                        time += 0.0001 * Math.random();
                        sprites[i].rotation = Math.tan(time);
                        inverse *= -1;
                    }
                });
                _this.game.start();
                _this.game.resize();
            });
        };
        return PerformanceDemo;
    }());
    PIXI.PerformanceDemo = PerformanceDemo;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=performance.js.map