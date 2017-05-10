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
            // Load
            PIXI.loader.baseUrl = "./assets";
            PIXI.loader.add("flowerTop.png");
            PIXI.loader.add("snow.jpg");
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
                container.viewport = new PIXI.Viewport(928, 863);
                _this.stage.addChild(container);
                // Create multiple sprites
                var spineBoy = new PIXI.spine.Spine(res.spineboy.spineData);
                spineBoy.viewport = new PIXI.Viewport(1, 1);
                spineBoy.state.setAnimation(0, "walk", true);
                spineBoy.dock = PIXI.Dock.CENTER_HORIZONTAL | PIXI.Dock.BOTTOM;
                spineBoy.interactive = true;
                container.addChild(spineBoy);
                spineBoy.on("tap", function () {
                    _this.game.performance.run();
                });
                // Greensock
                _this.game.start();
                _this.game.resize();
            });
        };
        return SpineDemo;
    }());
    PIXI.SpineDemo = SpineDemo;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=spine.js.map