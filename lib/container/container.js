var PIXI;
(function (PIXI) {
    // Update transform
    var updateTransformFunc = PIXI.Container.prototype.updateTransform;
    PIXI.Container.prototype.updateTransform = function () {
        if (!this.parent.calculateBounds)
            return;
        if (!this.transform.position)
            return updateTransformFunc.call(this);
        // Transforms
        var x = this.transform.position.x;
        var y = this.transform.position.y;
        var sx = this.transform.scale.x;
        var sy = this.transform.scale.y;
        var transform = new PIXI.Transform();
        transform.setFromMatrix(this.worldTransform);
        var parentTransform = new PIXI.Transform();
        parentTransform.setFromMatrix(this.parent.worldTransform);
        // Bounds and dimensions
        var parentBounds = this.parent.getBounds(true);
        if (this.parent.viewport) {
            parentBounds.width = this.parent.viewport.width * parentTransform.scale.x;
            parentBounds.height = this.parent.viewport.height * parentTransform.scale.y;
        }
        else {
            if (this.parent._width)
                parentBounds.width = this.parent._width;
            if (this.parent._height)
                parentBounds.height = this.parent._height;
        }
        var width;
        var height;
        if (this.viewport) {
            width = this.viewport.width * transform.scale.x;
            height = this.viewport.height * transform.scale.y;
        }
        else {
            width = this.width;
            height = this.height;
        }
        if (this instanceof PIXI.Sprite) {
            width *= transform.scale.x;
            height *= transform.scale.y;
        }
        // Resize
        if (this.resize) {
            if (this.resize === PIXI.Resize.COVER) {
                var ratio = Math.max(parentBounds.width / this.width, parentBounds.height / this.height);
                if (!isNaN(ratio))
                    this.transform.scale.set(ratio, ratio);
                this.transform.position.x = (parentBounds.width / 2) - (this.width / 2) + this.x;
                this.transform.position.y = (parentBounds.height / 2) - (this.height / 2) + this.y;
            }
            else if (this.resize === PIXI.Resize.CONTAIN) {
                var ratio = Math.min(parentBounds.width / width * transform.scale.x, parentBounds.height / height * transform.scale.y);
                if (!isNaN(ratio))
                    this.transform.scale.set(ratio, ratio);
            }
        }
        // Docking
        if (this.dock) {
            if (this.dock & PIXI.Dock.CENTER_HORIZONTAL) {
                this.transform.position.x = ((parentBounds.width / 2) - (width / 2 / (this.pivot.x || 1)) + this.x * transform.scale.x) / parentTransform.scale.x;
            }
            else if (this.dock & PIXI.Dock.RIGHT) {
                this.transform.position.x = (parentBounds.width - width / (this.pivot.x || 1) - this.x * transform.scale.x) / parentTransform.scale.x;
            }
            if (this.dock & PIXI.Dock.CENTER_VERTICAL) {
                this.transform.position.y = ((parentBounds.height / 2) - (height / 2 / (this.pivot.y || 1)) + this.y * transform.scale.y) / parentTransform.scale.y;
            }
            else if (this.dock & PIXI.Dock.BOTTOM) {
                this.transform.position.y = (parentBounds.height - height / (this.pivot.y || 1) - this.y * transform.scale.y) / parentTransform.scale.y;
            }
        }
        // Update
        updateTransformFunc.call(this);
        this.transform.position.x = x;
        this.transform.position.y = y;
        this.transform.scale.x = sx;
        this.transform.scale.y = sy;
    };
})(PIXI || (PIXI = {}));
//# sourceMappingURL=container.js.map