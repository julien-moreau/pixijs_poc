var PIXI;
(function (PIXI) {
    // Update transform
    var updateTransformFunc = PIXI.Container.prototype.updateTransform;
    PIXI.Container.prototype.updateTransform = function () {
        if (!this.parent.calculateBounds)
            return;
        if (this.needResize)
            this.children.forEach(function (c) { return c.needResize = true; });
        else
            return updateTransformFunc.call(this);
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
        transform.updateTransform(this.parent.transform);
        var parentTransform = new PIXI.Transform();
        parentTransform.setFromMatrix(this.parent.worldTransform);
        var width = this.width;
        var height = this.height;
        if (this instanceof PIXI.Sprite) {
            width *= transform.scale.x;
            height *= transform.scale.y;
        }
        if (this.resize) {
            if (this.resize === PIXI.Resize.COVER) {
                var ratio = Math.max(parentBounds.width / this.width, parentBounds.height / this.height);
                if (!isNaN(ratio))
                    this.transform.scale.set(ratio, ratio);
                this.transform.position.x = (parentBounds.width / 2) - (this.width / 2) + this.x;
                this.transform.position.y = (parentBounds.height / 2) - (this.height / 2) + this.y;
            }
            else if (this.resize === PIXI.Resize.CONTAIN) {
                var ratio = Math.min(parentBounds.width / (this.width / transform.scale.x), parentBounds.height / (this.height / transform.scale.y));
                if (!isNaN(ratio))
                    this.transform.scale.set(ratio, ratio);
            }
        }
        if (this.dock) {
            if (this.dock & PIXI.Dock.CENTER_HORIZONTAL) {
                this.transform.position.x = ((parentBounds.width / 2) - (width / 2 / (this.pivot.x || 1)) + this.x) / parentTransform.scale.x;
            }
            else if (this.dock & PIXI.Dock.RIGHT) {
                this.transform.position.x = (parentBounds.width - width - this.x) / parentTransform.scale.x;
            }
            if (this.dock & PIXI.Dock.CENTER_VERTICAL) {
                this.transform.position.y = ((parentBounds.height / 2) - (height / 2 / (this.pivot.y || 1)) + this.y) / parentTransform.scale.y;
            }
            else if (this.dock & PIXI.Dock.BOTTOM) {
                this.transform.position.y = (parentBounds.height - height - this.y) / parentTransform.scale.y;
            }
        }
        updateTransformFunc.call(this);
        this.transform.position.x = x;
        this.transform.position.y = y;
        this.transform.scale.x = sx;
        this.transform.scale.y = sy;
        this.needResize = false;
    };
})(PIXI || (PIXI = {}));
//# sourceMappingURL=container.js.map