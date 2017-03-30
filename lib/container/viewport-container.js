System.register(["pixi.js"], function (exports_1, context_1) {
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
    var PIXI, ViewPortContainer;
    return {
        setters: [
            function (PIXI_1) {
                PIXI = PIXI_1;
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
            exports_1("default", ViewPortContainer);
        }
    };
});
//# sourceMappingURL=viewport-container.js.map