namespace PIXI {
    // Update transform
    const updateTransformFunc = Container.prototype.updateTransform;

    Container.prototype.updateTransform = function () {
        if (!this.parent.calculateBounds)
            return;

        if (this.needResize)
            this.children.forEach(c => c.needResize = true);
        else
            return updateTransformFunc.call(this);

        const x = this.transform.position.x;
        const y = this.transform.position.y;

        const sx = this.transform.scale.x;
        const sy = this.transform.scale.y;

        let parentBounds = this.parent.getBounds(true);

        if (this.parent._width) parentBounds.width = this.parent._width;
        if (this.parent._height) parentBounds.height = this.parent._height;

        const transform = new Transform();
        transform.setFromMatrix(this.worldTransform);
        transform.updateTransform(this.parent.transform);

        const parentTransform = new Transform();
        parentTransform.setFromMatrix(this.parent.worldTransform);

        let width = this.width;
        let height = this.height;
        
        if (this instanceof Sprite) {
            width *= transform.scale.x;
            height *= transform.scale.y;
        }

        if (this.resize) {
            if (this.resize === Resize.COVER) {
                const ratio = Math.max(parentBounds.width / this.width, parentBounds.height / this.height);
                if (!isNaN(ratio))
                    this.transform.scale.set(ratio, ratio);

                this.transform.position.x = (parentBounds.width / 2) - (this.width / 2) + this.x;
                this.transform.position.y = (parentBounds.height / 2) - (this.height / 2) + this.y;
            } else if (this.resize === Resize.CONTAIN) {
                const ratio = Math.min(parentBounds.width / (this.width / transform.scale.x), parentBounds.height / (this.height / transform.scale.y));
                if (!isNaN(ratio))
                    this.transform.scale.set(ratio, ratio);
            }
        }

        if (this.dock) {
            if (this.dock & Dock.CENTER_HORIZONTAL) {
                this.transform.position.x = ((parentBounds.width / 2) - (width / 2 / (this.pivot.x || 1)) + this.x) / parentTransform.scale.x;
            } else if (this.dock & Dock.RIGHT) {
                this.transform.position.x = (parentBounds.width - width - this.x) / parentTransform.scale.x;
            }

            if (this.dock & Dock.CENTER_VERTICAL) {
                this.transform.position.y = ((parentBounds.height / 2) - (height / 2 / (this.pivot.y || 1)) + this.y) / parentTransform.scale.y;
            } else if (this.dock & Dock.BOTTOM) {
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
}
