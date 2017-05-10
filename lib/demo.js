var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PIXI;
(function (PIXI) {
    var Game = (function (_super) {
        __extends(Game, _super);
        // Constructor
        function Game(options, noWebGL, useSharedTicket) {
            var _this = _super.call(this, 0, 0, {
                antialias: true,
                autoResize: true,
                backgroundColor: 0x0,
                view: options.view || document.getElementById("renderCanvas")
            }, noWebGL, useSharedTicket) || this;
            _this.stage.name = "stage";
            window.addEventListener("resize", function () { return _this.resize(); });
            // Demos
            _this.responsive = new PIXI.ResponsiveDemo(_this);
            _this.blur = new PIXI.BlurDemo(_this);
            _this.alpha = new PIXI.AlphaDemo(_this);
            _this.spine = new PIXI.SpineDemo(_this);
            _this.performance = new PIXI.PerformanceDemo(_this);
            _this.particlesDemo = new PIXI.ParticlesDemo(_this);
            _this.fullscreenDemo = new PIXI.FullscreenDemo(_this);
            // Run
            _this.fullscreenDemo.run();
            return _this;
        }
        // Resizes the stage
        Game.prototype.resize = function () {
            this.renderer.resize(window.innerWidth, window.innerHeight);
            this.stage.width = this.renderer.width;
            this.stage.height = this.renderer.height;
            this.stage.scale.set(1, 1);
        };
        // Clears the stage
        Game.prototype.clear = function () {
            var _this = this;
            this.stop();
            this.stage.children.forEach(function (c) { return _this.stage.removeChild(c); });
        };
        return Game;
    }(PIXI.Application));
    PIXI.Game = Game;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=demo.js.map