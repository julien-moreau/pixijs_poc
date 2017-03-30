/// <reference types="pixi.js" />
import * as PIXI from "pixi.js";
import "../container/container";
export default class PixiGame extends PIXI.Application {
    backStage: PIXI.Container;
    frontStage: PIXI.Container;
    constructor();
    render(): void;
    resize(): void;
}
