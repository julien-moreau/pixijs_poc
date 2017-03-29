import { Container, Point } from "pixi.js";
import { DockState } from "./dockState.js";
import { ResizeType } from "./resizeType.js";

namespace PIXI {
    // Update transform
    const updateTransformFunc = Container.prototype.updateTransform;

    Container.prototype.updateTransform = function () {
        const lastPosition = new Point(this.x, this.y);
        const lastScale = new Point(this.scale.x, this.scale.y);

        const parentWidth = (this.parent._width || this.parent.width);
        const parentHeight = (this.parent._height || this.parent.height);

        // Resize
        if (this.resizeType === ResizeType.COVER) {
            const parentMax = Math.max(parentWidth, parentHeight);
            const thisMax = Math.max(this.width, this.height);
            const k = parentMax / thisMax;
            
            this.scale.set(k, k);
        }

        // Dock state
        if (this.dockState) {
            // X
            if (this.dockState & DockState.CENTER_HORIZONTAL) {
                this.x = parentWidth / 2 - this.width / 2 + this.x;
            } else if (this.dockState & DockState.RIGHT) {
                this.x = parentWidth - this.x;
            }

            // Y
            if (this.dockState & DockState.CENTER_VERTICAL) {
                this.y = parentHeight / 2 - this.height / 2 + this.y;
            } else if (this.dockState & DockState.BOTTOM) {
                this.y = parentHeight - this.y;
            }
        }

        updateTransformFunc.apply(this);

        this.x = lastPosition.x;
        this.y = lastPosition.y;
        this.scale.set(lastScale.x, lastScale.y);
    };
}