
declare namespace PIXI {
    export interface Container {
        dock: Dock;
        resize: Resize;

        needResize: boolean;
    }
}