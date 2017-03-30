System.register(["pixi.js", "../container/container"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var PIXI, PixiGame;
    return {
        setters: [
            function (PIXI_1) {
                PIXI = PIXI_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            PixiGame = (function (_super) {
                __extends(PixiGame, _super);
                // Constructor
                function PixiGame() {
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
                PixiGame.prototype.render = function () {
                    // Render back
                    this.renderer.render(this.backStage);
                    var screenWidth = (window.innerWidth > this.screen.width ? this.screen.width : window.innerWidth);
                    var screenheight = (window.innerHeight > this.screen.height ? this.screen.height : window.innerHeight);
                    // Render middle
                    var world = new PIXI.Matrix();
                    //if (this.renderer.height < this.renderer.width)
                    if (screenheight < screenWidth)
                        world.translate(((screenWidth / 2) / this.stage.scale.x) - (this.stage.width / this.stage.scale.x), ((screenheight / 2) / this.stage.scale.y) - (this.stage.height));
                    world.scale(this.stage.scale.x, this.stage.scale.y);
                    world.rotate(this.stage.rotation);
                    var baseTransform = this.stage.transform;
                    var transform = new PIXI.Transform();
                    transform.setFromMatrix(world);
                    this.stage.transform = transform;
                    this.renderer.render(this.stage, null, false);
                    this.stage.transform = baseTransform;
                    // Render front
                    //this.renderer.render(this.frontStage, null, false);
                };
                // Call to resize
                PixiGame.prototype.resize = function () {
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
                return PixiGame;
            }(PIXI.Application));
            exports_1("default", PixiGame);
        }
    };
});
//# sourceMappingURL=game.js.map