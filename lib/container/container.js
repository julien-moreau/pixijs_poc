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
        if (this.parent._width)
            parentBounds.width = this.parent._width;
        if (this.parent._height)
            parentBounds.height = this.parent._height;
        var transform = new PIXI.Transform();
        transform.setFromMatrix(this.worldTransform);
        if (this.resize) {
            if (this.resize === PIXI.Resize.COVER) {
                var ratio = Math.max(parentBounds.width / this.width, parentBounds.height / this.height);
                if (!isNaN(ratio))
                    this.transform.scale.set(ratio, ratio);
            }
            else if (this.resize === PIXI.Resize.CONTAIN) {
                var ratio = Math.min(parentBounds.width / (this.width / transform.scale.x), parentBounds.height / (this.height / transform.scale.y));
                if (!isNaN(ratio))
                    this.transform.scale.set(ratio, ratio);
            }
        }
        if (this.dock && this.resize !== PIXI.Resize.COVER) {
            if (this.dock & PIXI.Dock.CENTER_HORIZONTAL) {
                this.transform.position.x = (parentBounds.width / 2) - (this.width / transform.scale.x / 2) + this.x;
            }
            else if (this.dock & PIXI.Dock.RIGHT) {
                this.transform.position.x = parentBounds.width - this.width * transform.scale.x - this.x;
            }
            if (this.dock & PIXI.Dock.CENTER_VERTICAL) {
                this.transform.position.y = (parentBounds.height / 2) - (this.height / transform.scale.y / 2) + this.y;
            }
            else if (this.dock & PIXI.Dock.BOTTOM) {
                this.transform.position.y = parentBounds.height - this.height - this.y;
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