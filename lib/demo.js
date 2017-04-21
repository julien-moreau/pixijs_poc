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
            loader.load(function () {
                var cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = PIXI.Resize.COVER;
                cover.dock = PIXI.Dock.CENTER_ALL;
                cover.name = "cover";
                _this.stage.addChild(cover);
                var back = PIXI.Sprite.fromFrame("floor.png");
                back.dock = PIXI.Dock.CENTER_ALL;
                back.name = "back";
                _this.stage.addChild(back);
                var child = PIXI.Sprite.fromFrame("reflectivity.png");
                child.dock = PIXI.Dock.CENTER_ALL;
                child.name = "child";
                back.addChild(child);
                _this.start();
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