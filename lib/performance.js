var PIXI;
(function (PIXI) {
    var PerformanceDemo = (function () {
        // Constructor
        function PerformanceDemo(game) {
            this.game = game;
            this.renderer = game.renderer;
        }
        PerformanceDemo.prototype.run = function () {
            var _this = this;
            this.game.clear();
            this.game.resize();
            // Load
            var loader = new PIXI.loaders.Loader("./assets");
            loader.add("flowerTop.png");
            loader.add("snow.jpg");
            loader.load(function () {
                var cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = PIXI.Resize.COVER;
                cover.name = "cover";
                _this.game.stage.addChild(cover);
                // Create view
                var view = new PIXI.Container();
                view.resize = PIXI.Resize.CONTAIN;
                view.dock = PIXI.Dock.CENTER_ALL;
                view.viewport = new PIXI.Viewport(1280, 800);
                _this.game.stage.addChild(view);
                // Create multiple sprites
                var sprites = [];
                var count = 200;
                for (var i = 0; i < count; i++) {
                    var sprite = PIXI.Sprite.fromImage("flowerTop.png");
                    sprite.x = 1280 * Math.random();
                    sprite.y = 800 * Math.random();
                    sprite.pivot.x = sprite.width / 2;
                    sprite.pivot.y = sprite.height / 2;
                    sprite.interactive = true;
                    sprite.on("tap", function () { return _this.game.particlesDemo.run(); });
                    sprite.on("click", function () { return _this.game.particlesDemo.run(); });
                    view.addChild(sprite);
                    sprites.push(sprite);
                }
                var time = 0;
                _this.renderer.on('prerender', function () {
                    time += 0.05 * Math.random();
                    var inverse = 1.0;
                    for (var i = 0; i < count; i++) {
                        sprites[i].rotation = Math.tan(time) * inverse;
                        inverse *= -1;
                    }
                });
                _this.game.start();
            });
        };
        return PerformanceDemo;
    }());
    PIXI.PerformanceDemo = PerformanceDemo;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=performance.js.map