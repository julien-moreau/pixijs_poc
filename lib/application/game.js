"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pixi_js_1 = require("pixi.js");
// Import dependencies
require("../container/container.js");
var Game = (function (_super) {
    __extends(Game, _super);
    // Constructor
    function Game() {
        var _this = 
        // Initialize
        _super.call(this, 0, 0, {
            antialias: true,
            autoResize: false,
            backgroundColor: 0x0,
            view: document.getElementById("renderCanvas")
        }, false) || this;
        // Public members
        _this.backStage = new PIXI.Container();
        _this.frontStage = new PIXI.Container();
        // Configure stages
        _this.backStage.name = "backStage";
        _this.stage.name = "stage";
        _this.frontStage.name = "frontStage";
        // Register resize event
        _this.view.addEventListener("resize", function () { return _this.resize(); });
        window.addEventListener("resize", function () { return _this.resize(); });
        _this.resize();
        return _this;
    }
    Game.prototype.render = function () {
        // Render back
        this.renderer.render(this.backStage);
        // Render middle
        var world = new PIXI.Matrix();
        if (this.renderer.height < this.renderer.width)
            world.translate((this.screen.width / 2 / this.stage.scale.x) - (this.stage.width / this.stage.scale.x), this.stage.y);
        world.scale(this.stage.scale.x, this.stage.scale.y);
        world.rotate(this.stage.rotation);
        var baseTransform = this.stage.transform;
        var transform = new PIXI.Transform();
        transform.setFromMatrix(world);
        this.stage.transform = transform;
        this.renderer.render(this.stage, null, false);
        this.stage.transform = baseTransform;
        // Render front
        this.renderer.render(this.frontStage, null, false);
    };
    // Call to resize
    Game.prototype.resize = function () {
        this.renderer.resize(window.innerWidth, window.innerHeight);
        // Update stage width
        this.stage.width = this.renderer.width;
        this.stage.height = this.renderer.height;
        this.backStage.width = this.renderer.width;
        this.backStage.height = this.renderer.height;
        // Set proper scale
        this.stage.scale.set(1, 1);
        this.backStage.scale.set(1, 1);
        if (this.renderer.height < this.renderer.width)
            this.stage.scale.y = this.stage.scale.x = (this.renderer.height / this.renderer.width);
    };
    return Game;
}(pixi_js_1.Application));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Game;
//# sourceMappingURL=game.js.map