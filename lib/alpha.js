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
            var loader = new PIXI.loaders.Loader();
            loader.add("./assets/bg.jpg");
            loader.add("./assets/flowerTop.png");
            loader.add("./assets/floor.png");
            loader.add("./assets/sprites.png");
            loader.add("./assets/sprites.json");
            loader.load(function () {
                var cover = PIXI.Sprite.fromFrame("./assets/bg.jpg");
                cover.resize = PIXI.Resize.COVER;
                _this.stage.addChild(cover);
                // Simple
                var flower = PIXI.Sprite.fromFrame("./assets/flowerTop.png");
                flower.x = -100;
                flower.dock = PIXI.Dock.CENTER_ALL;
                flower.interactive = true;
                flower.pivot.set(flower.width / 2, flower.height / 2);
                _this.stage.addChild(flower);
                var mask = PIXI.Sprite.fromFrame("./assets/floor.png");
                mask.pivot.set(mask.width / 2, mask.height / 2);
                flower.addChild(mask);
                flower.mask = mask;
                flower.on("tap", function () {
                    debugger;
                });
                // Spritesheet
                var maskSp = PIXI.Sprite.fromFrame("sp_mask_diamond.png");
                var container = new PIXI.Container();
                container.x = 100;
                container.dock = PIXI.Dock.CENTER_VERTICAL;
                container.dock = PIXI.Dock.CENTER_ALL;
                //container.mask = maskSp;
                container.addChild(maskSp);
                _this.stage.addChild(container);
                for (var i = 0; i < 7; i++) {
                    var diamond = PIXI.Sprite.fromFrame("blue/sp_diamond_blue_0" + i + ".png");
                    diamond.y = -7 * 40 + i * 80;
                    diamond.mask = maskSp;
                    container.addChild(diamond);
                }
                // Update
                var time = 0;
                _this.renderer.on('prerender', function () {
                    mask.rotation = Math.cos(time);
                    flower.rotation = Math.sin(time);
                    time += 0.02;
                    maskSp.y = -250 + 300 * Math.cos(time / 4);
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