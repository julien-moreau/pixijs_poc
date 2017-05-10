/// <reference types="pixi.js" />
declare namespace PIXI {
    class FullscreenDemo implements IDemo {
        game: Game;
        stage: Container;
        renderer: SystemRenderer;
        constructor(game: Game);
        run(): void;
    }
}
