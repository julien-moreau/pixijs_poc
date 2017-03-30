!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], ["3"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("2", ["3", "4", "5"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, dockState_1, resizeType_1, PIXI;
    return {
        setters: [function (pixi_js_1_1) {
            pixi_js_1 = pixi_js_1_1;
        }, function (dockState_1_1) {
            dockState_1 = dockState_1_1;
        }, function (resizeType_1_1) {
            resizeType_1 = resizeType_1_1;
        }],
        execute: function () {
            (function (PIXI) {
                // Update transform
                var updateTransformFunc = pixi_js_1.Container.prototype.updateTransform;
                pixi_js_1.Container.prototype.updateTransform = function () {
                    var lastPosition = new pixi_js_1.Point(this.x, this.y);
                    var lastScale = new pixi_js_1.Point(this.scale.x, this.scale.y);
                    var parentWidth = this.parent._width || this.parent.getBounds.call(this, true).width;
                    var parentHeight = this.parent._height || this.parent.getBounds.call(this, true).height;
                    if (!parentWidth) parentWidth = 0;
                    if (!parentHeight) parentHeight = 0;
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
                        } else if (this.dockState & dockState_1.DockState.RIGHT) {
                            this.x = parentWidth - this.x;
                        }
                        // Y
                        if (this.dockState & dockState_1.DockState.CENTER_VERTICAL) {
                            this.y = parentHeight / 2 - this.height / 2 + this.y;
                        } else if (this.dockState & dockState_1.DockState.BOTTOM) {
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

$__System.register("6", ["3", "2"], function (exports_1, context_1) {
    "use strict";

    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __moduleName = context_1 && context_1.id;
    var PIXI, PixiGame;
    return {
        setters: [function (PIXI_1) {
            PIXI = PIXI_1;
        }, function (_1) {}],
        execute: function () {
            PixiGame = function (_super) {
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
                    _this.view.addEventListener("resize", function () {
                        return _this.resize();
                    });
                    window.addEventListener("resize", function () {
                        return _this.resize();
                    });
                    _this.resize();
                    return _this;
                }
                PixiGame.prototype.render = function () {
                    // Render back
                    this.renderer.render(this.backStage);
                    var screenWidth = window.innerWidth > this.screen.width ? this.screen.width : window.innerWidth;
                    var screenheight = window.innerHeight > this.screen.height ? this.screen.height : window.innerHeight;
                    // Render middle
                    var world = new PIXI.Matrix();
                    //if (this.renderer.height < this.renderer.width)
                    if (screenheight < screenWidth) world.translate(screenWidth / 2 / this.stage.scale.x - this.stage.width / this.stage.scale.x, screenheight / 2 / this.stage.scale.y - this.stage.height);
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
                    if (this.renderer.height < this.renderer.width) this.stage.scale.y = this.stage.scale.x = this.renderer.height / this.renderer.width;
                };
                return PixiGame;
            }(PIXI.Application);
            exports_1("default", PixiGame);
        }
    };
});

$__System.register("5", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var ResizeType;
    return {
        setters: [],
        execute: function () {
            (function (ResizeType) {
                ResizeType[ResizeType["CONTAIN"] = 0] = "CONTAIN";
                ResizeType[ResizeType["COVER"] = 1] = "COVER";
            })(ResizeType || (ResizeType = {}));
            exports_1("ResizeType", ResizeType);
        }
    };
});

$__System.register("4", [], function (exports_1, context_1) {
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

$__System.register("7", ["3"], function (exports_1, context_1) {
    "use strict";

    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __moduleName = context_1 && context_1.id;
    var PIXI, ViewPortContainer;
    return {
        setters: [function (PIXI_1) {
            PIXI = PIXI_1;
        }],
        execute: function () {
            ViewPortContainer = function (_super) {
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
            }(PIXI.Container);
            exports_1("default", ViewPortContainer);
        }
    };
});

$__System.register("1", ["6", "5", "4", "7"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var game_1, resizeType_1, dockState_1, viewport_container_1;
    return {
        setters: [function (game_1_1) {
            game_1 = game_1_1;
        }, function (resizeType_1_1) {
            resizeType_1 = resizeType_1_1;
        }, function (dockState_1_1) {
            dockState_1 = dockState_1_1;
        }, function (viewport_container_1_1) {
            viewport_container_1 = viewport_container_1_1;
        }],
        execute: function () {
            exports_1("PixiGame", game_1.default);
            exports_1("ResizeType", resizeType_1.ResizeType);
            exports_1("DockState", dockState_1.DockState);
            exports_1("ViewPortContainer", viewport_container_1.default);
        }
    };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["pixi.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("pixi.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pixigame.js.map