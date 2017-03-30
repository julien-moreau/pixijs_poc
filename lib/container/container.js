System.register(["pixi.js", "./dockState", "./resizeType"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
//# sourceMappingURL=container.js.map