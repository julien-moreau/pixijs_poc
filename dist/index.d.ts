/// <reference types="pixi.js" />
declare module "container/dockState" {
    export enum DockState {
        LEFT = 1,
        RIGHT = 2,
        TOP = 4,
        BOTTOM = 8,
        CENTER_HORIZONTAL = 16,
        CENTER_VERTICAL = 32,
        CENTER_ALL = 48,
    }
}
declare module "container/resizeType" {
    export enum ResizeType {
        CONTAIN = 0,
        COVER = 1,
    }
}
declare module "container/container" {
}
declare module "application/game" {
    import * as PIXI from "pixi.js";
    import "container/container";
    export default class PixiGame extends PIXI.Application {
        backStage: PIXI.Container;
        frontStage: PIXI.Container;
        constructor();
        render(): void;
        resize(): void;
    }
}
declare module "container/viewport-container" {
    import * as PIXI from 'pixi.js';
    export default class ViewPortContainer extends PIXI.Container {
        constructor();
        updateTransform(): void;
    }
}
declare module "pixigame.js" {
    import PixiGame from "application/game";
    import { ResizeType } from "container/resizeType";
    import { DockState } from "container/dockState";
    import ViewPortContainer from "container/viewport-container";
    export { PixiGame, ResizeType, DockState, ViewPortContainer };
}
