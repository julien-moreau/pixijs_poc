import * as PIXI from 'pixi.js';

export default class ViewPortContainer extends PIXI.Container {

    constructor() {
        super();
    }

    public updateTransform(): void {
        this['_width'] = this.parent['_width'];
        this['_height'] = this.parent['_height'];

        super.updateTransform();
    }
}
