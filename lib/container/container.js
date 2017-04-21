var PIXI;
(function (PIXI) {
    // Update transform
    var updateTransformFunc = PIXI.Container.prototype.updateTransform;
    PIXI.Container.prototype.updateTransform = function () {
        if (!this.parent.calculateBounds)
            return;
        var x = this.transform.position.x;
        var y = this.transform.position.y;
        var sx = this.transform.scale.x;
        var sy = this.transform.scale.y;
        var parentBounds = this.parent.getBounds(true);
        var thisBounds = this.getBounds(true);
        if (this.parent._width)
            parentBounds.width = this.parent._width;
        if (this.parent._height)
            parentBounds.height = this.parent._height;
        if (this.resize) {
            if (this.resize === PIXI.Resize.COVER) {
                var ratio = Math.max(parentBounds.width / thisBounds.width, parentBounds.height / thisBounds.height);
                if (!isNaN(ratio))
                    this.transform.scale.set(ratio, ratio);
            }
        }
        if (this.dock) {
            if (this.dock & PIXI.Dock.CENTER_HORIZONTAL) {
                this.transform.position.x = (parentBounds.width / 2) - (thisBounds.width / 2) + this.x;
            }
            else if (this.dock & PIXI.Dock.RIGHT) {
                this.transform.position.x = parentBounds.width - this.x;
            }
            if (this.dock & PIXI.Dock.CENTER_VERTICAL) {
                this.transform.position.y = (parentBounds.height / 2) - (thisBounds.height / 2) + this.y;
            }
            else if (this.dock & PIXI.Dock.BOTTOM) {
                this.transform.position.y = parentBounds.height - this.y;
            }
        }
        updateTransformFunc.call(this);
        this.transform.position.x = x;
        this.transform.position.y = y;
        this.transform.scale.x = sx;
        this.transform.scale.y = sy;
    };
})(PIXI || (PIXI = {}));
//# sourceMappingURL=container.js.map