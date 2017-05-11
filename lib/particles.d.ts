/// <reference types="pixi.js" />
declare namespace PIXI {
    class ParticlesDemo implements IDemo {
        game: Game;
        renderer: SystemRenderer;
        constructor(game: Game);
        run(): void;
    }
}
