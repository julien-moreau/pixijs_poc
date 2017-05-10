var PIXI;
(function (PIXI) {
    var ParticlesDemo = (function () {
        // Constructor
        function ParticlesDemo(game) {
            this.game = game;
            this.stage = game.stage;
            this.renderer = game.renderer;
        }
        ParticlesDemo.prototype.run = function () {
            var _this = this;
            this.game.clear();
            this.game.resize();
            // Load
            var loader = new PIXI.loaders.Loader("./assets");
            loader.add("eggHead.png");
            loader.add("blue.jpg");
            loader.load(function () {
                var cover = PIXI.Sprite.fromFrame("blue.jpg");
                cover.resize = PIXI.Resize.COVER;
                cover.name = "cover";
                _this.stage.addChild(cover);
                // Create multiple sprites
                var sprites = [];
                var count = 1000;
                var view = new PIXI.Container();
                view.resize = PIXI.Resize.CONTAIN;
                view.dock = PIXI.Dock.CENTER_ALL;
                view.viewport = new PIXI.Viewport(1280, 800);
                _this.stage.addChild(view);
                var particle = new PIXI.particles.ParticleContainer(count, {
                    scale: true,
                    position: true,
                    rotation: true,
                    uvs: true,
                    alpha: true
                });
                view.addChild(particle);
                for (var i = 0; i < count; i++) {
                    var sprite = PIXI.Sprite.fromImage("eggHead.png");
                    sprite.x = 1280 * Math.random();
                    sprite.y = 800 * Math.random();
                    sprite.anchor.set(0.5, 0.5);
                    sprites.push(sprite);
                    particle.addChild(sprite);
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
        return ParticlesDemo;
    }());
    PIXI.ParticlesDemo = ParticlesDemo;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=particles.js.map