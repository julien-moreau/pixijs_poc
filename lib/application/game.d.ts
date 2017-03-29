/// <reference types="pixi.js" />
import { Application } from "pixi.js";
import "../container/container.js";
export default class Game extends Application {
    backStage: PIXI.Container;
    frontStage: PIXI.Container;
    constructor();
    render(): void;
    resize(): void;
}
