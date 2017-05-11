/// <reference types="pixi.js" />
declare namespace PIXI {
    class AlphaDemo implements IDemo {
        game: Game;
        renderer: SystemRenderer;
        constructor(game: Game);
        run(): void;
    }
}
