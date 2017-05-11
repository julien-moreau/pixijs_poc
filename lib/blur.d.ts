/// <reference types="pixi.js" />
declare namespace PIXI {
    class BlurDemo implements IDemo {
        game: Game;
        renderer: SystemRenderer;
        constructor(game: Game);
        run(): void;
    }
}
