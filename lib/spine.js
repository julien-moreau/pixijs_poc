///<reference path="../node_modules/pixi-spine/bin/pixi-spine.d.ts" />
var PIXI;
(function (PIXI) {
    var SpineDemo = (function () {
        // Constructor
        function SpineDemo(game) {
            this.game = game;
            this.stage = game.stage;
            this.renderer = game.renderer;
        }
        SpineDemo.prototype.run = function () {
            var _this = this;
            this.game.clear();
            this.game.resize();
            // Load
            PIXI.loader.baseUrl = "./assets";
            PIXI.loader.add("snow.jpg");
            PIXI.loader.add("frond_03.png");
            PIXI.loader.add("spineboy", "spineboy.json");
            PIXI.loader.load(function (loader, res) {
                var cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = PIXI.Resize.COVER;
                cover.name = "cover";
                _this.stage.addChild(cover);
                // Create contain container
                var container = new PIXI.Container();
                container.resize = PIXI.Resize.CONTAIN;
                container.dock = PIXI.Dock.CENTER_ALL;
                container.viewport = new PIXI.Viewport(1280, 800);
                _this.stage.addChild(container);
                // Create multiple sprites
                var spineBoy = new PIXI.spine.Spine(res.spineboy.spineData);
                spineBoy.viewport = new PIXI.Viewport(1, 1);
                spineBoy.state.setAnimation(0, "walk", true);
                spineBoy.x -= spineBoy.width;
                spineBoy.dock = PIXI.Dock.BOTTOM;
                spineBoy.interactive = true;
                container.addChild(spineBoy);
                spineBoy.on("tap", function () {
                    _this.game.performance.run();
                });
                TweenMax.to(spineBoy, 2, {
                    ease: Power0.easeNone,
                    x: _this.renderer.width / 2,
                    onComplete: function () {
                        spineBoy.state.setAnimation(0, "jump", false).onComplete = function () {
                            TweenMax.to(spineBoy, 4, {
                                ease: Power0.easeNone,
                                x: _this.renderer.width * 2,
                                onComplete: function () { return _this.game.performance.run(); }
                            });
                        };
                        spineBoy.state.addAnimation(0, "walk", true, 0);
                        TweenMax.to(spineBoy, 1, {
                            ease: Power0.easeNone,
                            x: spineBoy.x + 300
                        });
                    }
                });
                // Stip
                var stripContainer = new PIXI.Container();
                stripContainer.dock = PIXI.Dock.CENTER_ALL;
                container.addChild(stripContainer);
                var stripTexture = PIXI.Texture.fromImage("frond_03.png");
                var points = [];
                for (var i = 0; i < 25; i++)
                    points.push(new PIXI.Point(stripTexture.width / 25 * i, 15));
                var strip = new PIXI.mesh.Rope(stripTexture, points);
                strip.name = "strip";
                strip.dock = PIXI.Dock.CENTER_ALL;
                strip.viewport = new PIXI.Viewport(1, 1);
                stripContainer.addChild(strip);
                var time = 0;
                _this.renderer.on("prerender", function () {
                    time += 0.05;
                    for (var i = 0; i < points.length; i++) {
                        points[i].y = Math.sin((i * 0.5) + time) * 30;
                        points[i].x = i * stripTexture.width / 25 + Math.cos((i * 0.3) + time) * 20;
                    }
                    stripTexture.update();
                });
                // Finish
                _this.game.start();
                _this.game.resize();
            });
        };
        return SpineDemo;
    }());
    PIXI.SpineDemo = SpineDemo;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=spine.js.map