/// <reference types="pixi.js" />
declare namespace PIXI {
    class SpineDemo implements IDemo {
        game: Game;
        stage: Container;
        renderer: SystemRenderer;
        constructor(game: Game);
        run(): void;
    }
}
