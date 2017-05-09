var PIXI;
(function (PIXI) {
    var ResponsiveDemo = (function () {
        // Constructor
        function ResponsiveDemo(game) {
            this.game = game;
            this.stage = game.stage;
            this.renderer = game.renderer;
        }
        ResponsiveDemo.prototype.run = function () {
            var _this = this;
            this.game.clear();
            // Load
            var loader = new PIXI.loaders.Loader("./assets");
            loader.add("floor.png");
            loader.add("reflectivity.png");
            loader.add("snow.jpg");
            loader.add("bg1.jpg");
            loader.load(function () {
                var cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = PIXI.Resize.COVER;
                cover.name = "cover";
                _this.stage.addChild(cover);
                var view = new PIXI.Container();
                view.name = "view";
                view.dock = PIXI.Dock.CENTER_ALL;
                view.resize = PIXI.Resize.CONTAIN;
                view.viewport = new PIXI.Viewport(1024, 768);
                _this.stage.addChild(view);
                var back = PIXI.Sprite.fromFrame("bg1.jpg");
                back.name = "back";
                back.interactive = true;
                view.addChild(back);
                back.once("tap", function () {
                    _this.game.blur.run();
                });
                var child = PIXI.Sprite.fromFrame("reflectivity.png");
                child.dock = PIXI.Dock.BOTTOM;
                child.name = "child";
                view.addChild(child);
                var container = new PIXI.Container();
                container.name = "container";
                container.dock = PIXI.Dock.RIGHT | PIXI.Dock.CENTER_VERTICAL;
                container.scale.set(0.3, 0.3);
                container.x = 50;
                view.addChild(container);
                var spriteContainer1 = PIXI.Sprite.fromFrame("floor.png");
                container.addChild(spriteContainer1);
                container.pivot.x = spriteContainer1.width / 2;
                container.pivot.y = spriteContainer1.height / 2;
                var time = 0;
                _this.renderer.on('prerender', function () {
                    child.rotation += 0.1;
                    container.x = 400 * Math.cos(time * 4);
                    container.y = 400 * Math.sin(time * 4);
                    container.rotation = time;
                    time += 0.01;
                });
                _this.game.start();
                _this.game.resize();
            });
        };
        return ResponsiveDemo;
    }());
    PIXI.ResponsiveDemo = ResponsiveDemo;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=responsive.js.map