var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PIXI;
(function (PIXI) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(options, noWebGL, useSharedTicket) {
            var _this = _super.call(this, 0, 0, {
                antialias: true,
                autoResize: true,
                backgroundColor: 0x0,
                view: options.view || document.getElementById("renderCanvas")
            }, noWebGL, useSharedTicket) || this;
            _this.stage.name = "stage";
            window.addEventListener("resize", function () { return _this.resize(); });
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
                _this.start();
                _this.resize();
            });
            return _this;
        }
        Game.prototype.resize = function () {
            this.renderer.resize(window.innerWidth, window.innerHeight);
            this.stage.width = this.renderer.width;
            this.stage.height = this.renderer.height;
            this.stage.scale.set(1, 1);
        };
        return Game;
    }(PIXI.Application));
    PIXI.Game = Game;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=demo.js.map