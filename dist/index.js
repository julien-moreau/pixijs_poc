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
System.register("container/dockState", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DockState;
    return {
        setters: [],
        execute: function () {
            (function (DockState) {
                DockState[DockState["LEFT"] = 1] = "LEFT";
                DockState[DockState["RIGHT"] = 2] = "RIGHT";
                DockState[DockState["TOP"] = 4] = "TOP";
                DockState[DockState["BOTTOM"] = 8] = "BOTTOM";
                DockState[DockState["CENTER_HORIZONTAL"] = 16] = "CENTER_HORIZONTAL";
                DockState[DockState["CENTER_VERTICAL"] = 32] = "CENTER_VERTICAL";
                DockState[DockState["CENTER_ALL"] = 48] = "CENTER_ALL";
            })(DockState || (DockState = {}));
            exports_1("DockState", DockState);
        }
    };
});
System.register("container/resizeType", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var ResizeType;
    return {
        setters: [],
        execute: function () {
            (function (ResizeType) {
                ResizeType[ResizeType["CONTAIN"] = 0] = "CONTAIN";
                ResizeType[ResizeType["COVER"] = 1] = "COVER";
            })(ResizeType || (ResizeType = {}));
            exports_2("ResizeType", ResizeType);
        }
    };
});
System.register("container/container", ["pixi.js", "container/dockState", "container/resizeType"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var pixi_js_1, dockState_1, resizeType_1, PIXI;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (dockState_1_1) {
                dockState_1 = dockState_1_1;
            },
            function (resizeType_1_1) {
                resizeType_1 = resizeType_1_1;
            }
        ],
        execute: function () {
            (function (PIXI) {
                // Update transform
                var updateTransformFunc = pixi_js_1.Container.prototype.updateTransform;
                pixi_js_1.Container.prototype.updateTransform = function () {
                    var lastPosition = new pixi_js_1.Point(this.x, this.y);
                    var lastScale = new pixi_js_1.Point(this.scale.x, this.scale.y);
                    var parentWidth = (this.parent._width || this.parent.getBounds.call(this, true).width);
                    var parentHeight = (this.parent._height || this.parent.getBounds.call(this, true).height);
                    if (!parentWidth)
                        parentWidth = 0;
                    if (!parentHeight)
                        parentHeight = 0;
                    // Resize
                    if (this.resizeType === resizeType_1.ResizeType.COVER) {
                        var parentMax = Math.max(parentWidth, parentHeight);
                        var thisMax = Math.max(this.width, this.height);
                        var k = parentMax / thisMax;
                        this.scale.set(k, k);
                        if (parentWidth < parentHeight) {
                            this.scale.y = parentHeight / this.height;
                        }
                    }
                    // Dock state
                    if (this.dockState) {
                        // X
                        if (this.dockState & dockState_1.DockState.CENTER_HORIZONTAL) {
                            this.x = parentWidth / 2 - this.width / 2 + this.x;
                        }
                        else if (this.dockState & dockState_1.DockState.RIGHT) {
                            this.x = parentWidth - this.x;
                        }
                        // Y
                        if (this.dockState & dockState_1.DockState.CENTER_VERTICAL) {
                            this.y = parentHeight / 2 - this.height / 2 + this.y;
                        }
                        else if (this.dockState & dockState_1.DockState.BOTTOM) {
                            this.y = parentHeight - this.y;
                        }
                    }
                    updateTransformFunc.call(this);
                    this.x = lastPosition.x;
                    this.y = lastPosition.y;
                    this.scale.set(lastScale.x, lastScale.y);
                };
            })(PIXI || (PIXI = {}));
        }
    };
});
System.register("application/game", ["pixi.js", "container/container"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
            exports_4("default", PixiGame);
        }
    };
});
System.register("container/viewport-container", ["pixi.js"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var PIXI, ViewPortContainer;
    return {
        setters: [
            function (PIXI_2) {
                PIXI = PIXI_2;
            }
        ],
        execute: function () {
            ViewPortContainer = (function (_super) {
                __extends(ViewPortContainer, _super);
                function ViewPortContainer() {
                    return _super.call(this) || this;
                }
                ViewPortContainer.prototype.updateTransform = function () {
                    this['_width'] = this.parent['_width'];
                    this['_height'] = this.parent['_height'];
                    _super.prototype.updateTransform.call(this);
                };
                return ViewPortContainer;
            }(PIXI.Container));
            exports_5("default", ViewPortContainer);
        }
    };
});
System.register("pixigame.js", ["application/game", "container/resizeType", "container/dockState", "container/viewport-container"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var game_1, resizeType_2, dockState_2, viewport_container_1;
    return {
        setters: [
            function (game_1_1) {
                game_1 = game_1_1;
            },
            function (resizeType_2_1) {
                resizeType_2 = resizeType_2_1;
            },
            function (dockState_2_1) {
                dockState_2 = dockState_2_1;
            },
            function (viewport_container_1_1) {
                viewport_container_1 = viewport_container_1_1;
            }
        ],
        execute: function () {
            exports_6("PixiGame", game_1.default);
            exports_6("ResizeType", resizeType_2.ResizeType);
            exports_6("DockState", dockState_2.DockState);
            exports_6("ViewPortContainer", viewport_container_1.default);
        }
    };
});
//# sourceMappingURL=index.js.map