"use strict";
var pixi_js_1 = require("pixi.js");
var dockState_js_1 = require("./dockState.js");
var resizeType_js_1 = require("./resizeType.js");
var PIXI;
(function (PIXI) {
    // Update transform
    var updateTransformFunc = pixi_js_1.Container.prototype.updateTransform;
    pixi_js_1.Container.prototype.updateTransform = function () {
        var lastPosition = new pixi_js_1.Point(this.x, this.y);
        var lastScale = new pixi_js_1.Point(this.scale.x, this.scale.y);
        var parentWidth = (this.parent._width || this.parent.width);
        var parentHeight = (this.parent._height || this.parent.height);
        // Resize
        if (this.resizeType === resizeType_js_1.ResizeType.COVER) {
            var parentMax = Math.max(parentWidth, parentHeight);
            var thisMax = Math.max(this.width, this.height);
            var k = parentMax / thisMax;
            this.scale.set(k, k);
        }
        // Dock state
        if (this.dockState) {
            // X
            if (this.dockState & dockState_js_1.DockState.CENTER_HORIZONTAL) {
                this.x = parentWidth / 2 - this.width / 2 + this.x;
            }
            else if (this.dockState & dockState_js_1.DockState.RIGHT) {
                this.x = parentWidth - this.x;
            }
            // Y
            if (this.dockState & dockState_js_1.DockState.CENTER_VERTICAL) {
                this.y = parentHeight / 2 - this.height / 2 + this.y;
            }
            else if (this.dockState & dockState_js_1.DockState.BOTTOM) {
                this.y = parentHeight - this.y;
            }
        }
        updateTransformFunc.apply(this);
        this.x = lastPosition.x;
        this.y = lastPosition.y;
        this.scale.set(lastScale.x, lastScale.y);
    };
})(PIXI || (PIXI = {}));
//# sourceMappingURL=container.js.map