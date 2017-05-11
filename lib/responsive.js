var PIXI;
(function (PIXI) {
    var ResponsiveDemo = (function () {
        // Constructor
        function ResponsiveDemo(game) {
            this.game = game;
            this.renderer = game.renderer;
        }
        ResponsiveDemo.prototype.run = function () {
            var _this = this;
            this.game.clear();
            this.game.resize();
            // Load
            var loader = new PIXI.loaders.Loader("./assets");
            loader.add("floor.png");
            loader.add("reflectivity.png");
            loader.add("snow.jpg");
            loader.add("touhou4dead2.jpg");
            loader.load(function () {
                var cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = PIXI.Resize.COVER;
                cover.name = "cover";
                _this.game.stage.addChild(cover);
                var view = new PIXI.Container();
                view.name = "view";
                view.resize = PIXI.Resize.CONTAIN;
                view.viewport = new PIXI.Viewport(1024, 1024);
                _this.game.stage.addChild(view);
                var back = PIXI.Sprite.fromFrame("touhou4dead2.jpg");
                back.name = "back";
                back.dock = PIXI.Dock.CENTER_ALL;
                back.interactive = true;
                view.addChild(back);
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
                // GUI
                var gui = new dat.GUI();
                var docks = {
                    value: "CONTAIN",
                    values: ["CONTAIN", "FITCONTAIN", "NONE"]
                };
                gui.add(docks, "value", docks.values).name("Dock").onFinishChange(function (result) {
                    view.resize = PIXI.Resize[result];
                });
                // Events
                var next = function () {
                    gui.domElement.remove();
                    _this.game.blur.run();
                };
                back.once("click", next);
                back.once("tap", next);
            });
        };
        return ResponsiveDemo;
    }());
    PIXI.ResponsiveDemo = ResponsiveDemo;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=responsive.js.map